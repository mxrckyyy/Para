# AGENTS.md — Para

> Persistent instructions and context for OpenCode. Read this file together with the relevant `docs/` documents before implementing any phase. Update this file whenever an important architectural decision changes.

## 1. Project

- **Name:** Para
- **Type:** Frontend portfolio web application (single-page application, SPA)
- **Purpose:** Help commuters in Cebu discover possible jeepney routes between an origin and destination, estimate travel time and fare, view route geometry on an interactive map, and save journeys for later use.
- **Repository state:** Phase 8 complete. Para has README documentation, Vercel-ready build configuration, additional URL-recovery tests, and accessibility setup improvements. All listed verification commands pass.
- **Delivery target:** Vercel static hosting.
- **Product category:** Route discovery and trip planning. **Not** a real-time vehicle tracking, live traffic, arrival-prediction, or booking system.

## 2. Target users and problem

- **Primary users:** Daily commuters, students, workers, visitors, and locals in Cebu who need to understand which jeepney routes might connect two places.
- **Problem:** Jeepney route information in Cebu is fragmented, often unofficial, and hard to combine into a usable journey. Commuters frequently know an origin and destination but not which route or transfer connects them.
- **Value:** Reduce uncertainty by searching routes from static, clearly labeled data, showing journey steps, estimates, and a map, while being honest about data limits.

## 3. Main features and V1 scope

### In scope (V1)

- Origin/destination search with autocomplete stop suggestions
- Use current location to suggest the nearest stop
- Direct-route search (one jeepney route, optional walk to/from stops)
- One-transfer route search (ride + transfer + ride)
- Estimated travel time and fare (clearly labeled as estimates where appropriate)
- Chronological journey steps
- Interactive Leaflet map with route geometry and stop markers
- Saved routes persisted in LocalStorage
- Dark mode with persisted preference
- Responsive, mobile-first UI
- Empty, loading, validation, and error states
- Documentation and deployment readiness

### Explicitly out of scope (V1)

- Live jeepney positions or tracking
- Real-time arrival predictions or ETA updates
- Live traffic
- Online booking or payment
- User accounts, authentication, or profiles
- Backend, database, or API requiring secrets
- Paid map providers
- Native mobile apps
- Complete city-wide official route coverage claims
- Real-time notifications
- Turn-by-turn walking navigation beyond supported data
- Multi-transfer journeys beyond one transfer (V2 candidate)
- Admin/edit tooling for route data in the browser

## 4. Required technology stack

Do not change this stack without updating `docs/DECISIONS.md` and this file.

- **Framework:** React
- **Build tool:** Vite
- **Language:** JavaScript + JSX (no TypeScript in V1)
- **Styling:** Tailwind CSS v4 (utility-first, design tokens)
- **Routing:** Wouter
- **Maps:** Leaflet + React-Leaflet
- **Icons:** Lucide React
- **Route data:** Static JSON files under `src/data/`
- **Location:** Browser Geolocation API
- **Persistence:** `localStorage` only
- **Hosting:** Vercel (static)
- **Testing:** Vitest + React Testing Library (Phase 8)
- **Linting/formatting:** ESLint + Prettier (Phase 1)

Do not add a backend, database, authentication, paid map provider, secret-requiring API, or heavy unnecessary dependencies.

## 5. Architecture rules

- The application is a client-side SPA. There is no server rendering in V1.
- `src/main.jsx` boots React and renders `App`.
- `src/App.jsx` owns the router, providers (theme), and global layout.
- Routing is handled by Wouter. Page components live in `src/pages/`.
- Shared presentational components live in `src/components/`.
- Reusable primitives (Button, Input, Card, Skeleton, etc.) live in `src/components/ui/`.
- Feature components live in folders such as `src/components/search/`, `src/components/routes/`, `src/components/map/`.
- Domain logic (route graph, search, ranking, fare/duration estimation) lives in `src/utils/` as pure functions.
- Browser integrations (geolocation, localStorage, theme) live in `src/hooks/` or `src/lib/`.
- Static route/stop data lives in `src/data/*.json` and is imported by utilities.
- Pages must not contain heavy domain logic; they compose components and call hooks/utilities.
- Components must not fetch from a network; all data is bundled JSON.
- Utilities must be pure and testable without React.
- No direct `localStorage` access in components; use dedicated hooks.
- No inline magic numbers for spacing/colors; use tokens/classes from the design system.
- Keep dependency boundaries: `utils/` -> data; `hooks/` -> `lib/`/`utils/`; `components/` -> hooks/utils; `pages/` -> components/hooks.

## 6. Coding conventions

- Use functional components and hooks only.
- Prefer named exports for utilities/hooks; default export for page components is acceptable.
- Use JSX, not TSX.
- Use `camelCase` for variables/functions, `PascalCase` for components, `kebab-case` or `PascalCase` filenames matching existing convention: components `PascalCase.jsx`, utilities `camelCase.js`, hooks `useThing.js`, data `kebab-case.json`.
- Format with Prettier; lint with ESLint. No unused variables.
- Avoid `any`-style looseness: validate inputs in utilities; document expected shapes.
- Use guard clauses and early returns over deep nesting.
- Avoid global mutable state; pass data via props/context.
- Prefer composition over prop drilling beyond two levels (use context sparingly).
- Keep files under ~250 lines; split when larger.
- No commented-out code in committed files.
- Write meaningful commit messages (conventional style encouraged).

## 7. Component reuse rules

- Before creating a component, check `src/components/ui/` and feature folders.
- Reuse design tokens and primitives (Button, Input, Badge, Card, Skeleton, Alert).
- Do not create a new button/card/input variant without a documented need in `docs/UI_UX_GUIDELINES.md`.
- Do not reintroduce an existing style under a new name.
- New shared component requires: documented purpose, props documented via JSDoc or comments, accessible markup.
- Visual changes to shared components must update `docs/UI_UX_GUIDELINES.md` if they change the established design language.

## 8. File and folder organization

Proposed structure (created incrementally by phase, not all at once):

```text
/
├── AGENTS.md
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── docs/
│   ├── PROJECT_CONTEXT.md
│   ├── ARCHITECTURE.md
│   ├── SYSTEM_DESIGN.md
│   ├── UI_UX_GUIDELINES.md
│   ├── IMPLEMENTATION_PLAN.md
│   ├── DECISIONS.md
│   └── CHANGELOG.md
├── public/
│   └── (favicons, static assets)
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── search/
│   │   ├── routes/
│   │   ├── map/
│   │   └── common/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   ├── utils/
│   └── data/
└── tests/ (or colocated *.test.js)
```

## 9. Data integrity rules

Cebu jeepney data is often incomplete or unofficial. Treat data carefully.

- Never invent official route names, numbers, stops, fares, distances, or geometries.
- Every dataset must be labeled by provenance where practical: `verified`, `sample`, or `estimated`.
- Do not present illustrative or sample data as official government/transit data.
- Fare values, durations, distances, stop sequences, and geometries are estimates or verified values depending on actual evidence; the UI must communicate this where relevant.
- Data files must document source and last-reviewed date in a companion note or top-level metadata field.
- Do not promise complete route coverage; communicate limitations in UI and docs.
- Outdated or invalid saved routes must be handled safely (skip/flag, never crash).
- Prefer `null`/omitted over fabricated values for unknown fields; render "Unknown"/"—" gracefully.

## 10. UI/UX design rules

- Follow `docs/UI_UX_GUIDELINES.md` exactly. It is the most important design document.
- Calm, modern, minimalist transit aesthetic. Trustworthy, clear, friendly, practical, lightweight, mobile-first.
- Green is the primary brand color.
- Generous whitespace, restrained color, subtle borders, strong typography, purposeful hierarchy.
- Avoid excessive gradients, oversized headings, excessive rounded cards, heavy shadows, unnecessary glassmorphism, decorative animations, repetitive card layouts.
- Establish an original identity; do not copy another product's interface.
- Reuse tokens and components; do not introduce a new color/spacing/button/card style without documented reason.
- Do not redesign previously completed pages in later phases unless the phase explicitly requires it.
- Mobile first; test at 320px width; no horizontal overflow.

## 11. Accessibility requirements

- Semantic HTML for structure and controls.
- Keyboard-accessible forms, menus, modals, maps where feasible.
- Visible focus indicators on all interactive elements.
- Appropriate ARIA attributes (labels, roles, live regions for results/errors).
- Screen-reader labels for icons and icon-only controls.
- Sufficient contrast in light and dark themes (target WCAG AA normal text).
- `prefers-reduced-motion` respected; no motion-only signaling.
- Clear validation/error messaging associated with inputs.
- Touch targets at least 44×44px.
- Autocomplete follows accessible combobox/listbox behavior where practical.

## 12. Performance requirements

- Lazy-load the map (route `/map` or component) so heavy Leaflet bundle is not on initial route.
- Avoid rendering the map before needed.
- Keep initial bundle reasonable; analyze with `vite build` + bundle visualizer if added (optional).
- Memoize expensive pure computations (route search) when beneficial.
- Avoid unnecessary re-renders via proper keys and memoization where measured.
- Loading and skeleton states for slow operations.
- No layout shift; reserve space for content.
- Test on mid-range mobile assumptions conceptually.

## 13. Testing and verification requirements

- Utilities (route engine, fare/duration, validators) must have unit tests.
- Integration tests for search -> results -> route detail -> save.
- Accessibility checks (axe) during Phase 8.
- `npm run build` must succeed.
- Lint and format checks must pass.
- Manual smoke test of all primary flows before claiming completion.
- Do not claim a test, build, or deployment succeeded unless actually verified with output.

## 14. Deployment constraints

- Static Vercel deployment. No serverless functions in V1 unless trivial and documented.
- No secrets in client bundle; never embed API keys.
- Base path and asset handling compatible with Vercel.
- Environment variables only for non-secret public config; document in `.env.example` if used.
- `vercel.json` (if needed) kept minimal.

## 15. Prohibited features and unnecessary dependencies

- No backend, database, ORM, auth, sessions.
- No paid map provider or secret API.
- No heavy date libraries (e.g., moment); use native `Date`/`Intl`.
- No full utility libraries (e.g., full lodash) when native suffices.
- No CSS-in-JS runtime; use Tailwind.
- No state management library unless justified (React state/context enough for V1).
- No fabricated data or misleading "official"/"live" claims.
- No analytics that collects personal location without disclosure (avoid in V1).

## 16. Phase-based implementation rules

1. Read `AGENTS.md` and relevant docs before beginning a phase.
2. Inspect existing code before editing.
3. Implement only the requested phase.
4. Do not begin future phases without explicit instructions.
5. Preserve working features from completed phases.
6. Follow `docs/UI_UX_GUIDELINES.md`.
7. Reuse components, design tokens, and utilities.
8. Do not silently change tech stack or architecture.
9. Do not add fake features, fabricated data, or misleading claims.
10. Run relevant tests and build checks.
11. Fix regressions introduced by the current phase.
12. Update changelog and docs when implementation changes affect them.
13. Report files changed, tests performed, results, limitations, and next phase.
14. Do not claim a test/build/deployment succeeded unless verified.
15. If blocked by missing data/services, document the limitation instead of fabricating.

## 17. Acceptance tracking

- Phase completion is only valid when documented acceptance criteria are met and verified.
- Phases 0 through 8 are complete. Para has complete documented functionality, verification checks, and deployment preparation. No production deployment was claimed.
