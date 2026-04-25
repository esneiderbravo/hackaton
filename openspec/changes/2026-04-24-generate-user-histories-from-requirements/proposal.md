## Problem

Backlog creation from stakeholder requirements is inconsistent and manual. Team members lose time reformatting requirements into user-history markdown, and `docs/user-histories/backlog/index.md` can drift from the actual files.

## Solution

Add a local user-history generation workflow that converts an initial requirements instruction into one or more standardized markdown files in `docs/user-histories/backlog/`, then auto-updates `docs/user-histories/backlog/index.md` with ID, title, status, and link.

The change follows existing project patterns by keeping artifacts in-repo, preserving markdown-first planning, and using deterministic file naming and validation before writing.

## Non-goals

- Building a dashboard UI for authoring histories in this change
- Persisting user histories in Supabase
- Replacing manual product-owner review; generated status remains `draft` until reviewed
- Generating Jira/Confluence issues directly

## Success criteria

- Given an initial requirements instruction, the workflow creates at least one markdown user-history file in `docs/user-histories/backlog/`
- Each generated history includes `Story`, `Context`, `Acceptance Criteria`, and `Notes` sections
- `docs/user-histories/backlog/index.md` is updated with ID, title, status, and link for every new file
- Running the workflow twice does not corrupt existing history files or index formatting

## Pattern alignment and deviations

- **Aligned**: local-first artifacts, markdown documentation under `docs/`, and explicit acceptance criteria for implementation readiness
- **Deviation**: no App Router page/hook/service/Supabase path is introduced because this is a repository workflow capability rather than an end-user product feature
- **Migration**: none required (no new Supabase table)

