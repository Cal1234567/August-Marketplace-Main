---
name: publish-skill
description: >-
  Publish a skill to the August Group marketplace from a Cowork session opened on
  this August Marketplace Main repo. Use when the user says "publish a skill", "add a skill
  to the marketplace", "promote X skill", or pastes a SKILL.md to publish firm-wide.
  Built for Cowork (no desktop, no ~/.claude/skills): it creates the plugin files,
  generalizes the language, updates the marketplace manifest, and commits — all in
  this repo.
---

# Publish a Skill (Cowork)

Publishes a skill into this marketplace so the whole firm can install it from
Browse plugins in Cowork. Everything happens inside THIS repo — no desktop Claude
Code and no personal `~/.claude/skills` folder required. This replicates the
desktop `maintainers/scripts/promote-skill.ps1` flow using direct file edits, because Cowork
can't run that script or read a personal skills folder.

## Inputs (ask for any that are missing, together in one message)

1. **The skill** — either paste its `SKILL.md`, or describe what it should do and
   write a proper `SKILL.md` (YAML frontmatter with `name` + `description`, then
   the body).
2. **Category** — one of: Investments, Productivity, Legal & Compliance, Advisory,
   Lifestyle & Marketing, Business Operations. Default: Productivity.
3. **Tags** — a few short tags. Default: `workflow`.

## Steps

1. **Get the skill's `SKILL.md`.** Use the pasted content, or author it from the
   description.

2. **Generalize it for firm-wide use** — apply every rule in "Rewrite rules"
   below. Keep all functional instructions intact; only change identity/ownership
   language.

3. **Derive names:**
   - `slug` = skill name lowercased, hyphenated, with any `personal-` prefix removed
   - `plugin-name` = `<slug>-plugin`
   - `Display Name` = Title Case of the slug with spaces
   - `subdir` from category: Investments→`investments`, Legal & Compliance→`legal`,
     Advisory→`advisory`, Lifestyle & Marketing→`lifestyle-marketing`,
     Business Operations→`business-operations`, anything else→`productivity`
   - `site description` = the first sentence of the description, trimmed to ~120 chars

4. **Create the plugin files** in this repo:
   - `skills/<slug>/.claude-plugin/plugin.json`:
     ```json
     {
       "$schema": "https://json.schemastore.org/claude-code-plugin-manifest.json",
       "name": "<plugin-name>",
       "displayName": "<Display Name>",
       "version": "1.0.0",
       "description": "<site description>",
       "author": { "name": "August Group" },
       "repository": "https://github.com/Cal1234567/August-Marketplace-Main",
       "skills": "./skills"
     }
     ```
   - `skills/<slug>/skills/<slug>/SKILL.md` — the generalized
     skill, with its frontmatter `name:` set to `<slug>` and any `(PERSONAL)`
     marker stripped.

5. **Update `.claude-plugin/marketplace.json`** — add an entry to the `plugins`
   array (or replace the existing one if a plugin with the same name is already
   there). Keep the JSON valid and preserve every other entry:
   ```json
   {
     "name": "<plugin-name>",
     "displayName": "<Display Name>",
     "source": "./skills/<slug>",
     "description": "<site description>",
     "version": "1.0.0",
     "author": { "name": "August Group" },
     "category": "<Category>",
     "tags": ["<tag1>", "<tag2>"]
   }
   ```

6. **Show a short summary** — the skill name, the files created, and the
   generalization edits made (e.g. "replaced 3 'Cal' references, removed a
   hardcoded path"). Get a confirm before committing.

7. **Commit and push:**
   ```
   git add . && git commit -m "publish <slug> skill" && git push
   ```
   If a direct push to main isn't available in the session, push a branch and open
   a PR instead. Browse plugins / the August AI site update within ~30 seconds of
   the change landing on the default branch.

## Rewrite rules

(Ported from the desktop `skill-formatter` so generalization is identical.)

**Strip personal markers**
- Remove the `(PERSONAL)` prefix from the description field (and anywhere else)
- Remove lines like "This is your personal, hot-reloading copy — edits take effect immediately"

**Generalize identity references**
- "Cal" as a subject → "the user" (e.g. "whenever Cal wants" → "whenever the user wants")
- "Cal's" → "the user's"
- "Cal said", "Cal asked" → "the user said", "the user asked"
- First-person possessive in trigger conditions ("my X") → "the user's X"

**Generalize hardcoded paths**
- Paths containing a specific username (e.g. `C:\Users\CalShannon\...`) that are
  *not* inside a script call or asset reference → replace with a generic note or
  remove. Exception: load-bearing paths (script calls, asset lookups) stay as-is.

**Keep everything else**
- All functional instructions, step sequences, output formats
- August Group branding (firm name, template names, Supabase references)
- Tool names, script paths relative to the skill folder
- Generic references to "the user"
