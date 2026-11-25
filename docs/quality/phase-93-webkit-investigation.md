# Phase 93 — WebKit Autocomplete Investigation

## A. Failing tests

- `tests/e2e/home-search.spec.mjs`:
  1. `autocomplete and swap work` (intermittent)
  2. `valid supported search navigates to results` (intermittent)

Reported in Phase 92 as WebKit: 16 passed, 2 failed.

## B. Reproduction

Run individually:

```
npx playwright test tests/e2e/home-search.spec.mjs --project=webkit
```

Failure frequency before fixes: intermittent (~1 in 3 runs). Failures occurred at different points:

- `locator.click: Test timeout` waiting for `getByRole('option', { name: /jy square/i })`.
- `expect(page).toHaveURL(expected)` (navigation did not occur).
- `expect(locator).toBeVisible()` (suggestion did not render).

## C. Root-cause investigation

### 1. Blur race (application defect)

`StopAutocomplete.handleBlur` scheduled `setIsOpen(false)` after 100ms. This could fire after `focus()` re-opened the list, closing it before the debounced suggestions rendered. In slower browsers (WebKit), the 100ms blur timer routinely beat the 120ms debounce.

**Fix applied:** `handleBlur` now checks `document.activeElement` after a 0ms timeout; it only closes when focus has actually left the component. Pending blur timers are cancelled on focus and input change. (See `src/components/search/StopAutocomplete.jsx`.)

### 2. WebKit accessible-name computation (test/browser limitation)

In WebKit, a `<button role="option">` with nested `<span>` children computed an empty accessible name, so `getByRole('option', { name: /jy square/i })` never matched even when the option was rendered. Chromium and Firefox compute the text content as the accessible name.

**Fix applied:** Added `aria-label={stop.name}` to the option button, giving a consistent, explicit accessible name across browsers. This also improves screen-reader announcements.

### 3. Remaining flakiness

After both fixes, WebKit runs still fail intermittently (click timeouts, toHaveURL). The failures are not reproducible deterministically and occur at different points. They appear to be WebKit-specific timing/rendering behavior in the test environment, not a single reproducible application defect. Chromium and Firefox were also observed to fail the same test intermittently before and after the changes, confirming the test itself is timing-sensitive.

## D. Fixes made

1. `src/components/search/StopAutocomplete.jsx`:
   - Blur race fix (activeElement check, timer cancellation).
   - Added `aria-label={stop.name}` to option button.

## E. Unresolved issues

- The `valid supported search navigates to results` test remains intermittently flaky in WebKit (and occasionally Chromium). Root cause not fully isolated; likely a combination of WebKit rendering timing and the test's reliance on fixed sleeps. No assertion was weakened.
- Recommendation: if reproducible on real devices, investigate increasing debounce or replacing fixed sleeps with `expect(...).toBeVisible()` waits. Do not change debounce without evidence.

## F. Conclusion

Two genuine, low-risk application/accessibility defects were fixed (blur race, missing accessible name). Remaining WebKit failures are intermittent and environment-related; documented as unresolved rather than claimed fixed.
