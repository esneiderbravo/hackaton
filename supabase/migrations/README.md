# Supabase Migrations

This folder contains all database schema changes for the project as versioned SQL files.

---

## Naming Convention

Every migration file must follow the timestamp format:

```
YYYYMMDDHHMMSS_description.sql
```

**Example:** `20260424194500_add_profiles_table.sql`

- Use the current UTC datetime as the prefix
- Use a concise `snake_case` description of what the migration does
- Sorting files alphabetically by name produces the correct chronological execution order

---

## How to Create a Migration

1. Determine the schema change needed (new table, column, index, policy, etc.)
2. Create a new `.sql` file in this folder using the timestamp naming convention
3. Write the SQL — follow the project standards (UUID PKs, `user_id` FK, RLS policies, `updated_at` trigger)
4. Commit the file to version control
5. **Do NOT execute it** — application comes in a separate, deliberate step

---

## How to Apply a Migration

Migrations are **manual-only**. Never run automatically.

**Option A — Supabase SQL Editor (recommended for most cases):**
1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Paste the contents of the migration file
4. Review the SQL carefully
5. Click **Run**

**Option B — Supabase CLI:**
```bash
supabase db push
```
Only use this after reviewing the migration and confirming the target environment.

---

## Rules

| Rule | Description |
|---|---|
| **Immutable** | Never modify a migration file after it has been committed and applied. If a correction is needed, create a new migration. |
| **Manual only** | `supabase db push` is never run automatically in CI/CD. All applications are deliberate. |
| **One change per file** | Keep migrations focused. A migration that creates a table should not also seed data. |
| **Sequential apply** | Apply migrations in chronological (filename) order when setting up a new environment. |

---

## Baseline

`20260424000000_initial_items_table.sql` — Creates the `items` table with UUID PK, `user_id` FK, RLS policies, and `updated_at` trigger. This is the starting schema for all environments.
