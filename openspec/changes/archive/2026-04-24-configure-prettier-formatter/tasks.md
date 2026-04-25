## 1. Verify Existing Configuration

- [x] 1.1 Confirm `.prettierrc` exists with correct rules: `semi`, `singleQuote`, `trailingComma`, `tabWidth`, `printWidth`, and `prettier-plugin-tailwindcss`
- [x] 1.2 Confirm `.prettierignore` excludes `.next`, `node_modules`, `public`, and `*.md`
- [x] 1.3 Confirm `npm run format` and `npm run format:check` scripts are present in `package.json`
- [x] 1.4 Confirm `eslint-config-prettier` is in devDependencies and `"prettier"` is in the `extends` array of `.eslintrc.json`

## 2. Update lint-staged for Prettier

- [x] 2.1 Add a Prettier entry to the `lint-staged` config in `package.json` targeting `*.{js,ts,jsx,tsx,json,css,md}` with `prettier --write`
- [x] 2.2 Confirm the ESLint entry remains unchanged — ESLint still targets `*.{ts,tsx}` with `eslint --max-warnings=0`

## 3. Initial Format Pass

- [x] 3.1 Run `npm run format` to reformat the entire codebase according to `.prettierrc`
- [x] 3.2 Run `npm run format:check` to confirm all files now pass (exit 0)
- [x] 3.3 Commit the formatting changes in a dedicated commit with message `chore: apply initial prettier format pass`

## 4. Verification

- [x] 4.1 Confirm `npm run format:check` exits 0 on a correctly formatted file
- [x] 4.2 Stage a file and commit — confirm lint-staged runs Prettier and ESLint on staged files
- [x] 4.3 Confirm Prettier does not block a commit on its own (only ESLint errors block)
