# Changelog — Para

Chronological list of notable changes. Update each phase.

## Unreleased

### Phase 0 — Documentation and planning (complete)

- Created `AGENTS.md` with persistent project instructions, architecture rules, coding conventions, data/UI/accessibility/performance/testing/deployment rules, prohibited features, and phase rules.
- Created `docs/PROJECT_CONTEXT.md` (overview, problem, goals, audience, requirements, scope, success criteria).
- Created `docs/ARCHITECTURE.md` (SPA architecture, routing, components, data flow, Mermaid diagrams).
- Created `docs/SYSTEM_DESIGN.md` (modules, data model, search algorithms, estimates, limitations).
- Created `docs/UI_UX_GUIDELINES.md` (design direction, color tokens, typography, spacing, component specs, screen specs, motion, accessibility, responsiveness, quality rules).
- Created `docs/IMPLEMENTATION_PLAN.md` (8-phase roadmap with acceptance criteria).
- Created `docs/DECISIONS.md` (technical decisions and tradeoffs).
- Created `docs/CHANGELOG.md`.
- No application features implemented. No scaffolding added.

### Phase 1 — Foundation and project setup (complete)

- Scaffolded Vite + React JavaScript project with Tailwind CSS v4 Vite plugin.
- Added ESLint v9 flat config and Prettier configuration.
- Created application folder structure, shared layout shell, desktop/mobile navigation.
- Implemented Wouter routes for `/`, `/results`, `/map`, `/saved`, and `*` not-found.
- Added global design tokens and Tailwind theme configuration per UI/UX guidelines.
- Implemented theme toggle with `localStorage` persistence and system-theme fallback.
- Added no-flash theme initialization script in `index.html`.
- Created clean placeholder pages and application metadata/favicon.
- Updated repository state and storage key names in architecture docs.

### Phase 2 — Static route and stop data (complete)

- Added `src/data/stops.json` (9 unverified sample stop records) and `src/data/routes.json` (4 unverified sample route records).
- Added `src/utils/validateRouteData.js` and `scripts/validate-data.mjs`.
- Added npm script `validate:data`.
- Added `docs/route-data-sources.md`.
- Updated `docs/SYSTEM_DESIGN.md` to reflect Phase 2 JSON file shape, provenance fields, `lng`, `stopIds`, `path`, and `color`.
- Updated `docs/CHANGELOG.md`.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, and `npm run build`.
- Later-phase features remain unimplemented.
- Verified: `npm run lint`, `npm run format:check`, `npm run build`, and direct-route preview responses (200).

### Phase 3 — Search and autocomplete (complete)

- Added `src/components/search/StopAutocomplete.jsx`.
- Added `src/hooks/useGeolocation.js`.
- Added `src/utils/geoDistance.js`.
- Implemented accessible Home search form with origin/destination inputs, autocomplete suggestions, swap, clear controls, and validation.
- Implemented nearest-stop suggestions via browser geolocation using a 2 km threshold.
- Added a persistent data-quality notice for preliminary stop records.
- Implemented `Results` URL recovery using `from` and `to` query parameters.
- Updated `docs/ARCHITECTURE.md` routing description for query parameters.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, and `npm run build`.
- Route-finding, interactive maps, saved routes, fare calculations, and live transit features remain unimplemented.

### Phase 5 — Results and route details (complete)

- Added `src/pages/RouteDetail.jsx`.
- Rewrote `src/pages/Results.jsx` to run the Phase 4 route engine and render journey cards.
- Added `src/utils/journeyLinks.js` for URL parsing, encoding, and journey matching.
- Added `/route` handling in `src/App.jsx`.
- Integrated engine-ranked direct and transfer journey cards.
- Added journey detail flow with origin, destination, ordered route segments, transfer stop, duration assumptions, unavailable fare, and preliminary-data notices.
- Added URL handling for missing, malformed, unknown, and identical stop IDs.
- Updated changelog.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.
- Interactive maps, saved routes, geolocation-based routing remain unimplemented.

### Phase 6 — Interactive map (complete)

- Added `leaflet` and `react-leaflet`.
- Added `src/components/map/MapView.jsx`.
- Added `src/utils/mapData.js` and 8 unit tests for valid coordinates, marker selection, unsupported geometry, and fallback behavior.
- Reworked `src/pages/Map.jsx` to lazy-load Leaflet via `React.lazy` and Suspense.
- Added marker styles, dark-mode tile filtering, map CSS, origin/destination/transfer marker types, and a no-geometry message.
- Integrated map links from Results and RouteDetail.
- Updated map documentation only through repository-state and changelog notes.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.
- Saved routes and geolocation-based routing remain unimplemented.

### Phase 28 — Safe verification workflow and evidence collection system

- Added `docs/field-verification/04L-verification-protocol.md`.
- Added `docs/field-verification/04L-claim-checklist.md`.
- Documented safe research boundaries, evidence acceptance criteria, conflict resolution, approval workflow, and privacy considerations.
- Did not add fieldwork instructions requiring travel, boarding, or approaching drivers or passengers.
- Did not change route data, route status, geometry, fare, schedule, or travel-time values.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Phase 27 — 04L official source discovery and evidence research

- Reviewed the SunStar Cebu report on LTFRB-7's Notice of Compliance for Cebu City's LPTRP.
- Documented that the report does not list `04L` among newly rationalized PUJ Class 2 routes.
- Documented that this absence does not establish whether `04L` remains in operation, has been discontinued, or may be incorporated into another route.
- Added a 2025–2026 transport framework timeline to route-data verification documentation.
- Did not change route, stop, fare, schedule, travel-time, or geometry data.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Phase 26 — Test suite integrity audit and historical test-count reconciliation

- Added `docs/test-suite-integrity-audit.md`.
- Confirmed the current test count is 56 tests.
- Explained the 49-versus-56 discrepancy as a reporting difference after Phase 23 added 7 route-engine edge-case tests.
- Confirmed no tests were deleted, skipped, renamed, excluded, or weakened.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Phase 25 — Controlled 04L evidence review

- Created `docs/evidence-reviews/04L-review-2026-11-21-phase-25.md`.
- Re-reviewed secondary sources for route `04L`.
- Added a claim-level evidence matrix and source inventory.
- Confirmed that `04L` remains partially verified and `verified` remains false.
- Did not add geometry, fare, schedule, travel-time data, or additional stops.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Phase 24 — Route coverage strategy and evidence gap assessment

- Added `docs/route-coverage-assessment.md`.
- Documented the existing 9-stop, 4-route dataset.
- Assessed evidence quality and route-by-route gaps.
- Defined a route prioritization methodology.
- Created a future evidence collection checklist.
- Defined dataset expansion decision rules.
- Recommended `04L` as the first route for future verification.
- Did not add routes, stops, geometry, fares, schedules, or travel times.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Phase 23 — Route engine reliability and data integrity audit

- Added focused route-engine edge-case tests.
- Improved invalid stop-reference handling so invalid route stop IDs cannot produce journeys when stop data is available.
- Preserved route discovery, ranking, deduplication, and estimate behavior.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Phase 20 — Controlled 04L evidence review

- Created `docs/evidence-reviews/04L-review-2026-11-21.md`.
- Reviewed Suroy.ph and CommuteTour Philippines as additional secondary sources.
- Confirmed route `04L` remains `partially_verified` and `verified: false`.
- Did not add geometry, fare, schedule, travel-time data, or additional stops.
- Documented claim-by-claim evidence and remaining uncertainties.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Phase 19 — Safe verification workflow and evidence collection system

- Added `docs/evidence-review-template.md`.
- Updated `docs/route-data-verification.md` with claim-level verification, evidence documentation model, review workflow, safe observation protocol, and template guidance.
- Updated `docs/route-data-schema.md` with an optional evidence-record structure.
- Preserved existing validation behavior and unverified data.
- No route, stop, geometry, fare, schedule, or travel-time data was invented.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Phase 18 — 04L evidence completion and verification readiness

- Investigated official and secondary sources for route `04L`.
- Official LTFRB, Cebu City, and Cebu City Transportation Office sources were not directly accessible.
- Reviewed Suroy.ph as a secondary source.
- Confirmed that `04L` is supported only as a partially verified corridor.
- Documented a potential `01K` endpoint mismatch.
- Added field-verification requirements and remaining research gaps.
- Did not change route, stop, fare, schedule, travel-time, or geometry data.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Phase 17 — Pilot Cebu jeepney route verification

- Selected route `04L` (`route-04l-lahug-sm-via-ayala`) as the pilot route.
- Reviewed Suroy.ph and Cebu Daily News Digital as secondary sources.
- Updated the route and three related stops with `partially_verified` status and source provenance.
- Added `direction: "forward"` based on secondary source direction support, while keeping `verified: false`.
- Did not add geometry, fare, schedule, travel time, or unverified stops.
- Updated route-data source and verification documentation.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Phase 16 — Transit data verification foundation

- Added `docs/route-data-verification.md`.
- Added `docs/route-data-schema.md`.
- Updated `docs/route-data-sources.md` with source reliability and dataset audit information.
- Corrected mojibake in `src/data/routes.json` route names and cited descriptions.
- Added optional provenance validation for `verificationStatus`, `verificationDate`, `reviewedBy`, `evidenceReference`, and `sourceOrganization`.
- Added consistency checks between `verified` and `verificationStatus`.
- Preserved all existing unverified stop and route records.
- No route, stop, fare, schedule, direction, or geometry was invented.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Senior UI/UX audit and interface refinement

- Improved navigation active-state visibility.
- Improved autocomplete suggestion touch targets and scrolling.
- Improved map marker accessibility and added a color-independent marker legend.
- Updated preliminary-data messaging to reflect implemented journey results.
- Increased primary interactive touch-target sizing.
- Preserved existing functionality, routing, data, and design direction.

### Dependency modernization

- Upgraded React and React DOM to 19.3.1.
- Upgraded Vite to 8.3.8 and @vitejs/plugin-react to 6.3.0.
- Upgraded Tailwind CSS and @tailwindcss/vite to 4.3.5.
- Upgraded supporting packages to current stable releases, including Wouter 3.13.0, Lucide React 1.77.0, Vitest 5.1.1, ESLint 10.15.0, and Prettier 3.10.1.
- Verified data validation, linting, formatting, tests, and production build after the upgrade.

### Senior UI/UX audit and interface refinement

- Added a skip link and route-change focus restoration.
- Improved active navigation indication, autocomplete dropdown scrolling, and map marker accessibility metadata.
- Added a color-independent map marker legend.
- Continued to use the documented Tailwind v4 design tokens and existing component patterns.
- Verified all core checks and the production build after refinement.

### Phase 8 — Quality assurance, documentation, and deployment preparation (complete)

- Added `README.md` with setup, commands, data limitations, map, persistence, and Vercel deployment instructions.
- Added `vercel.json` with Vite build/output configuration and SPA fallback rewrites.
- Added accessibility improvements: skip link and route-change focus restoration.
- Added 9 tests for journey-link parameter handling and unavailable URL recovery.
- Updated documentation and repository state.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.
- No new feature behavior, route data, map geometry, or geolocation routing was added.

### Phase 7 — Saved routes and theme consistency (complete)

- Added `src/utils/savedJourneys.js` and `src/hooks/useSavedRoutes.js`.
- Added `src/components/routes/JourneyCard.jsx`.
- Implemented LocalStorage-backed, versioned, reconstructed saved journeys.
- Added save/unsave controls to Results and RouteDetail and a populated `/saved` page.
- Added 13 saved-journey persistence and recovery tests.
- Reviewed light/dark theme behavior across navigation, search, results, details, saved, map controls, and error/empty states.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.
- No backend, database, geolocation routing, new datasets, or Phase 8 deployment work were added.

### Phase 4 — Route-finding engine (complete)

- Added `src/utils/routeConstants.js`, `src/utils/routeEstimates.js`, and `src/utils/routeEngine.js`.
- Added Vitest dependency and `test` / `test:watch` npm scripts.
- Added `src/utils/routeEngine.test.js` with 21 unit tests for direct routes, transfers, validation, deduplication, ranking, estimates, and input immutability.
- Implemented direction-aware direct-route discovery.
- Implemented one-transfer discovery with explicit transfer-stop checks.
- Implemented ranking, deduplication, configurable duration heuristics, and unavailable fare reporting.
- Updated repository state in `AGENTS.md`.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.
- Maps, saved routes, search UI changes, geolocation-based routing, live transit, scheduling, and new datasets were not implemented.

### Phase 21 — User-facing transit data transparency and trust UX

- Added `src/components/common/DataStatusBadge.jsx`.
- Added route-data status badges to journey cards and route details.
- Clarified preliminary-data, calculated-duration, and unavailable-fare messaging.
- Updated map no-geometry messaging to state that markers are listed locations only.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Phase 22 — Transparency UX browser QA and refinement

- Performed browser-based QA of Phase 21 transparency changes.
- Verified routes, interactions, themes, responsive overflow, and browser console health.
- No source defects were found requiring changes.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test`, and `npm run build`.

### Phase 30 - Browser end-to-end testing and regression foundation

- Added Playwright dev dependency and `test:e2e` npm script.
- Added `playwright.config.mjs` with local preview server and Chromium configuration.
- Added `tests/e2e/home-search.spec.mjs`, `tests/e2e/journey-details.spec.mjs`, and `tests/e2e/navigation-responsive.spec.mjs` (7 browser E2E tests).
- Covered home validation, autocomplete, swap, supported search, results, journey detail, preliminary-data messaging, fare-unavailable messaging, map markers and no-geometry notice, save/remove/persist journeys, invalid parameters, 404, theme toggle, refresh/back navigation, and responsive overflow (320-1440 px).
- Added `docs/quality/browser-e2e-testing.md` and `docs/quality/test-inventory-reconciliation.md`.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test` (56/56), `npm run build`, and `npm run test:e2e` (7/7).
- Route and stop data unchanged (9 stops, 4 routes). No new features, geometry, fares, or schedules added.

### Phase 31 - Visual quality, accessibility, and production deployment audit

- Performed visual, responsive, accessibility, keyboard, and production-deployment audit.
- Inspected all major screens at 7 viewport sizes in light and dark themes.
- Verified production URL reachability, SPA routing, refresh, theme toggle, and absence of console errors.
- Confirmed deployed asset filenames match the local production build.
- Reported production source commit as unknown (not exposed by deployment).
- Fixed one Low-severity heading-hierarchy issue in `JourneyCard.jsx` (h3 to h2).
- Added `docs/quality/visual-accessibility-audit.md`.
- Verified with `npm run validate:data`, `npm run lint`, `npm run format:check`, `npm test` (56/56), `npm run build`, and `npm run test:e2e` (7/7).
- Route and stop data unchanged (9 stops, 4 routes).

### Phase 32 - Automated accessibility testing and deployment provenance

- Added @axe-core/playwright dev dependency.
- Added tests/e2e/accessibility.spec.mjs with 11 WCAG 2.1/2.2 AA scans (light/dark, UI states).
- Fixed color-contrast defects: light text-muted darkened (#6b7280 to #4b5563); dark mode button text darkened; badge/alias text adjusted; added Tailwind class-based dark variant.
- All 11 accessibility scans pass with zero violations.
- Added docs/quality/automated-accessibility-testing.md and docs/quality/vercel-deployment-verification.md.
- Updated docs/quality/browser-e2e-testing.md and docs/quality/visual-accessibility-audit.md.
- Documented production deployment commit as unverified (not exposed by deployment).
- Verified with npm run validate:data, npm run lint, npm run format:check, npm test (56/56), npm run build, npm run test:e2e (18/18).
- Route and stop data unchanged (9 stops, 4 routes).
