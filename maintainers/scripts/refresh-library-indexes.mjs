#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..');

function markdownCell(value) {
  return String(value || '').replace(/[\r\n|]+/g, ' ').trim();
}

function skillSlug(plugin) {
  return String(plugin.source || '').replace(/^\.\/skills\//, '').replace(/\/$/, '');
}

export async function refreshLibraryIndexes(repoRoot = REPO_ROOT) {
  const marketplacePath = join(repoRoot, '.claude-plugin', 'marketplace.json');
  const marketplace = JSON.parse(await readFile(marketplacePath, 'utf8'));
  const plugins = Array.isArray(marketplace.plugins) ? marketplace.plugins : [];
  const rows = plugins.map((plugin) => {
    const slug = skillSlug(plugin);
    return {
      slug,
      displayName: markdownCell(plugin.displayName || plugin.name),
      description: markdownCell(plugin.description),
    };
  }).filter((row) => row.slug);

  const rootRows = rows.map((row) => `| [${row.displayName}](skills/${row.slug}/) | ${row.description} |`);
  const skillsRows = rows.map((row) => `| [${row.displayName}](./${row.slug}/) | ${row.description} |`);
  const rootReadme = [
    '# August Marketplace — Main',
    '',
    'The shared library of August Group skills that are useful across the firm.',
    '',
    '## Start here',
    '',
    'Open the **[Skills library](skills/)**, then choose the skill you want. Each skill folder opens with a plain-English overview and a link to its instructions.',
    '',
    '## Skill library',
    '',
    '| Skill | What it does |',
    '| --- | --- |',
    ...rootRows,
    '',
    '## For marketplace maintainers',
    '',
    'Publishing tools and maintainer guidance live in [maintainers/](maintainers/).',
    '',
  ].join('\n');
  const skillsReadme = [
    '# Skills library',
    '',
    'Choose a skill folder below. Each opens with a short explanation and a direct link to the instructions.',
    '',
    '| Skill | What it does |',
    '| --- | --- |',
    ...skillsRows,
    '',
  ].join('\n');

  await writeFile(join(repoRoot, 'README.md'), rootReadme, 'utf8');
  await writeFile(join(repoRoot, 'skills', 'README.md'), skillsReadme, 'utf8');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  refreshLibraryIndexes().then(() => {
    console.log('Refreshed marketplace indexes.');
  }).catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
