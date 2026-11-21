# Browser End-to-End Testing - Para

## Purpose

Para's Vitest suite (56 unit tests) validates pure utility logic. This document describes the Playwright browser end-to-end (E2E) layer added in Phase 30, which exercises the real application in a browser through user-like interactions.

## Architecture

- Configuration: `playwright.config.mjs`
- Test directory: `tests/e2e/`
- Test files:
  - `tests/e2e/home-search.spec.mjs` - home page, validation, autocomplete, swap, supported search
  - `tests/e2e/journey-details.spec.mjs` - results, route detail, map, saved journeys, invalid parameters
  - `tests/e2e/navigation-responsive.spec.mjs` - theme toggle, refresh/back navigation, responsive overflow
- Application under test is the production build served locally (`npm run preview` on `http://localhost:4173`).
- Playwright manages the web server lifecycle via `webServer` in the config.

## Installation requirements

- Node.js and npm (already required by the project).
- Playwright test runner: `@playwright/test` (dev dependency).
- Chromium browser binary: installed via `npx playwright install chromium`.

## How to run

    npm run test        # Vitest unit tests (56)
    npm run test:e2e    # Playwright browser E2E tests (7)

Always run `npm run build` before `npm run test:e2e` if the preview server is not already running with a fresh build; Playwright starts `npm run preview` automatically.

## Browser requirements

- Chromium (Chrome for Testing) is the supported browser for this phase.
- Tests run with a single worker and are not parallelized to keep local storage and server state predictable.

## Test coverage

| Workflow                                                | Covered |
| ------------------------------------------------------- | ------- |
| Home page loads and primary fields visible              | Yes     |
| Empty/invalid search validation                         | Yes     |
| Autocomplete responds and selects stops                 | Yes     |
| Swap origin/destination                                 | Yes     |
| Valid supported search navigates to results             | Yes     |
| Results display route information                       | Yes     |
| Journey detail loads and shows preliminary-data notices | Yes     |
| Fare unavailable messaging                              | Yes     |
| Map renders markers and no-geometry notice              | Yes     |
| Save and remove journey, persistence across reload      | Yes     |
| Invalid stop IDs and journey tokens fail gracefully     | Yes     |
| 404 page for unknown routes                             | Yes     |
| Theme toggle and persistence                            | Yes     |
| Refresh and back navigation                             | Yes     |
| Responsive horizontal overflow (320-1440 px)            | Yes     |
| Map layout overflow at mobile width                     | Yes     |

## Test design notes

- Selectors prefer accessible roles, labels, and text over CSS classes.
- Each test gets a fresh browser context, so `localStorage` is isolated.
- No external network or map tile dependencies: map tests validate the application's own markers and messaging.
- Debounce timing is accommodated by waiting for option visibility and input value rather than fixed sleeps where possible.

## Known limitations

- Only Chromium is tested; Firefox and WebKit are not installed.
- No automated accessibility scanner (axe) integration in this phase; accessibility checks are manual and selector/role based.
- No visual regression screenshots are captured.
- Tests depend on the local dataset (9 stops, 4 routes); they are not parameterized.
- Full keyboard and screen-reader verification remains manual.

## Failure troubleshooting

- If `npm run test:e2e` cannot start the server, ensure port 4173 is free or set `reuseExistingServer`.
- If tests time out on autocomplete, increase waits or check debounce timing in `StopAutocomplete.jsx`.
- If saved-journey counts are wrong, clear browser storage or rerun with a fresh context.
- Review `test-results/` for screenshots and traces on failure.

## Unit vs. browser E2E tests

- Vitest (`npm test`): fast, Node-based, tests pure functions in `src/utils/`.
- Playwright (`npm run test:e2e`): real browser, tests rendered UI, routing, storage, and user flows.

Totals are reported separately; do not combine them.

## Accessibility tests

- File: `tests/e2e/accessibility.spec.mjs` (11 tests).
- Uses `@axe-core/playwright` with WCAG 2.1/2.2 AA tags.
- Scans pages and UI states in light and dark themes.
- Included in `npm run test:e2e`.
- See `docs/quality/automated-accessibility-testing.md`.

## Cross-browser support

- Projects: chromium, firefox, webkit (configured in playwright.config.mjs).
- All E2E tests run in each browser.
- Known: Firefox axe-core crashes on autocomplete-open scan (skipped with documentation).
- WebKit required slightly longer autocomplete waits (400ms).
- See docs/quality/cross-browser-compatibility.md.

## Mobile device projects

- mobile-chromium (Pixel 7), mobile-webkit (iPhone 13).
- Test file: tests/e2e/mobile-responsive.spec.mjs (30 tests, 15 per device).
- See docs/quality/mobile-device-testing.md.
