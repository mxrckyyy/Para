# Phase 93 — Screen-Reader Readiness

## A. Status

**Live screen-reader testing: NOT PERFORMED.** No screen reader (NVDA, VoiceOver, JAWS) was available in this environment. This document provides a practical procedure and records what was verified statically.

## B. Static checks completed (code/DOM inspection)

| Item                    | Result   | Evidence                                                                                                                                                                      |
| ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page title              | Improved | `index.html` and `Home.jsx`/`Results.jsx`/`Saved.jsx` titles corrected from mojibake to proper em dash. Production title fix pending deploy.                                  |
| Main landmark           | Pass     | `<main id="main-content" tabIndex={-1}>` in `AppShell`.                                                                                                                       |
| Skip link               | Pass     | `sr-only focus:not-sr-only` link to `#main-content`.                                                                                                                          |
| Heading hierarchy       | Pass     | H1 per page, H2/H3 for sections.                                                                                                                                              |
| Navigation current page | Pass     | `aria-current="page"` on active nav links (desktop + mobile).                                                                                                                 |
| Nav landmarks           | Pass     | `aria-label="Primary navigation"` / `"Mobile primary navigation"`.                                                                                                            |
| Form labels             | Pass     | `<label htmlFor>` associated with inputs.                                                                                                                                     |
| Autocomplete            | Pass     | `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-haspopup="listbox"`, `aria-autocomplete="list"`, `aria-activedescendant`. Option now has `aria-label={stop.name}`. |
| Validation errors       | Pass     | `role="alert"` on error messages.                                                                                                                                             |
| Status notices          | Pass     | `role="note"` for preliminary-data notice; `aria-live="polite"` for journey summary and location messages.                                                                    |
| Icon-only controls      | Pass     | Theme toggle and clear button have `aria-label`; icons `aria-hidden`.                                                                                                         |
| Map alternative         | Pass     | Stop list rendered alongside map.                                                                                                                                             |
| Reduced motion          | Pass     | `prefers-reduced-motion` media query disables animations.                                                                                                                     |

## C. Live-testing procedure (to be performed by user)

### Recommended combinations

- NVDA + Firefox/Chrome on Windows.
- VoiceOver + Safari on macOS or iOS.

### Steps

1. Load each route (`/`, `/results?from=...&to=...`, `/map`, `/saved`) and confirm the page title is announced.
2. Navigate by landmarks (D key in NVDA / rotor in VoiceOver) — confirm main, header, nav regions.
3. Read headings (H key) — confirm H1 then H2/H3 order.
4. Tab through the home form — confirm labels announced for Origin/Destination inputs.
5. Submit empty — confirm `role="alert"` errors are announced.
6. Type in autocomplete — confirm suggestions announced and active descendant tracked.
7. Select a suggestion with Enter/Arrow — confirm input value updated and announced.
8. Navigate to results — confirm route cards announce route, duration, distance, fare.
9. Use save/remove on a journey — confirm button purpose announced.
10. Open map — confirm stop list is readable as an alternative to the map.
11. Toggle theme — confirm label changes ("Switch to light/dark mode").
12. Enable reduced motion — confirm no essential info is motion-only.

## D. What requires live assistive technology

- Actual speech output and reading order.
- `aria-live` announcement timing.
- Autocomplete active-descendant tracking in real SR.
- Map alternative usability.

These cannot be verified by DOM inspection or Axe alone.
