#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { refreshLibraryIndexes } from './refresh-library-indexes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..');
const MARKETPLACE_PATH = join(REPO_ROOT, '.claude-plugin', 'marketplace.json');

function usage() {
  console.error([
    'Usage:',
    '  node maintainers/scripts/promote-skill.mjs --src /path/to/SKILL.md --category Productivity --tags workflow,publishing',
    '',
    'Flags:',
    '  --src          Path to source SKILL.md or a skill folder containing SKILL.md',
    '  --name         Source skill name; defaults to frontmatter name when --src is set',
    '  --description  Short listing description; defaults to frontmatter description',
    '  --category     Marketplace category; defaults to Productivity',
    '  --tags         Comma-separated marketplace tags; defaults to workflow',
  ].join('\n'));
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) throw new Error(`Unexpected argument: ${arg}`);
    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) throw new Error(`Missing value for --${key}`);
    args[key] = value;
    i += 1;
  }
  return args;
}

function parseFrontmatter(raw, sourcePath) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`No YAML frontmatter found in ${sourcePath}`);
  return match[1];
}

function extractField(frontmatter, field) {
  const lines = frontmatter.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (new RegExp(`^${field}:\\s*>-?\\s*$`).test(line)) {
      const block = [];
      for (let j = i + 1; j < lines.length && (/^\s*$/.test(lines[j]) || /^[ \t]+/.test(lines[j])); j += 1) {
        if (lines[j].trim()) block.push(lines[j].trim());
      }
      return block.join(' ');
    }
    const inline = line.match(new RegExp(`^${field}:\\s*(.+?)\\s*$`));
    if (inline) return inline[1].replace(/^['"]|['"]$/g, '').trim();
  }
  return '';
}

function firstSentence(value) {
  const cleaned = value.replace(/\(PERSONAL\)\s*/g, '').replace(/\s+/g, ' ').trim();
  const sentence = cleaned.split(/(?<=[.!?])\s/)[0].trim();
  return sentence.length <= 120 ? sentence : `${sentence.slice(0, 117).trimEnd()}...`;
}

function titleCaseSlug(slug) {
  return slug.split('-').filter(Boolean).map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
}

function rewriteSkill(raw, frontmatter, slug) {
  const withName = /^name:\s*.+$/m.test(frontmatter)
    ? frontmatter.replace(/^name:\s*.+$/m, `name: ${slug}`)
    : `name: ${slug}\n${frontmatter}`;
  return raw
    .replace(/^---\r?\n[\s\S]*?\r?\n---/, `---\n${withName.replace(/\(PERSONAL\)\s*/g, '').trim()}\n---`)
    .replace(/\(PERSONAL\)\s*/g, '');
}

function humanReadme(displayName, description, slug) {
  return [
    `# ${displayName}`,
    '',
    description,
    '',
    '## Open the skill',
    '',
    `[Read the skill instructions](skills/${slug}/SKILL.md)`,
    '',
    'This page is the human-friendly entry point. The hidden plugin folders contain the packaging Claude needs.',
    '',
  ].join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const category = args.category || 'Productivity';
  let sourcePath;
  if (args.src) {
    sourcePath = resolve(args.src);
    if (!sourcePath.endsWith('SKILL.md')) sourcePath = join(sourcePath, 'SKILL.md');
  } else if (args.name) {
    sourcePath = join(homedir(), '.claude', 'skills', args.name, 'SKILL.md');
  } else {
    throw new Error('Provide --src or --name.');
  }
  if (!existsSync(sourcePath)) throw new Error(`Skill not found: ${sourcePath}`);

  const raw = await readFile(sourcePath, 'utf8');
  const frontmatter = parseFrontmatter(raw, sourcePath);
  const sourceName = args.name || extractField(frontmatter, 'name');
  if (!sourceName) throw new Error('Could not determine skill name. Pass --name or add frontmatter name.');
  const slug = sourceName.replace(/^personal-/, '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Skill name must be lowercase hyphen-case: ${slug}`);

  const pluginName = `${slug}-plugin`;
  const displayName = titleCaseSlug(slug);
  const description = args.description || extractField(frontmatter, 'description') || sourceName;
  const siteDescription = firstSentence(description);
  const tags = (args.tags || 'workflow').split(',').map((tag) => tag.trim()).filter(Boolean);
  const pluginDir = join(REPO_ROOT, 'skills', slug);
  const manifestDir = join(pluginDir, '.claude-plugin');
  const skillDir = join(pluginDir, 'skills', slug);
  await mkdir(manifestDir, { recursive: true });
  await mkdir(skillDir, { recursive: true });

  const pluginJsonPath = join(manifestDir, 'plugin.json');
  const skillPath = join(skillDir, 'SKILL.md');
  const readmePath = join(pluginDir, 'README.md');
  const pluginJson = {
    $schema: 'https://json.schemastore.org/claude-code-plugin-manifest.json',
    name: pluginName,
    displayName,
    version: '1.0.0',
    description: siteDescription,
    author: { name: 'August Group' },
    repository: 'https://github.com/Cal1234567/August-Marketplace-Main',
    skills: './skills',
  };
  await writeFile(pluginJsonPath, `${JSON.stringify(pluginJson, null, 2)}\n`, 'utf8');
  await writeFile(skillPath, rewriteSkill(raw, frontmatter, slug), 'utf8');
  await writeFile(readmePath, humanReadme(displayName, siteDescription, slug), 'utf8');

  const marketplace = JSON.parse(await readFile(MARKETPLACE_PATH, 'utf8'));
  const entry = {
    name: pluginName,
    displayName,
    source: `./skills/${slug}`,
    description: siteDescription,
    version: '1.0.0',
    author: { name: 'August Group' },
    category,
    tags,
  };
  const plugins = Array.isArray(marketplace.plugins) ? marketplace.plugins : [];
  const existingIndex = plugins.findIndex((plugin) => plugin.name === pluginName);
  if (existingIndex >= 0) plugins[existingIndex] = entry;
  else plugins.push(entry);
  marketplace.plugins = plugins;
  await writeFile(MARKETPLACE_PATH, `${JSON.stringify(marketplace, null, 2)}\n`, 'utf8');
  await refreshLibraryIndexes(REPO_ROOT);

  console.log(`Wrote ${pluginJsonPath}`);
  console.log(`Wrote ${skillPath}`);
  console.log(`Wrote ${readmePath}`);
  console.log(`Wrote ${MARKETPLACE_PATH}`);
  console.log(`Done ${slug} is ready.`);
}

main().catch((error) => {
  console.error(error.message);
  usage();
  process.exit(1);
});
