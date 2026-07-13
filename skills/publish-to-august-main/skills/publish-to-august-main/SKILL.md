---
name: publish-to-august-main
description: >-
  Add a Cowork skill to August Marketplace — Main without requiring the user to use Git. Use when
  the user says publish this skill, share this skill, add this to the August marketplace, push to
  marketplace, publish my skill, or publish to Main.
---

# Publish to August Marketplace

Publish one or more local Cowork skills to August Marketplace — Main. Keep the conversation in
plain language: say “share” and “publish,” not “clone,” “commit,” or “push.”

The user has already approved direct publishing. Do not require a separate approval immediately
before publishing, except when the new skill would replace a skill that is already in the library.

## Workflow

1. Ask which skill to share only when there is no clear folder or `SKILL.md` in the conversation.
   Accept a folder, a `SKILL.md` file, or a simple skill name. If there is one obvious candidate,
   identify it and continue.

2. Inspect the selected `SKILL.md` before sharing it. Remove obvious personal copy labels and
   private local paths when they are not required for the skill to work. Preserve working scripts,
   assets, precise instructions, and August Group branding. If the skill includes secrets,
   personal data, or an unclear instruction that could expose either, stop and explain what needs
   to be removed.

3. Check that GitHub access is ready. Use `gh auth status` and confirm that the authenticated
   account can write to `Cal1234567/August-Marketplace-Main`. If access is missing, say:
   “You need to be added as a contributor to August Marketplace — Main, then reconnect GitHub in
   Cowork. Nothing has been published.” Do not ask the user to run Git commands.

4. Make a fresh local copy of `https://github.com/Cal1234567/August-Marketplace-Main` (or update
   the existing copy with a fast-forward-only pull). Work only inside that copy.

5. Infer the category and a few useful tags from the skill. Use `Productivity` and `workflow` when
   the content does not make a better choice obvious. Do not ask the user to choose taxonomy.

6. Before writing, check whether `skills/<slug>` or `<slug>-plugin` already exists. If it does,
   explain in plain language that publishing will replace that existing library skill and ask for
   confirmation. Otherwise continue.

7. From the marketplace copy, run:

   ```bash
   node maintainers/scripts/promote-skill.mjs --src "<skill-folder-or-SKILL.md>" --category "<category>" --tags "<comma-separated-tags>"
   ```

   Include `--name` only when the source frontmatter name is missing or needs a clearer shared
   name. The script creates the library entry and updates the human-readable skill list.

8. Validate the marketplace with `claude plugin validate .` when that command is available. If it
   is unavailable, validate that the plugin folder, plugin manifest, and marketplace entry exist
   and that the manifest is valid JSON.

9. Publish the result directly. Use explicit paths rather than staging unrelated files:

   ```bash
   git add skills/<slug> .claude-plugin/marketplace.json README.md skills/README.md
   git commit -m "publish <slug> via Cowork"
   git push origin main
   ```

10. Say that the skill has been published, name it, and link to
    `https://github.com/Cal1234567/August-Marketplace-Main`. If publishing fails for lack of
    access, explain the contributor/reconnect step in plain language. Never expose tokens or ask
    the user to copy a token into chat.
