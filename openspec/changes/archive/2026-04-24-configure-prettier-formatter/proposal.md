## Why

The project already has Prettier installed and a `.prettierrc` defined, but it is not enforced automatically. Without pre-commit formatting, contributors can push unformatted code that creates noisy diffs and inconsistencies across the codebase. Completing this configuration ensures formatting is automatic and style debates are eliminated from code reviews.

## What Changes

- Verify and lock in the shared `.prettierrc` config (already present) as the source of truth
- Verify `.prettierignore` excludes build artifacts and generated files (already present)
- Add Prettier to the existing Husky + lint-staged pre-commit hook so staged files are auto-formatted before every commit
- Confirm `npm run format` and `npm run format:check` scripts work correctly (already present)
- Run an initial format pass on the full codebase in a dedicated commit

## Capabilities

### New Capabilities

- `prettier-config`: Shared Prettier configuration with `.prettierrc`, `.prettierignore`, `format` npm scripts, and pre-commit auto-formatting via lint-staged

### Modified Capabilities

- `eslint-config`: lint-staged config updated to also run Prettier on staged files alongside ESLint

## Impact

- **Files modified**: `package.json` (`lint-staged` config extended for Prettier)
- **Dependencies**: `prettier`, `prettier-plugin-tailwindcss`, `eslint-config-prettier` (all already installed)
- **Risk**: Initial format pass may produce a large diff — should be committed separately from feature work
- **No database migrations required**
