---
name: marketplace-publish
description: >-
  Publish skills from your Cowork workspace to the August Group marketplace. Use when the user
  says push to marketplace, publish to marketplace, publish my skills, or push these skills to
  the marketplace.
---

# Marketplace Publish

You help publish one or more local Cowork skills into the August Group marketplace.

Assume you are running in Cowork Linux with `git`, `node`, and GitHub authorization available.
Pushing goes live to the whole firm immediately, so double-check the selected skills and generated
changes before pushing.

## Workflow

1. Ask which skill folders the user wants to publish. Accept absolute paths, relative paths, or
   skill folder names.

2. For each selected skill folder, inspect `SKILL.md` and auto-format it for firm-wide publishing:
   - Remove `(PERSONAL)` markers anywhere they appear.
   - Remove personal copy lines (e.g. "This is your personal, hot-reloading copy ...").
   - Generalize any personal identity to "the user": replace any specific person's name (the publisher's own name, "Cal", or anyone else's) and first-person possessives like "my X" with "the user" / "the user's X".
   - Generalize user-specific filesystem paths and workspace names (e.g. /Users/<name>/, C:\Users\<name>\, personal folder names) to generic references, EXCEPT load-bearing script or asset paths that must stay machine-specific.
   - Keep all functional instructions, trigger wording, tool requirements, output formats, step sequences, and August Group branding intact.

3. Show a concise summary of every change made to each `SKILL.md`. If anything is ambiguous or
   could expose private information, ask before continuing.

4. Ensure the marketplace repository is available:
   - If `August-Marketplace-Main` is not present, clone `https://github.com/Cal1234567/August-Marketplace-Main`.
   - If it is already present, run `git pull` from inside it.

5. For each skill, ask for category and tags. Default category to `Productivity` and tags to
   `workflow`.

6. From the marketplace repository, run:

   ```bash
   node maintainers/scripts/promote-skill.mjs --src "<skill-folder-or-SKILL.md>" --category "<category>" --tags "<comma-separated-tags>"
   ```

   Include `--name` only when the source frontmatter name is missing or should be overridden.
   Include `--description` only when the frontmatter description is not appropriate for the site
   listing.

7. Show `git status` and the relevant `git diff`. Review the plugin manifest, promoted `SKILL.md`,
   and `.claude-plugin/marketplace.json` entry with the user.

8. If the user confirms, run:

   ```bash
   git add .
   git commit -m "publish <slugs> via Cowork"
   git push origin main
   ```

   Replace `<slugs>` with the promoted skill slug or slugs.

9. Report that marketplace updates land in about 30 seconds, teammates can install the skill via
   Browse plugins, and the repository is `https://github.com/Cal1234567/August-Marketplace-Main`.
