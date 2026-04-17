---
name: format-commit-push-skill
description: >-
  Use this skill whenever the user wants to commit code changes, push to git,
  or is done with a task and wants to save their work. Triggers on: "commit my
  changes", "format and commit", "push my changes", "run prettier then commit",
  "format the code and push", "commit and push", "save my work", "ship it",
  "let's commit". Always use this skill when the user is ready to commit —
  it ensures formatters run first so every commit lands clean.
license: MIT
metadata:
  author: HackApp
  version: 1.0.0
  created: 2026-04-17
  last_reviewed: 2026-04-17
  review_interval_days: 90
---
# /format-commit-push-skill — Format, Commit & Push

Run formatters, commit everything cleanly, and push — so no unformatted code ever reaches the remote.

## Trigger

User is ready to commit. They may or may not provide a message:

```
/format-commit-push-skill feat: add language switcher
/format-commit-push-skill
format and commit my changes
push everything
ship it
```

## Workflow

### Step 1 — Run formatters

Run both in sequence. If one fails, stop and report before going further.

```bash
npm run format      # Prettier: rewrites files in place
npm run lint:fix    # ESLint: auto-fixes what it can
```

If the project has no `package.json` or these scripts don't exist, skip gracefully and note it.

### Step 2 — Assess the diff

```bash
git status
git diff --stat HEAD
```

If the working tree is completely clean (nothing staged, nothing modified), tell the user and stop — there is nothing to commit.

### Step 3 — Stage everything

Always stage *after* formatters so formatter rewrites are included in the commit:

```bash
git add -A
```

### Step 4 — Commit

**If the user provided a message**, use it verbatim (don't paraphrase).

**If no message was provided**, read the staged diff and write a concise commit message:
- Imperative present tense: "add", "fix", "remove", "update" — not "added" or "adds"
- Format: `type: short description` where type is `feat`, `fix`, `chore`, `refactor`, `docs`, or `style`
- One line, under 72 characters

Always append the Co-Authored-By trailer:

```bash
git commit -m "$(cat <<'EOF'
<message>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

### Step 5 — Push

```bash
git push
```

If the branch has no upstream yet:

```bash
git push -u origin HEAD
```

### Step 6 — Report

Tell the user:
- Which formatters ran and whether they changed any files
- The full commit hash and message
- Where it was pushed (remote + branch)

## Error handling

| Situation | Action |
|-----------|--------|
| Formatter fails | Stop. Show error. Ask if they want to skip formatting and commit anyway. |
| Lint errors auto-fix can't resolve | Show remaining errors. Do not commit. User must fix manually. |
| Nothing to commit | Say so clearly. Do not create an empty commit. |
| Push rejected (non-fast-forward) | Show rejection. Suggest `git pull --rebase` then push again. |
| Merge conflicts | Stop. List conflicting files. Do not attempt to resolve. |
| Uncommitted changes that should stay unstaged | Warn the user before `git add -A`. |
