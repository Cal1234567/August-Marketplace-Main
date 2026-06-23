# /ship

Commit and push the current state of the marketplace repo to main.

## Steps

1. **Check for changes** — run `git status --short` and `git diff --stat`. If nothing is staged or modified, say so and stop.

2. **Auto-generate a commit message** — read `git diff HEAD` and write a concise commit message describing what changed (new plugin, updated skill, marketplace.json update, etc.). Show it to the user and ask: "Commit message — good to go, or change it?"

3. **Commit and push** — once confirmed:
   ```bash
   git add -A
   git commit -m "<approved message>"
   git push origin main
   ```

4. **Confirm** — show the pushed commit hash. Note that the marketplace updates within ~30 seconds and teammates can install the new/updated skills via Browse plugins.
