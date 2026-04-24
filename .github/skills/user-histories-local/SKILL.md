---
name: user-histories-local
description: Generate user histories from requirement instructions and save them as markdown files in this repository. Use this whenever the user asks for user stories/histories, backlog generation, requirement breakdown, or local markdown planning artifacts.
---

# User Histories Local

Create clear user histories from requirement inputs and persist them under `docs/user-histories/backlog/`.

## Inputs

Collect these inputs before writing files:

1. Initial requirements instruction (required)
2. Domain or feature area (optional)
3. Story granularity: `epic-level`, `feature-level`, or `task-level` (default: `feature-level`)
4. Preferred language (default: match user language)

If input is incomplete, ask concise follow-up questions.

## File and Naming Rules

- Save all stories to `docs/user-histories/backlog/`
- Naming format: `US-YYYYMMDD-XX-short-slug.md`
- Always update `docs/user-histories/backlog/index.md`
- Reuse `docs/user-histories/templates/user-history.template.md`

## Authoring Rules

Each user history must include:

- Story (`As a ... I want ... so that ...`)
- Context (`source requirement` and `business value`)
- At least two acceptance criteria in Given/When/Then format
- Notes (`dependencies`, `risks`, `open questions`)

Split large requirements into multiple stories when they represent different user goals.

## Output Checklist

For each request:

1. Parse requirements into user goals.
2. Generate one markdown file per story.
3. Update backlog index with ID, title, status, and link.
4. Return a concise list of created files.

