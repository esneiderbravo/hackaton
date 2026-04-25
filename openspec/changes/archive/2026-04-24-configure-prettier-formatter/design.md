## Context

The project already has Prettier partially configured: `.prettierrc` (with `prettier-plugin-tailwindcss`), `.prettierignore`, `format`/`format:check` npm scripts, and `eslint-config-prettier` in devDependencies. The `prettier` config in `.eslintrc.json` already disables conflicting ESLint style rules.

The only missing piece is Prettier in the pre-commit hook. The existing lint-staged config (added by the `configure-eslint-linter` change) only runs ESLint. Prettier needs to be added so staged files are also auto-formatted before every commit.

## Goals / Non-Goals

**Goals:**
- Confirm `.prettierrc` and `.prettierignore` are correctly configured as the shared source of truth
- Add Prettier to the existing lint-staged config so staged files are auto-formatted on commit
- Run an initial format pass across the entire codebase in a dedicated commit

**Non-Goals:**
- Modifying ESLint rules (handled by the eslint-config change)
- Setting up Prettier in CI (out of scope)
- Adding editor-specific config (`.editorconfig`, VS Code settings)

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Config file | `.prettierrc` (JSON) | Already in place; simple and IDE-discoverable |
| Tailwind class sorting | `prettier-plugin-tailwindcss` | Already configured; keeps Tailwind class order consistent |
| ESLint conflict resolution | `eslint-config-prettier` | Already installed and extended in `.eslintrc.json` |
| lint-staged scope | `*.{js,ts,jsx,tsx,json,css,md}` | Formats all Prettier-supported file types except those in `.prettierignore` |
| Commit order | Format pass first, then feature work | Prevents noisy mixed diffs in future PRs |

## Risks / Trade-offs

- **Large initial diff**: The first format pass may touch many files. Committing it separately isolates the noise.
- **Merge conflicts**: Any open branches at time of format pass will need to rebase/merge against the formatting commit.
