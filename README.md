# Para

Para is a mobile-first React application that helps commuters in Cebu discover possible jeepney routes between an
origin and destination. It searches bundled static route data, sorts and filters journey options through a
client-side route-finding engine, shows selected stop locations on a map, and saves journeys only as references in
browser LocalStorage.

Para is a route discovery and planning application. It is **not** a live vehicle tracker, real-time traffic
application, schedule service, or transit authority data portal.

## Current features

- Origin and destination autocomplete using bundled stop records
- Swap and clear controls
- Browser geolocation used only to suggest nearby listed stops
- Direct and one-transfer journey search from the Phase 4 route engine
- Journey result cards with estimated duration, stop names, route codes, and transfer stop details
- Journey detail view with route segments, estimate assumptions, fare status, and preliminary-data notices
- Lazy-loaded Leaflet map of listed stop locations
- OpenStreetMap tile attribution and a no-geometry message when route geometry is absent
- Light and dark themes with persisted preference
- LocalStorage-backed saved journey references
- Invalid saved-data recovery
- Responsive layouts for mobile, tablet, and desktop

## Technology stack

- React 19
- Vite 8
- JavaScript and JSX
- Tailwind CSS 4
- Wouter
- Leaflet and React-Leaflet
- Lucide React
- Static JSON datasets bundled with Vite
- Vitest
- ESLint and Prettier
- Vercel static deployment

## Requirements

- Node.js 20.19 or newer
- npm 10 or newer

This repository was developed with Node.js 24.19.

## Installation

```sh
npm install
```

## Local development

```sh
npm run dev
```

Then open the URL printed by Vite.

## Available scripts

```sh
npm run validate:data
npm run lint
npm run format
npm run format:check
npm test
npm run build
npm run preview
```

- `npm run validate:data` runs the Phase-specific structural checks for stops and routes.
- `npm run lint` runs ESLint.
- `npm run format` writes Prettier formatting.
- `npm run format:check` verifies formatting without changing files.
- `npm test` runs Vitest.
- `npm run build` creates the production `dist` directory.
- `npm run preview` serves the production build locally.

## Data model and limitations

Route data lives in:

- `src/data/stops.json`
- `src/data/routes.json`

Each stop includes `id`, `name`, `lat`, `lng`, `aliases`, `source`, `verified`, and `lastReviewed`. Each route includes `id`, `code`, `name`, `color`, `stopIds`, `path`, `source`, `verified`, `lastReviewed`, direction, and optional estimates.

All current stop and route records are preliminary and unverified. Route sequences are simplified from public route descriptions, and many intermediate stops are not present. Coordinates are approximate landmark or district coordinates. No fares, schedules, frequencies, or official operating guarantees are provided.

Important behavioral limitations:

- Travel duration is an estimate from straight-line distances between stop coordinates and a 15 km/h assumption.
- Fare information is unavailable.
- No route geometry is currently available, so the map displays listed stop locations only.
- Saved journeys are references to current IDs and are reconstructed locally; they are not confirmations that a route is currently operating.
- The dataset covers only a small number of route descriptions and should not be used as comprehensive Cebu transit data.

## Deployment: Vercel

Para is a static SPA built by:

```sh
npm run build
```

The production output is created in `dist`.

Vercel can detect Vite automatically. The included `vercel.json` sets the build command, output directory, and SPA rewrite behavior:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/((?!.*\\.).*)",
      "destination": "/index.html"
    }
  ]
}
```

Typical deployment steps:

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Allow Vercel to use `npm run build`.
4. Deploy.

No backend, secret, or database configuration is required. Normal operation depends on public OpenStreetMap tiles and browser geolocation when a user explicitly requests location service.

## Map tiles

The map uses public OpenStreetMap tiles and displays the required OpenStreetMap contributor attribution. Internet access is required for tiles to load. If tiles are unavailable, the rest of Para remains usable and the map section explains its limitations.

## Troubleshooting

- If data changes fail validation, run `npm run validate:data` and review the reported record IDs.
- If linting reports issues, run `npm run lint` before committing.
- If formatting fails, run `npm run format`.
- If tests fail, run `npm test` and inspect the named test file.
- If the build fails after adding an incompatible package, review the React and Vite version constraints.
- If LocalStorage is unavailable, Para still allows manual stop search and route discovery; saved journeys may be disabled.
- If a saved journey no longer reconstructs, Para ignores it and shows a recovery message on the Saved page.
- `npm run preview` is useful for checking the built SPA shell, but follow the README deployment instructions for Vercel.

## Development notes

- Routing is client-side through Wouter.
- Domain route-finding logic is intentionally separated from React components.
- Static JSON remains the only route/stops data source.
- Later project phases are intentionally not represented in this foundation phase.
