# Maintaining the marketplace

This guide is for people who publish or maintain skills. Everyday users should start in the [Skills library](../skills/).

## Publish through the web

1. Open the [Main marketplace](https://github.com/Cal1234567/August-Marketplace-Main).
2. Open the `skills` folder.
3. Create one plainly named folder for the skill, for example `my-skill`.
4. Put the Claude skill file at `skills/my-skill/skills/my-skill/SKILL.md`.
5. Copy `.claude-plugin/plugin.json` from an existing skill and adjust its name and description.
6. Add the skill to `.claude-plugin/marketplace.json`, pointing `source` to `./skills/my-skill`.

## Folder structure

```text
skills/
  my-skill/
    README.md
    .claude-plugin/
      plugin.json
    skills/
      my-skill/
        SKILL.md
```

## For maintainers

The helper scripts live in `maintainers/scripts`. From the repository root, run:

```powershell
node maintainers/scripts/promote-skill.mjs --name personal-my-skill
```

The hidden `.claude-plugin`, `.claude`, and `.github` folders keep Claude and the marketplace automation working.
