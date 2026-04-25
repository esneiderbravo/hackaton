---
name: accessibility-standards
description: Use when implementing or reviewing UI for WCAG 2.2 AA compliance, fixing semantic HTML/ARIA issues, validating keyboard-only navigation, or testing screen-reader behavior in web apps.
---

# Accessibility Standards

## Overview

Use this skill to run a consistent accessibility workflow from audit to fix to verification.
Prioritize semantic HTML first, then minimal ARIA, then keyboard and screen-reader validation.

## When to Use

Apply this skill when the user asks for:
- WCAG compliance checks or accessibility audits
- Semantic HTML improvements (landmarks, headings, forms, labels)
- ARIA fixes for custom widgets
- Keyboard navigation support
- Screen-reader testing guidance

Do not use this skill for visual polish-only changes unrelated to accessibility behavior.

## Core Workflow

1. **Define scope**
   - Identify page(s), component(s), and user flows to review.
   - Record target standard as WCAG 2.2 AA unless user requests otherwise.

2. **Run automated checks first**
   - Use existing lint/test tooling in the repo (for example `npm run lint`).
   - If available, run browser a11y scanning (axe/Lighthouse) to collect detectable issues.
   - Keep raw findings grouped by page/component and WCAG principle.

3. **Review semantic HTML and ARIA manually**
   - Ensure proper landmarks: `header`, `nav`, `main`, `aside`, `footer`.
   - Verify heading hierarchy (`h1` -> `h2` -> `h3`) with no skipped structure for sections.
   - Ensure all form controls have programmatic labels.
   - Prefer native elements (`button`, `a`, `input`, `select`) over div-based widgets.
   - Add ARIA only when native semantics cannot represent behavior.

4. **Verify keyboard-only navigation**
   - Test with `Tab`, `Shift+Tab`, `Enter`, `Space`, arrow keys, and `Esc`.
   - Confirm visible focus state on all interactive elements.
   - Confirm no keyboard traps and logical focus order.
   - Verify modal/dialog focus management (initial focus, focus trap, focus return).

5. **Verify screen-reader behavior**
   - Test key journeys with at least one SR (VoiceOver on macOS is acceptable baseline).
   - Confirm element role, name, and state are announced correctly.
   - Confirm dynamic updates use appropriate announcements (`aria-live` only when needed).
   - Confirm meaningful link/button text out of visual context.

6. **Apply fixes in priority order**
   - P0: blockers for keyboard or SR use, missing labels, inaccessible critical actions.
   - P1: structural semantics and landmark/headings issues.
   - P2: enhancements and non-critical improvements.

7. **Re-run checks and publish report**
   - Re-run automated checks and targeted manual tests.
   - Document what changed, what passed, and what remains.

## Quick WCAG Mapping

- **Perceivable:** text alternatives, labels/instructions, color contrast (where applicable)
- **Operable:** keyboard access, focus visibility/order, no traps, timing independence
- **Understandable:** consistent navigation, clear errors, predictable behavior
- **Robust:** semantic HTML, valid ARIA usage, compatible role/name/value announcements

## Semantic + ARIA Fix Rules

- Use native controls before ARIA-enhanced custom controls.
- Do not add redundant roles to native elements (for example `role="button"` on `button`).
- Every interactive element must have an accessible name.
- Every form error must be programmatically associated with the field.
- `aria-expanded`, `aria-controls`, `aria-selected`, and `aria-pressed` must reflect real state.
- Hide purely decorative content from SR (`aria-hidden="true"` when appropriate).

## Keyboard and Screen-Reader Test Checklist

For each reviewed page/flow, verify:
- Page has one clear `h1`
- Landmarks exist and are meaningful
- All controls reachable and usable by keyboard
- Focus indicator is visible
- Dialogs/menus are operable and dismissible via keyboard
- Form labels, help text, and errors are announced
- Status/error/success messages are announced when they appear
- No duplicate or ambiguous link/button names

## Output Template

Return findings using this structure:

```markdown
# Accessibility Review - <scope>

## Standards
- Target: WCAG 2.2 AA
- Pages/Flows: <list>

## Findings by Severity
### P0
- [WCAG ref] <issue>
  - Location: <file/component/page>
  - Impact: <who is blocked and how>
  - Recommended fix: <specific change>

### P1
- ...

### P2
- ...

## Applied Fixes
- <file>: <change>

## Verification Results
- Automated: <what was run and outcome>
- Keyboard: <pass/fail notes>
- Screen reader: <pass/fail notes>

## Remaining Risks
- <known gaps or deferred issues>
```

## Common Mistakes

- Relying on color alone for meaning.
- Building clickable `div` elements instead of buttons/links.
- Adding ARIA attributes that conflict with native semantics.
- Styling away focus rings without replacement.
- Testing only with mouse and visual inspection.

## Done Criteria

A task is complete only when:
- Critical user journeys are keyboard operable.
- Screen-reader announcements are accurate for core flows.
- New code introduces no new P0/P1 accessibility regressions.
- Remaining issues are documented with severity and owner.

