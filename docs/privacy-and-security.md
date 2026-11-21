# Privacy and Security - Para

## What Para stores

Para stores only two pieces of information in the browser's localStorage:

- Theme preference (`para_theme`: "light" or "dark").
- Saved journeys (`para_saved_routes`): reconstructed references to route/stop IDs from the bundled dataset, plus a timestamp. No personal identifiers, no location coordinates, no account data.

## No accounts or authentication

Para has no user accounts, login, profiles, or authentication. All data stays in the user's browser.

## Geolocation

Location is requested only when the user clicks "Use my location". Coordinates are held in React component state for the session and are never persisted or transmitted. If permission is denied, the app remains fully usable via manual stop selection.

## External services

- Map tiles are loaded from OpenStreetMap tile servers (third-party). Tile requests may expose the user's IP address and approximate map viewport to OpenStreetMap.
- No analytics, tracking, or advertising scripts are included.
- No backend API or server-side storage is used. All data is bundled static JSON.

## Clearing stored data

Users can clear Para's data by clearing browser storage for the site, or by removing saved journeys in the app. Theme preference resets to system preference when cleared.

## Known limitations

- Saved journeys are stored unencrypted in localStorage and are accessible to any script running on the same origin.
- No Content Security Policy is configured; adding one would need to allow OpenStreetMap tiles and inline styles used by the UI.
- The application relies on the browser's same-origin policy for storage isolation.
