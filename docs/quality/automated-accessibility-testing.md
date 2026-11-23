# Automated Accessibility Testing - Para

## Accessibility testing architecture

- Runner: Playwright (existing E2E suite).
- Library: @axe-core/playwright (axe-core 4.14).
- Config: playwright.config.mjs (Chromium, single worker, local preview server).
- Test file: tests/e2e/accessibility.spec.mjs (11 tests).
- Each test loads a page (or UI state), runs AxeBuilder with WCAG tags, and asserts zero violations.

## Dependencies

- @axe-core/playwright (dev dependency).
- axe-core (transitive, ~4.14).

## WCAG rule scope

Tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa. Covers automated rules for color contrast, accessible names, ARIA, landmarks, headings, labels, image alt, document language, duplicate IDs, and link/button names.

## Pages and states tested

- Home (light + dark)
- Results (light + dark)
- Journey details (light)
- Map (light)
- Saved (light)
- Not Found (light)
- Home validation errors
- Home autocomplete open
- Empty results

## How to run

npm run test:e2e (includes accessibility tests).

## How to interpret axe violations

Failures print rule id, impact, node count, and help text. Inspect the affected element and fix the source, then rerun. Do not suppress violations without documenting an exception.

## Exception policy

None currently. If an exception is needed, document rule ID, affected component, reason, and follow-up in this file.

## Known automated-testing limitations

- Automated rules cannot catch all keyboard, focus-management, or screen-reader issues.
- Only Chromium tested.
- Color contrast measured against rendered styles.

## Manual testing still required

- Keyboard-only walkthroughs.
- Screen-reader behavior with real assistive technology.
- Focus indicator visibility.
- Reduced-motion verification.

## Current accessibility findings

Phase 32 fixes:

- Light text-muted darkened (#6b7280 -> #4b5563) for contrast.
- Dark mode primary button text changed to dark gray on light-green background.
- Dark mode badge/alias text uses lighter primary-hover shade where needed.
- Added Tailwind class-based dark variant (@custom-variant) so dark: utilities respond to .dark class.
- All 11 accessibility scans pass with zero violations.

## Cross-browser notes

- Firefox: autocomplete-open axe scan skipped (axe-core crash, tooling limitation).
- WebKit: all 11 scans pass.
- See docs/quality/cross-browser-compatibility.md.
