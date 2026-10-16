# Project Context — Para

## 1. Project overview

**Para** is a frontend portfolio web application that helps commuters in Cebu discover possible jeepney routes between an origin and a destination. It is a React single-page application (SPA) with no backend, powered by static JSON route data and client-side search.

The application focuses on **route discovery and trip planning**. It helps a user answer: _"What jeepney route (or one transfer) could get me from here to there, and roughly how long/far/costly might it be?"_

## 2. Problem statement

Jeepney route knowledge in Cebu is often fragmented, informal, and inconsistent. Commuters typically know where they are and where they need to go, but not:

- which route number/code serves them,
- where to board and alight,
- whether a transfer is required,
- approximate travel time or fare.

Existing information is scattered across community sources, signage, and local knowledge. There is no single, friendly, mobile-first tool that lets a commuter quickly explore options. Meanwhile, many transit tools depend on live tracking or official GTFS data that does not exist or is unavailable for jeepneys.

Para addresses this by providing a trustworthy, fast, offline-friendly, static-data route explorer, while being explicit about its limitations.

## 3. Project goals

### Primary goals

1. Provide a usable origin/destination route search for selected Cebu jeepney routes.
2. Present journey results in clear chronological steps.
3. Show direct and one-transfer options, ranked by estimated duration.
4. Display route geometry and stops on an interactive map.
5. Allow saving and revisiting journeys via LocalStorage.
6. Demonstrate solid frontend engineering (React, Vite, Tailwind, Wouter, Leaflet) for portfolio presentation.

### Secondary goals

1. Establish reusable design system and documentation.
2. Provide accessibility and responsive behavior consistent with real product standards.
3. Showcase client-side graph search and data-driven UI.

## 4. Target audience

- Daily commuters (workers, students)
- Newcomers and visitors to Cebu
- Locals exploring unfamiliar parts of the city
- Portfolio reviewers and hiring managers (secondary audience: must understand architecture and quality)

## 5. User needs and pain points

| Need                          | Pain point today                            |
| ----------------------------- | ------------------------------------------- |
| Know which jeepney to board   | Routes identified by codes/areas, not stops |
| Understand transfers          | Transfer points not obvious                 |
| Estimate trip time/cost       | No quick estimate available                 |
| Plan on phone while commuting | Heavy apps, poor mobile UX                  |
| Save a trip                   | Must re-search each time                    |
| Use at night / low light      | Many apps lack good dark mode               |

## 6. Core use cases

1. **UC-01 Search by stops:** User selects origin and destination stops, taps "Find routes," sees journey options.
2. **UC-02 Use my location:** User taps "Use my location," app suggests nearest stop as origin.
3. **UC-03 Direct route:** User views a single-route journey with boarding/alighting stops and estimate.
4. **UC-04 One-transfer journey:** User views ride → transfer stop → ride journey.
5. **UC-05 Inspect on map:** User opens map to see route geometry and stops.
6. **UC-06 Save/unsave route:** User saves a journey for quick access later.
7. **UC-07 Manage saved routes:** User views and removes saved journeys.
8. **UC-08 Toggle theme:** User switches light/dark; preference persists.
9. **UC-09 Handle no results:** User sees clear explanation and suggestions when no route found.
10. **UC-10 Autocomplete:** User types partial stop name and selects from suggestions.

## 7. Functional requirements

### Search

- FR-01 The home/search screen shows origin and destination inputs.
- FR-02 Inputs support autocomplete from the stop dataset.
- FR-03 Autocomplete shows matching stops by name/alias with clear selection.
- FR-04 A swap button exchanges origin and destination.
- FR-05 "Use my location" obtains browser geolocation and suggests nearest stop(s).
- FR-06 Search validates that both fields are selected and distinct before submitting.
- FR-07 Invalid/incomplete input shows clear inline errors.

### Route finding

- FR-08 Direct routes are discovered when one route serves both origin and destination stops in order.
- FR-09 One-transfer routes are discovered when two routes share a transfer stop.
- FR-10 Results are ranked by estimated total duration (shortest first).
- FR-11 Duplicate journey variants are removed/deduplicated.
- FR-12 Each result displays route code(s), boarding/alighting stops, transfers, estimated duration, and fare when supportable.

### Route details

- FR-13 Route details screen shows chronological journey segments (walk/ride) when supported.
- FR-14 Transfer stop is clearly identified.
- FR-15 Estimates are labeled uncertain/approximate where data is not verified.

### Map

- FR-16 Map shows relevant route geometry and stop markers.
- FR-17 Map supports selecting a route option to highlight.
- FR-18 Map handles missing geometry gracefully.

### Saved routes

- FR-19 Users can save a journey from results/details.
- FR-20 Saved journeys persist across reloads via LocalStorage.
- FR-21 Users can view and remove saved journeys.
- FR-22 Invalid/outdated saved entries are skipped without crashing.

### Theme

- FR-23 Users can toggle light/dark theme.
- FR-24 Preference persists via LocalStorage.
- FR-25 Theme applies consistently across pages/components/maps.

### Navigation

- FR-26 Mobile bottom navigation; responsive desktop layout.
- FR-27 Clear active navigation state.

## 8. Non-functional requirements

- NFR-01 Mobile-first responsive from 320px to large desktops.
- NFR-02 Touch targets ≥ 44×44px.
- NFR-03 No horizontal overflow at 320px.
- NFR-04 Readable contrast (WCAG AA target).
- NFR-05 Keyboard and screen-reader usable core flows.
- NFR-06 Route search fast for provided dataset (client-side, milliseconds).
- NFR-07 Map lazy-loaded.
- NFR-08 Works without network after initial load (bundled data); geolocation requires network/permission.
- NFR-09 No secrets in client.
- NFR-10 Honest labeling of estimate quality.

## 9. V1 scope and exclusions

See `AGENTS.md` §3. V1 is route discovery + planning only. Live tracking, real-time arrivals, payments, accounts, backend are excluded.

## 10. Assumptions and limitations

- Route data is static and may be outdated/incomplete.
- Coverage is limited to curated dataset; not all Cebu routes/stops included.
- Fares and times are estimates where not verified.
- Geometries may be simplified or unavailable.
- No official endorsement claimed.
- Accuracy depends on data quality and the user's correct stop selection.
- Browser geolocation permission may be denied or unavailable.
- LocalStorage may be cleared by user/browser.

## 11. Success criteria

Phase-level success defined in `docs/IMPLEMENTATION_PLAN.md`. Project success overall:

- App builds and deploys to Vercel without errors.
- Primary flows (search → results → details → map → save → saved) work on mobile and desktop.
- Accessibility and responsiveness meet documented targets.
- Documentation explains scope, architecture, and limitations honestly.
- Portfolio reviewers can understand the engineering decisions.

## 12. Portfolio presentation goals

- Clean, modern UI that looks like a real transit product, not a student CRUD app.
- Documented architecture and decisions.
- Honest scope: "route discovery/planning, not live tracking."
- Reusable design system and components.
- Tests for core domain logic.
- Clear readme/deployment instructions (Phase 8).

## 13. Key clarifications

- This is a **route discovery and planning application**, not a real-time vehicle tracking system.
- No live jeepney positions, ETA predictions, or traffic updates.
- All route and stop information derives from bundled static JSON.
