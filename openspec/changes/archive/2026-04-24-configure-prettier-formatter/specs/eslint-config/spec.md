## MODIFIED Requirements

### Requirement: Pre-commit lint enforcement via Husky + lint-staged
Husky must be installed with a `pre-commit` hook that runs lint-staged. Lint-staged must run **both ESLint and Prettier** on staged files. Only ESLint **errors** block the commit; Prettier auto-formats without blocking.

#### Scenario: Error in staged file blocks commit
- **WHEN** a developer attempts to commit a file containing an ESLint error
- **THEN** the commit is rejected and the error is displayed in the terminal

#### Scenario: Warning in staged file does not block commit
- **WHEN** a developer attempts to commit a file that has only ESLint warnings
- **THEN** the commit proceeds successfully

#### Scenario: Clean staged files commit without interruption
- **WHEN** all staged files pass all ESLint rules
- **THEN** the commit proceeds without any lint output blocking it

#### Scenario: Staged files are auto-formatted by Prettier on commit
- **WHEN** a developer commits any `*.{js,ts,jsx,tsx,json,css,md}` file
- **THEN** lint-staged runs Prettier on those files before the commit is recorded
