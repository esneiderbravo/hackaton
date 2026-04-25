## Context

The project has no ESLint configuration. TypeScript and React anti-patterns can enter the codebase undetected until runtime or manual code review. The stack is Next.js 15, React 19, and TypeScript strict mode — all of which have well-supported ESLint plugins.

The project already has `eslint-config-next` as a transitive dependency through Next.js. Husky is not yet installed; lint-staged configuration is also absent.

## Goals / Non-Goals

**Goals:**
- Configure ESLint with rules appropriate for Next.js, TypeScript, and React
- Expose a `npm run lint` script that reports violations with file and line info
- Add a pre-commit hook (Husky + lint-staged) that runs ESLint on staged files; only errors block the commit

**Non-Goals:**
- Configuring Prettier or any other formatter (separate concern)
- Auto-fixing all pre-existing violations automatically
- Enforcing lint in CI pipelines (out of scope for this change)

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Config format | `eslint.config.mjs` (flat config) | ESLint v9+ default; `eslint-config-next` supports it |
| TypeScript rules | `@typescript-eslint/recommended` | Covers the most impactful TS anti-patterns without being overly strict |
| React rules | Included via `eslint-config-next` | Next.js config bundles `eslint-plugin-react` and `eslint-plugin-react-hooks` |
| Pre-commit scope | `lint-staged` on `*.{ts,tsx}` | Avoids linting unrelated files (JSON, MD, etc.) on every commit |
| Warning vs error | Errors block; warnings advisory | Matches the user story decision; keeps DX smooth during onboarding |

## Risks / Trade-offs

- **Pre-existing violations**: Existing files may have lint errors. A remediation pass is needed after setup, or selected rules may need to be downgraded to `warn` temporarily.
- **Rule strictness**: `@typescript-eslint/recommended` may flag valid patterns in legacy files. Rules can be relaxed per-file with inline comments as a last resort.
