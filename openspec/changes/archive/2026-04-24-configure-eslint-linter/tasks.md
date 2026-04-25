## 1. Install Dependencies

- [x] 1.1 Install ESLint and TypeScript ESLint packages: `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser` as devDependencies
- [x] 1.2 Install pre-commit tooling: `husky`, `lint-staged` as devDependencies

## 2. ESLint Configuration

- [x] 2.1 Create `eslint.config.mjs` (flat config) extending `eslint-config-next` and `@typescript-eslint/recommended`
- [x] 2.2 Set TypeScript anti-pattern rules as `error` (e.g., no-explicit-any, no-unused-vars) and advisory patterns as `warn`
- [x] 2.3 Add `"lint": "eslint . --ext .ts,.tsx"` script to `package.json`
- [x] 2.4 Run `npm run lint` and document any pre-existing violations; relax rules to `warn` only where fixing is out of scope

## 3. Pre-commit Hook Setup

- [x] 3.1 Initialize Husky: run `npx husky init` to create `.husky/` directory
- [x] 3.2 Add `.husky/pre-commit` hook that invokes `npx lint-staged`
- [x] 3.3 Add `lint-staged` config to `package.json` targeting `*.{ts,tsx}` with `eslint --max-warnings=0` so only errors block commits

## 4. Verification

- [x] 4.1 Confirm `npm run lint` exits 0 on a clean file and non-zero on a file with an error
- [x] 4.2 Stage a file with an intentional ESLint error, attempt commit, and confirm it is blocked
- [x] 4.3 Stage a file with only a warning and confirm the commit proceeds
- [x] 4.4 Clone or reset and confirm rules apply with no additional setup
