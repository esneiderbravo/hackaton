# US-20260424-04 Define Supabase Migration Folder and Manual Execution Workflow

## Story

As a developer,
I want a defined `supabase/migrations/` folder structure where all database changes are saved as versioned SQL migration files,
so that schema changes are tracked in version control and never applied directly to the database without explicit review and manual execution.

## Context

- Source requirement: "Define the supabase migration folder — do not execute directly, always create a migration file to be executed manually"
- Business value: Ensures database changes are auditable, reversible, and consistent across environments. Prevents accidental schema drift from untracked direct SQL execution.

## Acceptance Criteria

- [ ] Given a developer needs to change the database schema, when they follow the project convention, then they create a new SQL file in `supabase/migrations/` with the format `YYYYMMDDHHMMSS_description.sql` (e.g., `20260424194500_add_profiles_table.sql`) and commit it — they do NOT run it directly.
- [ ] Given a migration file exists in `supabase/migrations/`, when it needs to be applied, then a team member manually runs it via the Supabase SQL editor or `supabase db push` after deliberate review.
- [ ] Given the migrations folder contains all historical migrations, when a new environment is set up, then running all migration files in order produces the full expected schema.
- [ ] Given a developer attempts to modify a previously committed migration file, when reviewed in a PR, then the team convention rejects modifications to existing migrations — a new migration must be added instead.

## Notes

- Dependencies: Supabase project setup; `supabase/migrations/001_initial.sql` already exists as baseline
- Risks: Without tooling enforcement, developers may still execute SQL directly — documentation and PR review are the primary guardrails
- Decisions: `supabase db push` is NOT run automatically. All migrations are manual-only. Timestamp naming (`YYYYMMDDHHMMSS_description.sql`) is the convention.
