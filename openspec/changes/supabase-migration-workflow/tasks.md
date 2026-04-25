## 1. Create Migrations Folder Structure

- [x] 1.1 Create the `supabase/migrations/` directory
- [x] 1.2 Add a `.gitkeep` file to ensure the empty directory is tracked in git (remove once the first migration is added)

## 2. Add Initial Migration

- [x] 2.1 Create `supabase/migrations/20260424000000_initial_items_table.sql` with the full `items` table schema: `CREATE TABLE`, UUID primary key, `user_id` FK, `title`, `description`, `status` with CHECK constraint, `created_at`, `updated_at`
- [x] 2.2 Add `CREATE INDEX` on `user_id` for query performance
- [x] 2.3 Add `ALTER TABLE items ENABLE ROW LEVEL SECURITY`
- [x] 2.4 Add RLS policies for SELECT, INSERT, UPDATE, DELETE scoped to `auth.uid() = user_id`
- [x] 2.5 Add `update_updated_at()` trigger function and `set_updated_at` trigger

## 3. Add Migration Workflow README

- [x] 3.1 Create `supabase/migrations/README.md` documenting: naming convention (`YYYYMMDDHHMMSS_description.sql`), manual-only execution rule, how to apply via SQL editor or `supabase db push`, and the prohibition on modifying committed migrations

## 4. Update CLAUDE.md

- [x] 4.1 Update the `Supabase Migration Standards` section in `CLAUDE.md`: change naming convention from `NNN_<description>.sql` to `YYYYMMDDHHMMSS_<description>.sql` with an example
- [x] 4.2 Add a note to `CLAUDE.md` that `supabase db push` is manual-only and migrations must never be modified after commit

## 5. Verification

- [x] 5.1 Confirm `supabase/migrations/` directory exists and is committed to git
- [x] 5.2 Confirm the initial migration file is syntactically valid SQL (review manually)
- [x] 5.3 Confirm `CLAUDE.md` reflects the timestamp naming convention
- [x] 5.4 Confirm `supabase/migrations/README.md` covers all four workflow rules
