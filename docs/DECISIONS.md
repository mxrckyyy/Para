# Decision Log — Para

Record of important technical decisions, tradeoffs, and conditions for change.

## D-01 React + Vite over server-rendered framework

- **Decision:** Use React as an SPA built with Vite.
- **Reasoning:** Portfolio focus on client-side React skills; no backend needed; fast dev experience; Vercel static hosting simple.
- **Tradeoffs:** No SSR/SEO benefits; larger initial JS than server components. Acceptable for an interactive app shell.
- **Revisit if:** Need SEO/SSR or significant first-load performance issues; consider Next.js/Remix then.

## D-02 JavaScript + JSX over TypeScript

- **Decision:** Use JavaScript (JSX) for V1.
- **Reasoning:** Faster iteration, lower barrier for contributors, matches assignment expectation; runtime validation compensates partially.
- **Tradeoffs:** Less compile-time safety; refactors riskier.
- **Revisit if:** Codebase grows beyond ~10k lines or data model churn becomes painful; migrate to TS with documentation update.

## D-03 Tailwind CSS v4

- **Decision:** Tailwind v4 via CSS `@theme`.
- **Reasoning:** Utility-first speed, co-located styling, consistent tokens, v4 modernized configuration; no CSS-in-JS runtime.
- **Tradeoffs:** Team must learn token discipline; purging relies on usage.
- **Revisit if:** Tailwind maintenance concerns or need complex theming beyond tokens.

## D-04 Wouter over React Router

- **Decision:** Wouter for routing.
- **Reasoning:** Minimal size, simple API sufficient for small route set.
- **Tradeoffs:** Smaller ecosystem; fewer advanced features.
- **Revisit if:** Need nested layouts/guards/loaders at scale; migrate to React Router.

## D-05 Leaflet + React-Leaflet over paid maps

- **Decision:** Leaflet with OpenStreetMap tiles.
- **Reasoning:** Free, open, no API key, standard for SPAs; attribution respectful.
- **Tradeoffs:** Tile availability/quality; need careful licensing/attribution; performance for many markers.
- **Revisit if:** Need commercial-grade geocoding/real-time; evaluate paid provider then with secrets handling.

## D-06 Static JSON over backend

- **Decision:** Bundle stops/routes as static JSON; no backend/database.
- **Reasoning:** V1 scope; keeps hosting simple and free; removes auth/data-ops burden; reveals data limitations transparently.
- **Tradeoffs:** Data updates require redeploy; no user contributions; bundle size grows with data.
- **Revisit if:** Crowdsourcing or frequent updates needed; add backend + moderation.

## D-07 LocalStorage for saved routes + theme

- **Decision:** Persist in localStorage only.
- **Reasoning:** Fits static hosting; offline-friendly; no accounts.
- **Tradeoffs:** Device-bound, clearable, no cross-device sync; schema migration burden.
- **Mitigation:** Schema versioning; graceful invalid data handling.

## D-08 Client-side graph search

- **Decision:** Compute journeys in the browser.
- **Reasoning:** No backend; instant results; transparent algorithms.
- **Tradeoffs:** CPU on device; limited dataset scale.
- **Revisit if:** Dataset becomes large (thousands of routes) or multi-transfer increases complexity; move to backend or optimize.

## D-09 Vercel static hosting

- **Decision:** Deploy static build to Vercel.
- **Reasoning:** Free tier, Git integration, SPA fallback, CDN.
- **Tradeoffs:** Vendor reliance; cold none (static).
- **Mitigation:** Build is portable to any static host.

## D-10 System font stack (default)

- **Decision:** Use system fonts in V1; optional web font later.
- **Reasoning:** Performance and native feel; lower bundle.
- **Tradeoffs:** Less distinctive typography control.
- **Revisit if:** Portfolio polish warrants a single self-hosted variable font.

## D-11 One transfer maximum in V1

- **Decision:** Cap journeys at one transfer.
- **Reasoning:** Keeps UI and algorithm simple; typical commuter transfers ≤1 in target dataset; reduces complexity.
- **Tradeoffs:** Misses longer multi-transfer trips.
- **Revisit:** V2 can extend engine.

## D-12 No global state library

- **Decision:** React state/context only.
- **Reasoning:** Sufficient for scope; avoids extra dependency.
- **Revisit if:** Prop drilling becomes unmanageable.
