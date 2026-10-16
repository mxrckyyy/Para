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
