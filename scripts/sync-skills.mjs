// Sync marketplace.json -> Supabase `skills` table.
//
// Source of truth is `.claude-plugin/marketplace.json`. Each plugin entry there
// becomes one row on the August AI site's Skills page. Run automatically by the
// GitHub Action on every push that touches the marketplace; can also be run by
// hand (see scripts/README.md).
//
// Requires two env vars:
//   SUPABASE_URL                e.g. https://ehnfpfgrfsocvqpuzana.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY   service-role key (bypasses RLS; keep secret)
//
// Only rows with source='marketplace' are ever touched. Manually-added skills
// (source='manual') are never modified or deleted.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const MARKETPLACE = join(REPO_ROOT, '.claude-plugin', 'marketplace.json');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Map a plugin's marketplace `category` to August AI department placement.
// Anything not listed (e.g. "Productivity") falls through to [] = Main Skills
// page only. A skill can override this with an explicit `august.departments`.
const CATEGORY_TO_DEPARTMENTS = {
  Investments: ['Investments'],
  'Legal & Compliance': ['Legal & Compliance'],
  Advisory: ['Advisory'],
  'Lifestyle & Marketing': ['Lifestyle & Marketing'],
  'Business Operations': ['Business Operations'],
};

function toRecord(plugin) {
  // Plugin folders follow the `<slug>-plugin` convention; the site's install
  // command builder re-appends `-plugin`, so download_url stores the bare slug.
  const slug = plugin.name.replace(/-plugin$/, '');
  const aug = plugin.august || {};

  const record = {
    slug,
    source: 'marketplace',
    name: plugin.displayName || plugin.name,
    description: plugin.description || '',
    use_cases: aug.useCases || plugin.tags || [],
    departments: aug.departments || CATEGORY_TO_DEPARTMENTS[plugin.category] || [],
    download_url: slug,
    featured: aug.featured ?? false,
  };
  // Level isn't a marketplace concept; only set it when explicitly provided so
  // we never clobber a level chosen by hand in the Admin page.
  if (aug.level) record.level = aug.level;
  // Departments get the same treatment on UPDATES: people move skills between
  // pages by hand in the site UI, and resending manifest-derived departments on
  // every sync silently reverted those moves. The flag lets main() strip
  // `departments` for rows that already exist unless the plugin declares
  // `august.departments` explicitly.
  record.__explicitDepartments = !!aug.departments;
  return record;
}

async function sb(path, init = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase ${init.method || 'GET'} ${path} -> ${res.status}: ${body}`);
  }
  return res;
}

async function main() {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.log('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — skipping sync.');
    console.log('(Add them as GitHub Action secrets to enable automatic syncing.)');
    return; // exit 0 so a not-yet-configured repo does not show a failed run
  }

  const manifest = JSON.parse(await readFile(MARKETPLACE, 'utf8'));
  const plugins = manifest.plugins || [];
  const records = plugins.map(toRecord);
  const slugs = records.map((r) => r.slug);
  console.log(`Found ${records.length} plugin(s): ${slugs.join(', ') || '(none)'}`);

  // 1. Upsert every current plugin (insert new, update existing) keyed on slug.
  //    merge-duplicates updates only the columns we send, so manual `level`
  //    values survive unless an entry explicitly overrides them. Same for
  //    `departments`: rows that already exist keep their (possibly hand-moved)
  //    placement unless the plugin declares `august.departments` explicitly —
  //    only brand-new rows get the category-derived default.
  if (records.length) {
    const existingRes = await sb('skills?source=eq.marketplace&select=slug');
    const existing = new Set((await existingRes.json()).map((r) => r.slug));

    const withDepartments = [];
    const withoutDepartments = [];
    for (const record of records) {
      const explicit = record.__explicitDepartments;
      delete record.__explicitDepartments;
      if (existing.has(record.slug) && !explicit) {
        const { departments: _dropped, ...rest } = record;
        withoutDepartments.push(rest);
      } else {
        withDepartments.push(record);
      }
    }

    for (const batch of [withDepartments, withoutDepartments]) {
      if (!batch.length) continue;
      await sb('skills?on_conflict=slug', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify(batch),
      });
    }
    console.log(
      `Upserted ${records.length} skill(s) (${withoutDepartments.length} kept their existing page placement).`,
    );
  }

  // 2. Delete marketplace-sourced rows whose plugin was removed from the repo.
  //    Never touches source='manual'. With no plugins left, delete all
  //    marketplace rows.
  const inList = slugs.length ? `&slug=not.in.(${slugs.map((s) => `"${s}"`).join(',')})` : '';
  const del = await sb(`skills?source=eq.marketplace${inList}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=representation' },
  });
  const removed = await del.json();
  if (removed.length) {
    console.log(`Removed ${removed.length} stale skill(s): ${removed.map((r) => r.slug).join(', ')}`);
  } else {
    console.log('No stale skills to remove.');
  }

  console.log('Sync complete.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
