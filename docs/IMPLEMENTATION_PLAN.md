# Implementation Plan — Para

Phase 0 (documentation) is complete. The phases below are the implementation roadmap. Do not start a phase until explicitly requested. Each phase must meet its acceptance criteria before being considered done.

## Phase 0 — Documentation and planning (complete)

- **Objectives:** Establish project context, architecture, system design, UI/UX guidelines, tech decisions, phased plan.
- **Deliverables:** AGENTS.md, docs/*.
- **Status:** Complete. No application features implemented.

## Phase 1 — Foundation and project setup

- **Objectives:** Scaffold Vite + React, Tailwind v4, Wouter, ESLint/Prettier, base layout, theme toggle skeleton, routing shell.
- **Dependencies:** Phase 0.
- **Files/modules:** package.json, vite.config.js, src/main.jsx, src/App.jsx, src/index.css, src/components/layout/_, src/hooks/useTheme.js, src/pages/_ stubs, eslint/prettier config, .gitignore, README.md.
- **Scope:** Project scaffolding, layout shell, navigation, theme basic, route definitions with placeholder pages. No domain logic.
- **Acceptance criteria:**
  - `npm install` succeeds; `npm run dev` runs.
  - `npm run build` succeeds.
  - `npm run lint` passes.
  - All planned routes render placeholder pages.
  - Theme toggle works and persists.
  - Responsive shell matches UI doc (header + bottom nav).
- **Tests:** Smoke render tests (optional Phase 1), build/lint.
- **Definition of done:** Build/lint pass; skeleton navigable on mobile/desktop; changelog updated.
- **Out of scope:** Data, search, map, saved routes logic.

## Phase 2 — Static route and stop data

- **Objectives:** Create curated JSON datasets (stops, routes) with provenance metadata and validation utility.
- **Dependencies:** Phase 1.
- **Files/modules:** src/data/stops.json, src/data/routes.json, src/data/metadata.json, src/utils/validateData.js, tests.
- **Scope:** Data model finalization, sample/verified data labeling, nearest-stop utility foundation.
- **Acceptance criteria:**
  - Data validates against documented shape (dev warnings only).
  - Provenance fields present (`source`, `verified`, `lastReviewed`).
  - No fabricated "official" claims; limitations documented in README.
  - At least enough routes for meaningful demo search.
- **Tests:** Validation unit tests, dataset smoke checks.
- **Definition of done:** Data loads; validation passes; documented sources/limitations.
- **Out of scope:** Route engine, UI search.

## Phase 3 — Search and autocomplete

- **Objectives:** Implement autocomplete search form, swap, use-my-location, validation, navigation to results.
- **Dependencies:** Phase 2.
- **Files/modules:** src/components/search/*, src/hooks/useGeolocation.js, src/utils/nearestStop.js, Home page, useLocalStorage.
- **Scope:** Full search UX, accessible combobox, geolocation suggestions, validation.
- **Acceptance criteria:**
  - Autocomplete works keyboard and mouse.
  - Validation messages accessible.
  - Use-my-location suggests nearest stops (permission handled).
  - Swap works.
  - Navigation to /results with params.
- **Tests:** Component/integration tests for autocomplete + validation; unit tests for nearestStop.
- **Definition of done:** Search flow usable on mobile/desktop; changelog updated.
- **Out of scope:** Route algorithm, map.

## Phase 4 — Route-finding engine

- **Objectives:** Implement direct + one-transfer discovery, ranking/dedup, estimates, validators.
- **Dependencies:** Phase 2, 3 (for integration).
- **Files/modules:** src/utils/routeEngine.js, findDirectRoutes, findOneTransferRoutes, rankRoutes, estimate.js, tests.
- **Scope:** Pure domain logic with comprehensive tests.
- **Acceptance criteria:**
  - Direct and transfer discovery correct on sample data.
  - Ranking shortest duration first; dedup.
  - Directionality enforced.
  - Estimates labeled; no fabricated precision.
  - Unit test coverage for core functions.
- **Tests:** Extensive unit tests including edge cases.
- **Definition of done:** Tests pass; results render in Results page.
- **Out of scope:** Map rendering, saved routes.

## Phase 5 — Results and route details

- **Objectives:** Render journey options, details, segments, map preview link, save action.
- **Dependencies:** Phase 4.
- **Files/modules:** src/pages/Results.jsx, RouteDetails.jsx, src/components/routes/*.
- **Scope:** Results list, empty/loading states, detail timeline, metrics, disclaimers.
- **Acceptance criteria:**
  - Results sorted and deduped with clear UI states.
  - Detail shows chronological steps and transfer stop.
  - No route found empty state.
  - Save/unsave basic (may require Phase 7 fully but can wire).
- **Tests:** Integration tests.
- **Definition of done:** Core read flow complete.
- **Out of scope:** Full map, persistence polish.

## Phase 6 — Interactive map

- **Objectives:** Leaflet map, lazy load, route geometry, stop markers, selector, controls.
- **Dependencies:** Phase 5.
- **Files/modules:** src/components/map/*, src/pages/Map.jsx, dynamic import.
- **Scope:** Map rendering and interaction; graceful geometry fallback.
- **Acceptance criteria:**
  - Map lazy-loads.
  - Selected route highlighted; selector works.
  - Attribution present.
  - Missing geometry handled.
- **Tests:** Component render tests (mock Leaflet as needed); manual.
- **Definition of done:** Map usable; no initial bundle regression beyond documented.
- **Out of scope:** Saved route persistence improvements.

## Phase 7 — Saved routes and dark mode

- **Objectives:** Saved routes persistence, management UI, dark mode polish and consistency.
- **Dependencies:** Phases 5, 6.
- **Files/modules:** useSavedRoutes, SavedRoutes page, schema migration, theme refinements.
- **Scope:** Persistence robustness, invalid-data handling, dark mode across map.
- **Acceptance criteria:**
  - Save/unsave persists across reload.
  - Invalid entries skipped with notice.
  - Theme persists and applies everywhere (incl. map).
- **Tests:** Storage + component tests.
- **Definition of done:** Persistence robust.
- **Out of scope:** Deployment finalization.

## Phase 8 — Testing, accessibility, performance, documentation, deployment

- **Objectives:** Hardening: a11y, performance, docs, README, Vercel deployment.
- **Dependencies:** All prior.
- **Files/modules:** tests/*, a11y checks, performance tweaks, README.md, vercel.json if needed.
- **Scope:** Final verification and deploy.
- **Acceptance criteria:**
  - `npm run build` and `npm run lint` succeed.
  - Accessibility checks pass on key screens.
  - Lighthouse reasonable (no hard threshold but no obvious failures).
  - Deployed to Vercel successfully; smoke test live URL.
- **Tests:** Full test suite.
- **Definition of done:** Deployed and verified; documentation updated; changelog entry.
- **Out of scope:** New features.

## Phase boundaries

- Implement only requested phase.
- No future phases without explicit request.
- Preserve previous phases; fix regressions.
