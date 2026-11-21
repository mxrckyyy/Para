# Test Suite Integrity Audit — Para

## 1. Audit objective

Audit the current route-engine and related utility test suite, explain the historical test-count discrepancy, and confirm that no tests were weakened or removed without justification.

## 2. Initial Git state

- Branch: `main`
- HEAD: `7266e87883ce3e29cb5ff39bf05d5d43d3259214`
- Working tree before this audit: modified documentation, UI, and route-engine files from previous phases.

## 3. Test-runner configuration

- Test command: `npm test`
- Script: `vitest run`
- Test files discovered by Vitest:
  - `src/utils/routeEngine.test.js`
  - `src/utils/mapData.test.js`
  - `src/utils/savedJourneys.test.js`
  - `src/utils/journeyLinks.test.js`
- No Vitest configuration file is present; default Vitest discovery is used.
- The suite uses Vitest only.

## 4. Current test-file inventory

| Test file                         |  Tests | Purpose                                                        |
| --------------------------------- | -----: | -------------------------------------------------------------- |
| `src/utils/routeEngine.test.js`   |     28 | Route discovery, ranking, deduplication, estimates, edge cases |
| `src/utils/mapData.test.js`       |      8 | Coordinate validation and map helper behavior                  |
| `src/utils/savedJourneys.test.js` |     13 | Saved-journey persistence and recovery                         |
| `src/utils/journeyLinks.test.js`  |      7 | URL parameter and journey-token handling                       |
| **Total**                         | **56** |                                                                |

## 5. Historical count investigation

Reported counts:

- Before Phase 23: 49 tests.
- After Phase 23: 56 tests.
- Phase 24: 49 tests.
- Phase 25: 49 tests.

The actual current count is 56 tests.

The discrepancy is explained by Phase 23, which added 7 focused route-engine edge-case tests to `src/utils/routeEngine.test.js`. The Phase 23 report correctly stated 56 passing tests.

Phase 24 and Phase 25 reported 49 tests, which appears to be a stale or incorrect baseline. The repository currently contains all 7 Phase 23 edge-case tests, and they are active and passing.

No tests were deleted, skipped, renamed, excluded, or weakened. The count difference is a reporting discrepancy, not a loss of test coverage.

## 6. Route-engine regression coverage matrix

| Behavior                               | Covered | Test file             |
| -------------------------------------- | ------- | --------------------- |
| Valid direct journey                   | Yes     | `routeEngine.test.js` |
| No direct journey                      | Yes     | `routeEngine.test.js` |
| Origin equals destination              | Yes     | `routeEngine.test.js` |
| Unknown origin or destination          | Yes     | `routeEngine.test.js` |
| Shared stop without valid journey      | Yes     | `routeEngine.test.js` |
| Explicit reverse direction             | Yes     | `routeEngine.test.js` |
| Explicit bidirectional direction       | Yes     | `routeEngine.test.js` |
| Valid one-transfer journey             | Yes     | `routeEngine.test.js` |
| Invalid transfer due to ordering       | Yes     | `routeEngine.test.js` |
| Same route cannot transfer with itself | Yes     | `routeEngine.test.js` |
| Missing intermediate connection        | Yes     | `routeEngine.test.js` |
| Distinct transfer combinations         | Yes     | `routeEngine.test.js` |
| Duplicate journey removal              | Yes     | `routeEngine.test.js` |
| Direct before transfer ranking         | Yes     | `routeEngine.test.js` |
| Stable route-ID tie breaker            | Yes     | `routeEngine.test.js` |
| Unavailable duration placement         | Yes     | `routeEngine.test.js` |
| Unavailable fare behavior              | Yes     | `routeEngine.test.js` |
| Preliminary data status                | Yes     | `routeEngine.test.js` |
| Duration estimate behavior             | Yes     | `routeEngine.test.js` |
| Input immutability                     | Yes     | `routeEngine.test.js` |
| Repeated stop IDs                      | Yes     | `routeEngine.test.js` |
| Invalid stop references                | Yes     | `routeEngine.test.js` |
| One-stop routes                        | Yes     | `routeEngine.test.js` |
| Missing coordinate estimates           | Yes     | `routeEngine.test.js` |
| Invalid estimate inputs                | Yes     | `routeEngine.test.js` |
| Bidirectional availability             | Yes     | `routeEngine.test.js` |
| Multiple direct journeys               | Yes     | `routeEngine.test.js` |

## 7. Test-quality findings

- All 56 tests are active; no skipped or disabled tests were found.
- Assertions are meaningful and behavior-focused.
- No tests were weakened to make the suite pass.
- No hidden order dependency was identified.
- The route-engine tests use synthetic fixtures rather than the production dataset, which keeps them independent of incomplete transit data.
- The invalid stop-reference test correctly exposed a real data-integrity defect, which was fixed in Phase 23.

## 8. Changes Made

Phase 26 was audit-only. No tests were added, removed, or modified.

No source files were changed during this audit.

## 9. Verification Results

- `npm run validate:data`: PASS, 9 stops and 4 routes
- `npm run lint`: PASS
- `npm run format:check`: PASS
- `npm test`: PASS, 56/56
- `npm run build`: PASS

## 10. Remaining Limitations

- No component or browser-based regression tests exist.
- No automated accessibility tests exist.
- The route engine remains validated against synthetic fixtures rather than official route data.
- No end-to-end tests cover the full search-to-saved-journey flow.

## 11. Recommendation for Phase 27

Proceed with a controlled evidence review or field-verification phase for route `04L`. Only update route or stop records when specific claims are directly supported by identifiable evidence. Do not expand route coverage or add geometry until at least one route has complete supporting evidence.
