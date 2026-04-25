## Context

The project already keeps planning artifacts in `docs/user-histories/backlog/`. The requested capability is to generate user histories from an initial requirements instruction and keep `index.md` synchronized automatically.

This is an internal repository workflow capability, not a runtime dashboard feature.

## Goals / Non-Goals

**Goals:**
- Convert freeform requirement instructions into structured markdown user histories
- Enforce consistent sections: Story, Context, Acceptance Criteria, Notes
- Append/update backlog index entries with ID, title, status, and link
- Keep generation deterministic and safe for repeated runs

**Non-Goals:**
- Supabase persistence
- UI authoring flow in `app/(dashboard)`
- Automatic status promotion beyond `draft`

## Decisions

### Decision 1: Scripted local generator

Use a local script entrypoint (Node/TypeScript) that accepts an instruction string or file input and writes markdown files under `docs/user-histories/backlog/`.

### Decision 2: Deterministic IDs and filenames

ID format: `US-YYYYMMDD-XX`. Filename format: `<ID>-<kebab-title>.md`.

### Decision 3: Index sync as part of generation

`index.md` is updated in the same run as file generation to avoid drift.

### Decision 4: Validation-before-write

The generator validates required sections before writing files and before updating index entries.

## Data Flow

### Workflow data flow (implemented)

```
Requirement instruction
  -> Parser/normalizer
  -> History composer
  -> Markdown writer (backlog/*.md)
  -> Index updater (backlog/index.md)
  -> Verification output (created/updated entries)
```

### App pattern mapping (required template reference)

```
Page -> Component -> Hook -> Service -> Supabase
N/A for this change (repository workflow; no runtime app path introduced)
```

## File Map (exact paths)

- `openspec/changes/2026-04-24-generate-user-histories-from-requirements/.openspec.yaml`
- `openspec/changes/2026-04-24-generate-user-histories-from-requirements/proposal.md`
- `openspec/changes/2026-04-24-generate-user-histories-from-requirements/design.md`
- `openspec/changes/2026-04-24-generate-user-histories-from-requirements/tasks.md`

Planned implementation targets referenced by this design:
- `docs/user-histories/backlog/`
- `docs/user-histories/backlog/index.md`
- `docs/user-histories/templates/user-history.template.md`
- `package.json` (script for generator command)

## Required platform-specific sections

- **New types in `types/index.ts`**: none for this workflow capability
- **SQL migration structure**: not required (no database changes)
- **Zod schema structure**: optional runtime validation in generator; no React form in this change
- **New nav item + icon**: none

## Risks / Trade-offs

- Ambiguous instructions may yield weak acceptance criteria; mitigate with conservative generation and explicit TODO notes
- Index merge conflicts can occur in parallel edits; mitigate with sorted deterministic entries

## Open Questions

- Should generated status default to `draft` or `ready`? (current proposal: `draft`)

