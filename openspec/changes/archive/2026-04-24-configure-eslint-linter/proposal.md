## Why

The project lacks a standardized ESLint configuration, meaning TypeScript and React anti-patterns go undetected until runtime or code review. Enforcing lint rules automatically prevents bugs, reduces review overhead, and ensures consistent coding standards across the team.

## What Changes

- Add ESLint configuration (`eslint.config.*`) with rules for Next.js, TypeScript, and React
- Add `npm run lint` script that runs ESLint across the codebase
- Install required dependencies: `eslint`, `eslint-config-next`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`
- Configure Husky + lint-staged as a pre-commit hook so only changed files are linted
- Only ESLint **errors** block commits; warnings remain advisory

## Capabilities

### New Capabilities

- `eslint-config`: ESLint setup with Next.js, TypeScript, and React rules, a lint npm script, and pre-commit enforcement via Husky + lint-staged

### Modified Capabilities

<!-- No existing spec-level behavior changes -->

## Impact

- **Files added/modified**: `eslint.config.*` (or `.eslintrc.*`), `.husky/pre-commit`, `.lintstagedrc.*`, `package.json` (devDependencies + scripts)
- **Dependencies**: `eslint`, `eslint-config-next`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `husky`, `lint-staged`
- **Risks**: Existing codebase may surface pre-existing violations; a remediation pass or targeted rule relaxation may be needed
- **No database migrations required**
