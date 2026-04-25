# Spec: prettier-config

## Requirement: Shared Prettier configuration
A `.prettierrc` file must exist at the project root defining shared formatting rules (semi, singleQuote, trailingComma, tabWidth, printWidth, and Tailwind plugin).

### Scenario: IDE picks up config automatically
- **WHEN** any team member opens the project in an IDE with the Prettier extension installed
- **THEN** the editor applies the shared `.prettierrc` rules with no additional setup

### Scenario: Format script reformats all files
- **WHEN** a developer runs `npm run format`
- **THEN** Prettier rewrites all source files according to the shared `.prettierrc` rules

### Scenario: Format check script validates without writing
- **WHEN** a developer runs `npm run format:check`
- **THEN** Prettier exits non-zero for any file that does not match the expected format, without modifying files

---

## Requirement: Prettier ignore file
A `.prettierignore` file must exist excluding build artifacts, `node_modules`, `public`, and generated files from Prettier processing.

### Scenario: Build artifacts are excluded
- **WHEN** Prettier runs (via `npm run format` or pre-commit hook)
- **THEN** files in `.next`, `node_modules`, and `public` are not processed

---

## Requirement: Pre-commit auto-formatting via lint-staged
The existing lint-staged pre-commit hook must also run Prettier on staged files so all committed code is formatted.

### Scenario: Staged files are auto-formatted on commit
- **WHEN** a developer commits files
- **THEN** lint-staged runs Prettier on all staged `*.{js,ts,jsx,tsx,json,css,md}` files before the commit is recorded

### Scenario: Formatting does not block commits on its own
- **WHEN** Prettier reformats a staged file
- **THEN** the commit proceeds after formatting (Prettier write is non-blocking; only ESLint errors block)
