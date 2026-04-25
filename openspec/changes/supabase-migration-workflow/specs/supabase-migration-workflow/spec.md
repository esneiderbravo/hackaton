## ADDED Requirements

### Requirement: Versioned migrations folder
A `supabase/migrations/` directory must exist at the project root as the single source of truth for all database schema changes.

#### Scenario: Developer follows convention for schema change
- **WHEN** a developer needs to change the database schema
- **THEN** they create a new `.sql` file in `supabase/migrations/` with the format `YYYYMMDDHHMMSS_description.sql`, commit it, and do NOT execute it directly

#### Scenario: New environment setup
- **WHEN** a new environment is set up
- **THEN** running all migration files in `supabase/migrations/` in chronological order produces the full expected schema

---

### Requirement: Timestamp-based naming convention
Migration files must use the naming format `YYYYMMDDHHMMSS_description.sql` (e.g., `20260424194500_add_profiles_table.sql`).

#### Scenario: Migration file is named correctly
- **GIVEN** a developer creates a new migration
- **WHEN** the file is committed
- **THEN** it follows the `YYYYMMDDHHMMSS_description.sql` format with a descriptive snake_case suffix

#### Scenario: Timestamp ordering
- **WHEN** multiple migration files exist
- **THEN** sorting files alphabetically by name produces the correct chronological execution order

---

### Requirement: Manual-only execution policy
Migrations are NEVER executed automatically. All migrations must be applied manually via the Supabase SQL editor or `supabase db push` after deliberate review.

#### Scenario: Migration application is intentional
- **WHEN** a migration file needs to be applied to an environment
- **THEN** a team member manually executes it via the Supabase SQL editor or `supabase db push` after reviewing the SQL

#### Scenario: No automated execution
- **WHEN** the project CI/CD pipeline runs
- **THEN** `supabase db push` or any other migration execution command is NOT invoked automatically

---

### Requirement: Immutable committed migrations
Once a migration file is committed and merged, it must NOT be modified. Schema corrections require a new migration file.

#### Scenario: Modification attempt is rejected in PR
- **WHEN** a PR modifies an existing committed migration file
- **THEN** the team convention rejects the modification and requires a new migration to be added instead

---

### Requirement: Migration workflow documentation
A `supabase/migrations/README.md` must exist explaining the naming convention, manual execution workflow, and immutability rule.

#### Scenario: New developer onboards
- **WHEN** a developer joins and reads `supabase/migrations/README.md`
- **THEN** they understand how to create, name, and apply migrations without additional guidance
