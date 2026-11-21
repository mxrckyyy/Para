# Test Inventory Reconciliation - Para

## Historical counts

- Phase 26 report: 56 tests (routeEngine 28, mapData 8, savedJourneys 13, journeyLinks 7).
- Phase 28 report: 49 tests.

## Current discovered test files

| File                            | Active tests |
| ------------------------------- | -----------: |
| src/utils/routeEngine.test.js   |           28 |
| src/utils/mapData.test.js       |            8 |
| src/utils/savedJourneys.test.js |           13 |
| src/utils/journeyLinks.test.js  |            7 |
| Total                           |           56 |

## Vitest runner result

`npm test` reports: Test Files 4 passed (4), Tests 56 passed (56).

## Skipped / pending

None. No `.skip` or `.only` usage found.

## Git-history comparison

- HEAD at audit time: d8d4819277269828c070a5bf57cc6441d15f7f5f.
- The 49-vs-56 difference is a reporting discrepancy: Phase 23 added 7 route-engine edge-case tests, raising the count from 49 to 56. Phases 24/25 reported the stale 49 baseline. No tests were removed, renamed, skipped, or excluded.

## Test-integrity findings

- All 56 tests active; no empty or meaningless tests.
- Route-engine tests use synthetic fixtures independent of the preliminary dataset.
- No hidden execution-order dependency or shared mutable state identified.

## Final authoritative inventory

56 active Vitest unit tests across 4 files. Playwright E2E tests (7) are separate and not included in this count.

## Remaining limitations

- No component-level tests.
- No automated accessibility tests.
- Route engine validated against synthetic fixtures, not official data.
