# Spec: eslint-config

## Requirement: ESLint configuration file
A project-level ESLint flat config (`eslint.config.mjs`) must exist with rules enabled for Next.js, TypeScript (`@typescript-eslint/recommended`), and React (via `eslint-config-next`).

### Scenario: Lint detects TypeScript anti-pattern
- **WHEN** a developer writes code with a TypeScript or React anti-pattern (e.g., `any` type, missing hook dependencies)
- **THEN** running `npm run lint` reports the violation with a clear message, file path, and line number

### Scenario: Consistent rules across environments
- **WHEN** any team member clones the repo and runs `npm run lint`
- **THEN** the same rules apply with no additional setup required

### Scenario: Clean file produces no output
- **GIVEN** a file that passes all ESLint rules
- **WHEN** `npm run lint` is executed
- **THEN** no errors or warnings are reported for that file

---

## Requirement: npm lint script
`package.json` must include a `lint` script that runs ESLint across the project.

### Scenario: Script is discoverable
- **WHEN** a developer runs `npm run lint`
- **THEN** ESLint scans all `*.ts` and `*.tsx` files in the project and exits with code 0 on success or non-zero on errors

---

## Requirement: Pre-commit lint enforcement via Husky + lint-staged
Husky must be installed with a `pre-commit` hook that runs lint-staged. Lint-staged must run ESLint on staged `*.ts` and `*.tsx` files. Only ESLint **errors** block the commit; warnings are advisory.

### Scenario: Error in staged file blocks commit
- **WHEN** a developer attempts to commit a file containing an ESLint error
- **THEN** the commit is rejected and the error is displayed in the terminal

### Scenario: Warning in staged file does not block commit
- **WHEN** a developer attempts to commit a file that has only ESLint warnings
- **THEN** the commit proceeds successfully

### Scenario: Clean staged files commit without interruption
- **WHEN** all staged files pass all ESLint rules
- **THEN** the commit proceeds without any lint output blocking it
