# Visual, Accessibility & Production Deployment Audit - Para (Phase 31)

## Audit scope

Visual, responsive, accessibility, keyboard, and production-deployment audit of the local production build and the live Vercel deployment. No redesign, no new features, no data changes.

## Screens inspected

- Home
- Search results
- Journey details
- Map
- Saved journeys
- Not Found
- Header / navigation (desktop + mobile bottom nav)
- Autocomplete (keyboard)

## Viewports inspected

320x700, 375x812, 390x844, 768x1024, 1024x768, 1280x800, 1440x900.

## Theme coverage

Light and dark themes inspected via screenshots and browser interaction.

## Visual findings

- No horizontal overflow on any major screen at any tested viewport (local build).
- No unintended layout breakage observed in screenshots.
- Map tiles load from OpenStreetMap; marker legend and listed-stop section render correctly.
- Preliminary-data and fare-unavailable notices visible on results, detail, and map.
- Empty/error states render gracefully (no supported routes, invalid stop IDs, 404).

## Accessibility findings

- Semantic landmarks present (header, nav, main, sections).
- Heading hierarchy: results page previously skipped from H1 to H3 (JourneyCard route code). Fixed by changing JourneyCard heading to H2. (Low)
- Map tile images are decorative with empty alt (correct).
- Map markers provide alt text via react-leaflet.
- Reduced-motion handled in index.css.
- Autocomplete supports keyboard (arrows, Enter, Escape) and ARIA combobox/listbox.
- Focus indicators use focus-visible ring utilities.
- No automated scanner (axe) integrated; manual checks only.

## Keyboard-only results

- Tab order reaches inputs, swap, submit, location, nav links, theme toggle.
- Skip-to-main-content link present.
- Autocomplete selection via keyboard works.
- No keyboard traps observed.

## Automated accessibility results

Not run. No axe-core dependency added (kept minimal). Manual checks only.

## Production deployment findings

- URL https://para-rosy.vercel.app reachable (HTTP 200).
- SPA direct routes load and refresh work (/results, /map, /no-such-page).
- Theme toggle works; no console errors observed.
- Deployed asset filenames (index-BLZSTKzt.js, index-CT4fhQPG.css) match the local production build, indicating the deployed app bundle is current.
- Production source commit cannot be determined from headers or HTML; previously documented reference 6d784fbad51ebb5549a6999f4a80016a9a3538d0 remains unverified against current HEAD.

## Defect severity summary

- 1 Low: heading hierarchy skip on results/saved (fixed).
- No Critical/High/Medium defects found.

## Defects fixed

- JourneyCard.jsx: changed route-code heading from h3 to h2 for correct hierarchy.

## Recommended improvements

- Integrate an automated accessibility scanner (e.g. axe-core) in a future phase.
- Verify production source commit via Vercel dashboard (not accessible here).
- Consider adding browser-level accessibility assertions to E2E tests.

## Manual testing limitations

- Color contrast not measured with a tool; relies on design tokens.
- Screen-reader behavior not tested with real assistive technology.
- Only Chromium tested.

## Phase 32 update

- Integrated @axe-core/playwright; added 11 automated accessibility scans.
- Fixed color-contrast issues: light text-muted darkened, dark mode button/badge text adjusted.
- Added Tailwind class-based dark variant for dark: utilities.
- All 11 scans pass with zero violations.
- Vercel deployment source commit remains unverified; see docs/quality/vercel-deployment-verification.md.
