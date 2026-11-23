# Mobile Device Testing - Para (Phase 34)

## Supported emulated devices

- Android: Pixel 7 (Chromium) via Playwright device descriptor.
- iPhone: iPhone 13 (WebKit) via Playwright device descriptor.

## Browser engines used

- Chromium (mobile-chromium project).
- WebKit (mobile-webkit project).

## Viewport coverage

320, 360, 375, 390, 412 px widths at 800 px height (home overflow checks). Device descriptors provide their native viewport for functional tests.

## Test scenarios

- Home render, search form, autocomplete (origin/destination), theme toggle.
- Valid/invalid search flows.
- Results render, journey detail open, map render.
- Saved journey save/persist/remove.
- Navigation back/forward.
- Horizontal overflow at multiple widths.

## How to run mobile tests independently

npx playwright test --project=mobile-chromium --project=mobile-webkit

## How to run the full regression suite

npm run test:e2e

## Known limitations

- Emulation is not real-device testing. Touch gestures, real performance, and OS-level behavior are not validated.
- Only two device profiles covered.
- No mobile-specific accessibility scans beyond the shared Axe suite.

## Difference between emulation and real-device testing

Emulation approximates viewport, user agent, and touch capability. Real devices add hardware, OS, network, and gesture fidelity. Manual device testing remains recommended.
