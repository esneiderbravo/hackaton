# US-20260424-02 Configure ESLint Linter

## Story

As a developer,
I want ESLint configured with appropriate rules for the project stack (Next.js, TypeScript, React),
so that code quality issues and anti-patterns are caught automatically before commits or CI.

## Context

- Source requirement: "Configure linters and formatters for the code"
- Business value: Prevents bugs and enforces consistent coding standards across the team, reducing review overhead and runtime errors.

## Acceptance Criteria

- [ ] Given a developer writes code with a TypeScript or React anti-pattern, when they run `npm run lint`, then ESLint reports the violation with a clear message and location.
- [ ] Given the project has `.eslintrc` or `eslint.config.*` defined, when any team member clones the repo and runs `npm run lint`, then the same rules apply with no additional setup.
- [ ] Given a file passes all ESLint rules, when `npm run lint` is executed, then no errors or warnings are reported for that file.

## Notes

- Dependencies: `eslint`, `eslint-config-next`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`
- Risks: Existing codebase may have pre-existing lint violations that need a remediation pass or rule relaxation
- Decisions: Lint runs as a pre-commit hook via Husky + lint-staged. Only errors block commits; warnings are advisory.
