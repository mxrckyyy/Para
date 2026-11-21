# Cross-Browser Compatibility - Para (Phase 33)

## Browser versions

- Playwright: 1.65.1
- Chromium: 159.0.8154.6 (Chrome for Testing)
- Firefox: 159.0
- WebKit: 27.2 (Safari)

## Operating environment

- Windows 11, Node.js v24.19.0.

## Test configuration

- playwright.config.mjs: 3 projects (chromium, firefox, webkit), single worker, local preview server, screenshots/traces on failure.

## Functional coverage

All existing E2E tests (home-search, journey-details, navigation-responsive, accessibility) run in each browser.

## Accessibility scan coverage

11 axe scans in each browser, except Firefox autocomplete-open scan (skipped due to axe-core crash). WebKit and Chromium run all 11.

## Browser-specific findings

- Firefox: axe-core crashes when scanning the autocomplete-open DOM. Documented as a tooling limitation; scan skipped in Firefox only.
- WebKit: autocomplete options took longer to render; increased wait from 250ms to 400ms. All tests pass after adjustment.
- No other browser-specific failures.

## Failed or unavailable browsers

None. All three browsers installed and executed successfully.

## Fixes made

- Increased autocomplete wait time (250ms -> 400ms) in home-search.spec.mjs for WebKit stability.
- Skipped Firefox-only axe scan of autocomplete-open state (documented).

## Remaining limitations

- Only desktop viewport projects; mobile device emulation not added.
- axe-core Firefox crash on autocomplete-open state unresolved (upstream tooling issue).
- Manual accessibility checks not performed.
