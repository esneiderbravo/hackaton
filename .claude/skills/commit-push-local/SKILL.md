---
name: commit-push-local
description: >-
  Whenever the user wants to commit and push code changes in this project.
  Runs Prettier and ESLint (with auto-fix) before committing so every commit lands clean.
  Triggers on: "commit my changes", "push my changes", "commit and push", "save my work",
  "ship it", "upload changes", "format and commit".
license: MIT
metadata:
  author: HackApp
  version: 1.0.0
  created: 2026-04-24
  last_reviewed: 2026-04-24
  review_interval_days: 90
---

# commit-push-local — Lint, Format, Commit & Push

Run linters and formatters, commit cleanly, and push. No unformatted or lint-failing code ever reaches the remote.

## Trigger

User is ready to commit. Message is optional:

```
commit my changes
push everything
ship it
commit and push feat: add dashboard widget
```

## Workflow

### Step 1 — Run formatter (Prettier)

```bash
npm run format
```

If the script doesn't exist, skip and note it.

### Step 2 — Run linter with auto-fix (ESLint)

```bash
npm run lint:fix
```

If `lint:fix` doesn't exist, try:

```bash
npm run lint -- --fix
```

If lint errors remain that auto-fix cannot resolve, **stop here** — show the remaining errors and do not commit. The developer must fix them manually.

### Step 3 — Assess the diff

```bash
git status
git diff --stat HEAD
```

If the working tree is completely clean, tell the user and stop — nothing to commit.

### Step 4 — Stage everything

Stage **after** formatters so all rewrites are included:

```bash
git add -A
```

### Step 5 — Commit

**If the user provided a message**, use it as the subject line and still generate a body (see below).

**Always write a multi-line commit message** with a subject and a descriptive body:

**Subject line:**
- Imperative present tense: "add", "fix", "remove", "update"
- Format: `type: short description` (type = `feat`, `fix`, `chore`, `refactor`, `docs`, `style`)
- Under 72 characters

**Body (mandatory — always include):**
- Separated from the subject by a blank line
- Explain **what** changed and **why** — not just how
- Mention every file or module touched and what role it plays in the change
- Call out non-obvious decisions, trade-offs, or constraints
- Reference the user story, ticket, or requirement that motivated the change when available
- Use plain prose; bullet points are fine for multiple independent changes
- Aim for 3–10 lines — enough context for a future reader to understand without diffing

```bash
git commit -m "<subject>" -m "<body paragraph 1>" -m "<body paragraph 2 if needed>"
```

Example:
```bash
git commit \
  -m "feat: add RLS policies to items table" \
  -m "Creates the items table with UUID primary key, user_id foreign key, and a status CHECK constraint. Enables Row Level Security so each user can only read and modify their own rows.

Four policies are added: SELECT, INSERT, UPDATE, and DELETE — all scoped to auth.uid() = user_id. An index on user_id is included for query performance. An updated_at trigger keeps the timestamp current on every row change.

Relates to US-20260424-04 (Supabase migration folder and manual workflow)."
```

### Step 6 — Push

```bash
git push
```

If the branch has no upstream:

```bash
git push -u origin HEAD
```

### Step 7 — Report

Tell the user:
- Which scripts ran and whether they changed any files
- Full commit hash and message
- Remote + branch where it was pushed

## Pre-commit hooks (Husky + lint-staged)

This project uses Husky + lint-staged so that lint and format also run automatically on every `git commit`, even outside this workflow. If hooks are not set up yet, follow US-20260424-02 and US-20260424-03 in `docs/user-histories/backlog/`.

## Error handling

| Situation | Action |
|-----------|--------|
| Formatter fails | Stop. Show error. Ask if user wants to skip and commit anyway. |
| Lint errors auto-fix can't resolve | Show remaining errors. Do NOT commit. User must fix manually. |
| Nothing to commit | Say so clearly. Do not create an empty commit. |
| Push rejected (non-fast-forward) | Show rejection. Suggest `git pull --rebase` then push again. |
| Merge conflicts | Stop. List conflicting files. Do not attempt to resolve. |
