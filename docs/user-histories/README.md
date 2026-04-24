# User Histories

This folder stores user histories in markdown format based on an initial requirements instruction.

## Structure

- `templates/user-history.template.md`: canonical format for each history
- `backlog/`: generated user history files
- `backlog/index.md`: quick index with status and links

## File Naming

Use this format for new files:

`US-YYYYMMDD-XX-short-slug.md`

Example:

`US-20260424-01-auth-signup-flow.md`

## Workflow

1. Start from the initial requirements instruction.
2. Convert each requirement into one or more user histories.
3. Write each history using the template.
4. Save the history in `backlog/`.
5. Add or update the entry in `backlog/index.md`.

## Status Values

- `draft`
- `ready`
- `in-progress`
- `done`

