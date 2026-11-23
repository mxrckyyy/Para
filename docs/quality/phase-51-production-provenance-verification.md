# Phase 51 Production Deployment Provenance Audit

## Audit overview

Read-only verification of whether the deployed production application corresponds to the audited local release candidate (commit 4d6627fe).

## Initial Git state

- Branch: main
- HEAD: 4d6627fe48d1b0b3bef4b8db1d63aaa62ceed56c
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts)
- Remote: origin https://github.com/mxrckyyy/Para.git
- Upstream: origin/main

## Audited baseline commit

4d6627fe48d1b0b3bef4b8db1d63aaa62ceed56c (phase 50)

## Local and remote Git comparison

- Local HEAD: 4d6627fe48d1b0b3bef4b8db1d63aaa62ceed56c
- origin/main: 4d6627fe48d1b0b3bef4b8db1d63aaa62ceed56c
- Ahead/behind: 0/0 (no divergence)
- Working tree has uncommitted documentation changes from prior phases.

## Production HTTP results

- URL: https://para-rosy.vercel.app
- Status: 200 OK
- Content-Type: text/html; charset=utf-8
- Last-Modified: Mon, 23 Nov 2026 14:17:21 GMT
- ETag: "eb3589ea6fa24cd2603e6e93377e1c9d"
- HSTS: max-age=63072000; includeSubDomains; preload
- No CSP, X-Frame-Options, or Referrer-Policy headers.
- SPA fallback: unknown routes return index.html (200).

## Asset and build comparison

- Production HTML references: /assets/index-DjPbKCPQ.js and /assets/index-CJ2SFgmW.css
- Local build output: index-DjPbKCPQ.js and index-CJ2SFgmW.css (match)
- Production asset filenames match local build, but this is NOT proof of source commit identity (filenames are content-hashed).

## Provenance classification

UNVERIFIED

The deployed commit SHA is not exposed by the production deployment (no metadata endpoint, no header, no HTML comment). Matching asset filenames are consistent with the local build but cannot independently establish source parity.

## Browser smoke test results

- Home page: heading visible, no console errors.
- Results route: heading visible.
- Map route: heading visible.
- Saved route: heading visible.
- Not Found: 404 heading visible.
- Console errors: none.
- Failed requests: none.
- Layout: no issues observed.

## Deployment configuration findings

- vercel.json: framework vite, buildCommand npm run build, outputDirectory dist, SPA rewrite.
- No source maps in production build (default Vite).
- No secrets in client bundle.
- No CSP or additional security headers (documented limitation).

## Security header findings

- HSTS present. No CSP, X-Frame-Options, X-Content-Type-Options, or Referrer-Policy.

## Release consistency findings

- Production HTML title: "Para - Find jeepney routes in Cebu" (matches).
- Production communicates preliminary data (visible in rendered app).
- No false claims of live tracking or official verification observed.

## Known limitations

- Deployed commit SHA unknown (UNVERIFIED).
- No CSP configured.
- No real-user monitoring.

## Recommended actions

1. Verify deployed commit SHA via Vercel dashboard (manual).
2. Consider adding CSP headers compatible with Leaflet/OpenStreetMap.
3. No code changes needed.

## Final Git state

- Branch: main
- HEAD: 4d6627fe48d1b0b3bef4b8db1d63aaa62ceed56c
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts)
- No commit, push, or deploy.
