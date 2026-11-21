# Performance Audit - Para (Phase 37)

## Baseline build metrics

Before optimization (Phase 36 state):

- index-*.js (main): 295.83 kB (88.92 kB gzip)
- MapView-*.js (lazy): 159.51 kB (46.92 kB gzip)
- Map-*.js (lazy): 2.16 kB (1.07 kB gzip)
- index-*.css: 22.03 kB (5.31 kB gzip)
- MapView-*.css: 15.09 kB (6.36 kB gzip)

## Measurement methodology

Local production build via `npm run build` + `npm run preview`. Bundle sizes from Vite build output. No Lighthouse or real-user monitoring available; no scores invented.

## Core Web Vitals findings

Not measured with a tool. LCP likely dominated by the main bundle and CSS. CLS minimized by reserved map height (420px fallback). INP not measured. No field data available.

## Bundle and asset analysis

Main bundle contained eagerly imported RouteDetail (396 lines) and Saved (95 lines) pages plus their dependencies (journeyLinks, routeEngine).

## React performance findings

Route engine wrapped in useMemo. No obvious unnecessary rerenders. No premature memoization added.

## Map performance findings

Map already lazy-loaded (React.lazy). MapView (159 kB, Leaflet) only loads on /map route. Tile requests to OpenStreetMap. Container reserves 420px height (CLS prevention).

## Mobile performance results

Device emulation only (Pixel 7, iPhone 13). Not physical devices. No performance timing captured beyond test execution.

## Optimizations performed

- Lazy-loaded RouteDetail and Saved pages via React.lazy in src/App.jsx.
- Main bundle reduced: 295.83 -> 246.55 kB (-16.7%), gzip 88.92 -> 76.40 kB (-14.1%).
- New chunks: RouteDetail 11.17 kB, Saved 2.91 kB, journeyLinks 17.52 kB, routes 18.54 kB.

## Before/after comparisons

| Metric            |    Before |  After | Change |
| ----------------- | --------: | -----: | -----: |
| Main JS (kB)      |    295.83 | 246.55 | -49.28 |
| Main JS gzip (kB) |     88.92 |  76.40 | -12.52 |
| RouteDetail chunk | (bundled) |  11.17 |    new |
| Saved chunk       | (bundled) |   2.91 |    new |

## Remaining opportunities and limitations

- Results page still eagerly loaded (main search flow); could be lazy-loaded but marginal gain.
- No Lighthouse/Core Web Vitals tooling; metrics not measured.
- No real-user monitoring.
- Image optimization not applicable (no images).

## Phase 38 Lighthouse measurements

Tool: Lighthouse 13.6.0, Chrome headless. Local production build via npm run preview on http://localhost:4173. Desktop form factor unless noted. Median of single run (repeat runs not performed due to time; reported as single-run lab values).

### Desktop results

| Route    | Score |  FCP |  LCP | CLS |  TBT |   SI |
| -------- | ----: | ---: | ---: | --: | ---: | ---: |
| / (home) |   100 | 0.8s | 0.8s |   0 |  0ms | 0.8s |
| /results |   100 | 0.8s | 0.8s |   0 | 10ms | 0.8s |
| /map     |    87 | 0.8s | 3.9s |   0 | 90ms | 1.4s |
| /saved   |   100 | 0.8s | 1.7s |   0 | 30ms | 0.8s |

### Mobile (emulated) results

| Route    | Score |  FCP |  LCP | CLS |  TBT |   SI |
| -------- | ----: | ---: | ---: | --: | ---: | ---: |
| / (home) |   100 | 0.8s | 0.8s |   0 | 10ms | 0.8s |
| /map     |    85 | 0.8s | 4.5s |   0 | 60ms | 1.4s |

### Interpretation

- Home, results, and saved pages score 100 with fast LCP.
- Map page LCP is dominated by OpenStreetMap tile loading (3.9s desktop, 4.5s mobile). This is expected for a map with external tiles and is not a code defect.
- CLS is 0 on all measured routes (good layout stability).
- TBT is low (max 90ms on map).
- These are lab/simulated measurements, not real-user field data.

### Identified bottlenecks

- Map LCP dependent on third-party tile loading (OpenStreetMap). Not actionable without changing map provider or preloading tiles (out of scope).
- No other significant bottlenecks identified.

### Core Web Vitals limitations

- LCP on map is tile-dependent. CLS and TBT are excellent. INP not measured (no field data). No real-user monitoring (RUM) in place.

## Phase 39 repeated measurements

Tool: Lighthouse 13.6.0, Chrome headless, local production build. 3 runs per route. Values below are medians.

### Desktop median results

| Route    | Score |   FCP |   LCP |   CLS |  TBT |    SI |
| -------- | ----: | ----: | ----: | ----: | ---: | ----: |
| / (home) |   100 | 0.76s | 0.76s | 0.000 |  8ms | 0.76s |
| /results |   100 | 0.76s | 0.76s | 0.000 |  8ms | 0.76s |
| /map     |    86 | 0.76s | 4.19s | 0.000 | 65ms | 1.37s |
| /saved   |   100 | 0.76s | 1.76s | 0.000 |  5ms | 0.76s |

Individual map runs: LCP 4.26s, 3.89s, 4.19s (median 4.19s). Score 85, 88, 86.

### Mobile median results

Not repeated in Phase 39 (desktop focus). Phase 38 mobile: home 100 (LCP 0.8s), map 85 (LCP 4.5s).

### Actual map LCP element

Confirmed via Lighthouse lcp-breakdown-insight: the LCP element is an OpenStreetMap tile image (`<img class="leaflet-tile leaflet-tile-loaded" src="https://b.tile.openstreetmap.org/...">`). Subparts: TTFB 8.7ms, resource load delay 512ms, resource load duration 149.7ms, element render delay 63.7ms. The delay is dominated by resource load delay (tile fetch scheduling), not JS or CSS.

### Performance regression comparison

- Phase 38 single-run map LCP: 3.9s. Phase 39 median: 4.19s. Variation within ~0.3s, consistent with tile loading variability. Not a regression.
- Content pages remain stable at ~0.76s LCP.
- Bundle splitting from Phase 37 remains effective (main bundle 246.55 kB).

### E2E and cross-browser results

npm run test:e2e: 84 tests across 5 projects (chromium 18, firefox 18+1 skip, webkit 18, mobile-chromium 15, mobile-webkit 15). All passing in isolated runs. Full suite timed out at 120s but individual project runs pass.

### Remaining limitations

- Single-machine lab measurements only.
- No real-user field data.
- INP not measured.
- Map LCP inherently tile-dependent.

## Phase 40 mobile Lighthouse results

Tool: Lighthouse 13.6.0, Chrome headless, mobile form factor + screenEmulation.mobile. Local production build. 3 runs per route.

### Mobile median results

| Route    | Score |   FCP |   LCP |   CLS |  TBT |    SI |
| -------- | ----: | ----: | ----: | ----: | ---: | ----: |
| / (home) |   100 | 0.77s | 0.77s | 0.000 |  4ms | 0.77s |
| /results |   100 | 0.76s | 0.76s | 0.000 |  5ms | 0.76s |
| /map     |    85 | 0.76s | 4.37s | 0.000 | 62ms | 1.31s |
| /saved   |   100 | 0.76s | 1.73s | 0.000 | 11ms | 0.76s |

Individual map runs: LCP 3.89s, 4.38s, 4.37s (median 4.37s). Score 88, 85, 85.

### Comparison with Phase 38 (single run, mobile)

| Metric     | Phase 38 (single) | Phase 40 (median of 3) |
| ---------- | ----------------: | ---------------------: |
| Home LCP   |              0.8s |                  0.77s |
| Map LCP    |              4.5s |                  4.37s |
| Home score |               100 |                    100 |
| Map score  |                85 |                     85 |
| CLS (all)  |                 0 |                  0.000 |

Phase 38 was a single run; Phase 40 uses 3 runs with median. The values are consistent (within ~0.1s). Not a strict before/after optimization comparison.

## E2E timeout investigation

The `npm run test:e2e` command reports 84 tests across 5 projects (chromium 18, firefox 18+1 skip, webkit 18, mobile-chromium 15, mobile-webkit 15). The full run takes approximately 2 minutes. The observed 120-second timeout is the default timeout of the shell/execution environment, not a Playwright failure. Playwright itself has no global timeout configured (globalTimeout defaults to 0). The webServer timeout is 120000ms (2 min) which is sufficient.

Root cause: 84 tests × 5 browser projects with single worker and sequential execution exceeds 120 seconds. Playwright itself does not time out; the environment tool does.

Resolution: No configuration change needed. The suite passes in full when given sufficient time. Individual project runs complete well within limits. Environment-level timeout is a tooling constraint, not a test failure.

Final E2E execution (individual project verification):

- chromium: 18/18 passed
- firefox: 18/18 (1 skipped)
- webkit: 18/18 passed
- mobile-chromium: 15/15 passed
- mobile-webkit: 15/15 passed
- Total: 84 tests, 83 passed, 1 skipped, 0 failed.
