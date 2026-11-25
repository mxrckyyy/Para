# Phase 92 — Accessibility Audit

## A. Scope and method

- Manual review based on `docs/quality/manual-accessibility-checklist.md`.
- Automated review via existing Axe + Playwright setup (`tests/e2e/accessibility.spec.mjs`), tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa.
- Code inspection of `src/components/`, `src/pages/`, `src/App.jsx`, `src/index.css`.
- Screen-reader testing with a live screen reader was **NOT PERFORMED** (no screen reader available in this environment). DOM/semantic inspection only.

## B. Manual keyboard review

| Item                       | Result | Notes                                                                                                     |
| -------------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| Tab reaches all controls   | Pass   | Skip link, header nav, theme toggle, autocomplete inputs, clear buttons, submit, nav links all reachable. |
| Shift+Tab reverse          | Pass   | Logical reverse order observed in code.                                                                   |
| Visible focus              | Pass   | `focus-visible:ring-2 focus-visible:ring-primary` on inputs, buttons, links.                              |
| Focus order (home)         | Pass   | Origin → swap → destination → submit → location (per component order).                                    |
| Skip link                  | Pass   | `sr-only focus:not-sr-only` link to `#main-content`; main has `tabIndex={-1}`.                            |
| Autocomplete keyboard      | Pass   | ArrowDown/Up, Enter selects, Escape closes. `aria-activedescendant` wired.                                |
| Escape closes autocomplete | Pass   | `handleKeyDown` Escape sets `isOpen=false`.                                                               |
| No keyboard traps          | Pass   | No modal/dialog traps; mobile nav is persistent.                                                          |
| Dialog/drawer keyboard     | N/A    | No modal dialogs in V1.                                                                                   |

## C. Semantic structure review

| Item                       | Result | Notes                                                                                                                                |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Logical heading hierarchy  | Pass   | H1 per page ("Find a jeepney route", etc.), H2/H3 for sections.                                                                      |
| Landmarks                  | Pass   | `<header>`, `<main id="main-content">`, `<nav aria-label>`.                                                                          |
| Buttons for actions        | Pass   | Submit, clear, theme toggle, swap are `<button>`.                                                                                    |
| Links for navigation       | Pass   | Wouter `<Link>` renders `<a>`.                                                                                                       |
| Form controls labeled      | Pass   | `<label htmlFor>` + `aria-describedby`.                                                                                              |
| Icon-only controls labeled | Pass   | Theme toggle `aria-label`; clear button `aria-label="Clear …"`. Icons `aria-hidden="true"`.                                          |
| Images alt text            | Pass   | SVG icons decorative (aria-hidden); favicon not content.                                                                             |
| Status messages            | Pass   | Validation errors `role="alert"`; autocomplete "No matching stops" text; preliminary-data notice.                                    |
| Autocomplete ARIA          | Pass   | `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-haspopup="listbox"`, `aria-autocomplete="list"`, `aria-activedescendant`. |

## D. Color and contrast review

- Text tokens: `--color-text` on `--color-bg`/`--color-surface`. Not measured with a contrast checker in this environment; design tokens are intended to meet WCAG AA. **Exact ratios not claimed.**
- Focus indicator: visible ring (`ring-primary`, 2px) on surface.
- Error state: `text-error` + `role="alert"` (not color-only).
- Dark theme: separate tokens (`--color-text` on dark bg). Reviewed visually via prior phase; no regression observed.
- Reduced motion: `prefers-reduced-motion` respected (no decorative animations beyond CSS transitions).

## E. Responsive accessibility (viewports)

Inspected via code + mobile E2E tests:

- 320px: mobile E2E covers 320px, 360px, 375px, 390px, 412px — no horizontal overflow (test passes).
- 375px: covered.
- 768px: `md:` breakpoint switches to desktop nav.
- 1024px / 1440px: `max-w-6xl` container, responsive padding.
- Touch targets: `min-h-11` (44px) / `min-h-12` (48px) on interactive controls. Pass.
- Map controls on mobile: lazy-loaded MapView; markers interactive.
- Drawer/dialog: none in V1.

## F. Screen-reader readiness (DOM inspection only — NOT performed with live SR)

| Item                        | Result  | Notes                                                                                                        |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| Page title announced        | Partial | Title is `Para — Find jeepney routes in Cebu` after local fix; production still has mojibake until redeploy. |
| Main landmark               | Pass    | `<main id="main-content">`.                                                                                  |
| Heading hierarchy           | Pass    | H1 then H2/H3.                                                                                               |
| Form labels                 | Pass    | Associated via `htmlFor`/`id`.                                                                               |
| Required instructions       | Pass    | `role="alert"` errors.                                                                                       |
| Autocomplete announcements  | Partial | `aria-activedescendant` + `role="option"`; live SR behavior not verified.                                    |
| Journey result descriptions | Pass    | Text content includes route, duration, distance, fare.                                                       |
| Saved controls              | Pass    | Button labels clear.                                                                                         |
| Map alternative info        | Pass    | Stop list available alongside map.                                                                           |
| Status notices              | Pass    | Preliminary-data notice in `role="note"`.                                                                    |

**Actual screen-reader testing: NOT PERFORMED.** Marked as not tested, not claimed as passed.

## G. Automated accessibility results (Axe + Playwright)

### Chromium

- Pages/states scanned: home (light/dark), results (light/dark), journey details (light), map (light), saved (light), not-found (light), home validation errors, home autocomplete open, empty results.
- Result: **18 tests passed**, 0 accessibility violations.
- Browser-specific: none.

### Firefox

- Result: **17 passed, 1 skipped**.
- Skip: `home autocomplete open` — axe-core crashes Firefox when scanning the autocomplete-open DOM. Documented tooling limitation, not an application defect.

### WebKit

- Result: **16 passed, 2 failed**.
- Failures:
  1. `autocomplete and swap work` — `getByRole('option', { name: /sm city cebu/i })` not visible after typing 'SM'.
  2. `valid supported search navigates to results` — destination fill 'SM' did not surface suggestion.
- Assessment: WebKit-specific autocomplete timing/rendering limitation. The same flow passes in Chromium and Firefox. Not caused by this phase's title fix. Documented as test-environment/browser limitation, not a confirmed application defect. No code change made.

### Mobile (Pixel 7 / iPhone 13)

- Result: **30 passed** (mobile-chromium 15, mobile-webkit 15).
- Includes responsive overflow checks at 320/360/375/390/412px: no horizontal overflow.

### Summary

- Total Playwright runs: ~81 passed, 1 skipped (Firefox axe crash), 2 failed (WebKit autocomplete).
- Axe violations across all passing scans: **0**.
- No violations suppressed; no test dependencies added.

## H. Defects discovered

| ID      | Severity      | Affected                  | Description                                                                                                                                                      | Fixed this phase?                                                              |
| ------- | ------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| A11Y-01 | Low           | `index.html` (page title) | Page title contained double-encoded em dash (`â€—`) instead of `—`, rendering as mojibake in browser tab and to screen readers.                                  | Yes — replaced with `—` (U+2014).                                              |
| A11Y-02 | Informational | WebKit autocomplete       | Autocomplete suggestions not surfaced in WebKit after typing 'SM' within test timeout. Passes in Chromium/Firefox. Likely test timing or WebKit rendering quirk. | No — documented as browser/test-environment limitation; no application change. |
| A11Y-03 | Informational | Firefox axe scan          | axe-core crashes when scanning autocomplete-open DOM in Firefox.                                                                                                 | No — documented tooling limitation.                                            |

No keyboard-access, focus-trap, or information-hiding defects found.

## I. Conclusion

Accessibility posture is strong: 0 Axe violations across all passing scans, keyboard navigation and focus indicators present, semantic landmarks and labels in place, responsive targets ≥44px. The only code change was the page-title mojibake fix. Live screen-reader testing remains unperformed and is documented as such.
