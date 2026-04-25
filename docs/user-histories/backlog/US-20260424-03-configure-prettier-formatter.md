# US-20260424-03 Configure Prettier Formatter

## Story

As a developer,
I want Prettier configured with a shared `.prettierrc` for the project,
so that all code is auto-formatted consistently and style debates are eliminated from code reviews.

## Context

- Source requirement: "Configure linters and formatters for the code"
- Business value: Eliminates formatting inconsistencies across contributors and reduces noise in diffs, improving readability and review speed.

## Acceptance Criteria

- [ ] Given a developer runs `npm run format` (or equivalent), when Prettier processes all source files, then all files are reformatted according to the shared `.prettierrc` rules.
- [ ] Given a `.prettierignore` is defined, when Prettier runs, then build artifacts, `node_modules`, and generated files are excluded.
- [ ] Given the project has a `.prettierrc`, when any IDE with the Prettier extension opens the project, then it picks up the shared config automatically.

## Notes

- Dependencies: `prettier`, optional `eslint-config-prettier` to disable conflicting ESLint style rules
- Risks: Initial format pass may produce a large diff; recommended to do it in a dedicated commit
- Decisions: `format` is kept separate from `lint`. Prettier runs as a pre-commit hook via Husky + lint-staged (formats only staged files).
