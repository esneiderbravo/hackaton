---
name: supabase-migration-local
description: >-
  Whenever a developer needs to create a new Supabase database migration for this project.
  Generates a timestamped SQL migration file in supabase/migrations/ — never executes it directly.
  Triggers on: "create a migration", "add a migration", "new migration", "add a supabase migration",
  "create a db migration", "migration for [table/change]".
license: MIT
metadata:
  author: HackApp
  version: 1.0.0
  created: 2026-04-24
  last_reviewed: 2026-04-24
  review_interval_days: 90
---

# supabase-migration-local — Create Supabase Migration File

Create a new timestamped SQL migration file in `supabase/migrations/`. **Never execute it.** The developer applies it manually via the Supabase SQL editor or `supabase db push` after review.

## Trigger

Developer needs a schema change:

```
create a migration to add a profiles table
add a supabase migration for the orders table
new migration: add index on users.email
```

## Inputs

Collect before creating the file:

1. **Description of the change** (required) — e.g., "add profiles table", "add email index on users"
2. **SQL content** (required) — the actual SQL to include; ask if not provided
3. **Include rollback?** (optional, default: yes) — whether to add a commented-out `-- rollback:` section

## File Naming Convention

```
supabase/migrations/YYYYMMDDHHMMSS_short-slug.sql
```

- Use the current timestamp at creation time
- Slug: lowercase, hyphen-separated, max 5 words
- Examples:
  - `20260424194500_add-profiles-table.sql`
  - `20260424201200_add-email-index-users.sql`
  - `20260424215000_add-orders-rls-policy.sql`

## File Structure

Each migration file must follow this template:

```sql
-- Migration: YYYYMMDDHHMMSS_short-slug
-- Description: [human-readable description]
-- Created: YYYY-MM-DD
-- ⚠️  DO NOT execute this file directly from code or CI.
--     Apply manually via the Supabase SQL editor or `supabase db push` after review.

-- ============================================================
-- UP
-- ============================================================

[SQL statements here]

-- ============================================================
-- ROLLBACK (run manually if you need to revert)
-- ============================================================

-- [rollback SQL here, commented out for safety]
```

## Rules

1. **Never execute** — only create the file. State this explicitly to the user.
2. **Immutable once committed** — if a migration is already committed, create a new one to amend it; never modify the existing file.
3. **One concern per file** — if the request spans multiple unrelated changes, split into separate migration files.
4. **Always include RLS** — if creating or altering a table, include the appropriate `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` and policy statements.
5. **Reference existing migrations** — check `supabase/migrations/` for the existing baseline before writing dependent SQL.

## Output

After creating the file:

1. Show the full file path and name
2. Show the file content
3. Remind the user: _"Apply this manually via the Supabase SQL editor or `supabase db push` — do not run it automatically."_

## Folder Structure Reference

```
supabase/
  migrations/
    20260424000000_initial.sql        ← baseline (already exists)
    YYYYMMDDHHMMSS_new-change.sql     ← new files go here
```
