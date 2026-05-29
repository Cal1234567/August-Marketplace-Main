# Skills sync

`.claude-plugin/marketplace.json` is the **single source of truth** for the
August AI site's Skills page. When this repo changes, a GitHub Action
(`.github/workflows/sync-skills.yml`) runs `sync-skills.mjs`, which pushes every
plugin entry into the site's Supabase `skills` table. The site updates within
~30 seconds of a push — no forms, no manual data entry.

## Adding a skill (the whole workflow)

1. Add the plugin folder under `plugins/<slug>-plugin/` (the usual plugin files).
2. Add an entry to `.claude-plugin/marketplace.json` `plugins` array:

   ```json
   {
     "name": "my-skill-plugin",
     "displayName": "My Skill",
     "source": "./plugins/my-skill-plugin",
     "description": "One-line description shown on the site.",
     "version": "1.0.0",
     "author": { "name": "August Group" },
     "category": "Investments",
     "tags": ["research", "analysis"]
   }
   ```
3. Commit and push to `main`.

That's it. The skill appears on the site with:
- **Name** ← `displayName`
- **Description** ← `description`
- **Use cases** ← `tags`
- **Install command** ← `/plugin install my-skill-plugin@august-group`
- **Placement** ← `category` (see mapping below)

## Where a skill shows up

`category` maps to site placement automatically:

| `category`            | Shows on            |
| --------------------- | ------------------- |
| Investments           | Investments tab     |
| Legal & Compliance    | Legal & Compliance  |
| Advisory              | Advisory            |
| Lifestyle & Marketing | Lifestyle & Marketing |
| Business Operations   | Business Operations |
| anything else         | Main Skills page    |

## Optional fine-tuning (`august` block)

For anything `category`/`tags` can't express, add an optional `august` block to
the entry. All fields are optional:

```json
{
  "name": "my-skill-plugin",
  "displayName": "My Skill",
  "...": "...",
  "august": {
    "departments": ["General", "Investments"],
    "level": "intermediate",
    "useCases": ["Custom use case 1", "Custom use case 2"],
    "featured": true
  }
}
```

- `departments` — overrides the category mapping. `"General"` puts it on the
  Main Skills page; combine with department names to show it in several places.
- `level` — `beginner` | `intermediate` | `advanced` (badge on the listing).
- `useCases` — overrides `tags` for the displayed use-case chips.
- `featured` — flag for highlighting.

## One-time setup (already-published repos)

The Action needs two repository secrets
(**Settings → Secrets and variables → Actions**):

- `SUPABASE_URL` — `https://ehnfpfgrfsocvqpuzana.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` — the project's service-role key
  (Supabase dashboard → Project Settings → API). This bypasses RLS, so it lives
  only in GitHub's encrypted secrets — never commit it.

Until both secrets exist, the Action runs but skips the sync (it won't fail).

## Running by hand

```bash
SUPABASE_URL=https://ehnfpfgrfsocvqpuzana.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=... \
node scripts/sync-skills.mjs
```

## Safety

- Only rows with `source='marketplace'` are ever touched. Skills added by hand
  in the site's Admin page (`source='manual'`) are never modified or deleted.
- Removing a plugin from `marketplace.json` removes its skill from the site on
  the next sync.
