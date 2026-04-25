## Context

The project currently has no `supabase/` directory. Supabase is already provisioned (env vars, client libraries installed), but schema changes have no tracked home. The existing `CLAUDE.md` documents a sequential naming pattern (`NNN_description.sql`) that conflicts with the user story decision to use timestamp-based names (`YYYYMMDDHHMMSS_description.sql`). This change establishes the folder, the initial migration, and the canonical convention.

The manual-only policy means no CI/CD step runs `supabase db push`. All migrations are intentional, reviewed, and applied by a team member.

## Goals / Non-Goals

**Goals:**
- Create `supabase/migrations/` as the versioned home for all SQL schema changes
- Define and document the timestamp naming convention (`YYYYMMDDHHMMSS_description.sql`)
- Provide an initial migration for the baseline `items` table
- Add a `README.md` to the migrations folder explaining the workflow
- Update `CLAUDE.md` to use timestamp naming and reinforce the manual-only rule

**Non-Goals:**
- Automating migration execution (no CI/CD, no `supabase db push` in scripts)
- Setting up the Supabase CLI locally (out of scope — team members use the SQL editor or run CLI manually)
- Creating migrations for future tables (each feature owns its migration)
- Schema validation or drift detection tooling

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Naming convention | `YYYYMMDDHHMMSS_description.sql` | Timestamp avoids collision on concurrent branches; aligns with user story requirement. Overrides previous `NNN_` pattern in CLAUDE.md |
| Execution policy | Manual only | Matches user story requirement; prevents accidental schema changes in production |
| Baseline migration | `items` table with full RLS + indexes + triggers | Captures the pattern documented in CLAUDE.md as the canonical example |
| Guardrails | PR review + CLAUDE.md documentation | No tooling can enforce this; conventions and code review are the mechanism |
| README location | `supabase/migrations/README.md` | Co-located with the migrations so it's immediately visible to anyone adding a file |

## Risks / Trade-offs

- **Convention-only enforcement**: Without a CI check, a developer could still execute SQL directly. PR review is the only gate.
- **Immutability by convention**: No tooling prevents editing a committed migration. The README and CLAUDE.md must clearly communicate this prohibition.
- **Timestamp conflicts**: Rare, but two developers could generate the same timestamp. Reviewers should catch this in PRs.
