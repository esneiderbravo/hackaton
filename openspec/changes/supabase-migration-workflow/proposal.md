## Why

The project uses Supabase PostgreSQL but has no `supabase/migrations/` folder or documented convention for how schema changes are tracked and applied. Without a defined workflow, developers may apply SQL directly to the database without review, creating schema drift, unauditable changes, and inconsistencies across environments.

## What Changes

- Create the `supabase/migrations/` folder as the single source of truth for all database schema changes
- Establish timestamp-based naming convention: `YYYYMMDDHHMMSS_description.sql` (e.g., `20260424194500_add_profiles_table.sql`)
- Add an initial migration file documenting the baseline `items` table schema
- Update `CLAUDE.md` to align the migration naming convention (changing from `NNN_description.sql` to timestamp format) and reinforce the manual-only execution rule
- Add a `supabase/migrations/README.md` explaining the workflow, naming convention, and the prohibition on direct SQL execution or modifying committed migrations

## Capabilities

### New Capabilities

- `supabase-migration-workflow`: Versioned SQL migration folder structure with timestamp naming convention, manual-only execution policy, and documented team workflow

### Modified Capabilities

<!-- No existing spec-level behavior changes -->

## Impact

- **Files added**: `supabase/migrations/` (directory), `supabase/migrations/20260424000000_initial_items_table.sql`, `supabase/migrations/README.md`
- **Files modified**: `CLAUDE.md` — align migration naming to timestamp convention and add manual-only execution rule
- **No automated tooling**: `supabase db push` is never run automatically; all migrations are applied manually via Supabase SQL editor or CLI after deliberate review
- **No new npm dependencies**
- **Risk**: Without tooling enforcement, PR review and `CLAUDE.md` conventions are the primary guardrails against direct SQL execution
