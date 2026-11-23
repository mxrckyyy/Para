# Phase 53 Production Security Header Verification

## Audit overview

Read-only verification of whether Phase 52 security configuration is active in production.

## Initial Git state

- Branch: main
- HEAD: 4d6627fe48d1b0b3bef4b8db1d63aaa62ceed56c
- Working tree: modified (docs/CHANGELOG.md, vercel.json, index.html, tests) + untracked (public/theme-init.js, prior phase artifacts)

## Phase 52 expected security configuration

- CSP via vercel.json headers + (was meta tag, removed; vercel.json is source of truth)
- Security headers: X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options
- theme-init.js external script

## Production HTTP results

- URL: https://para-rosy.vercel.app
- Status: 200 OK
- Content-Type: text/html; charset=utf-8
- Last-Modified: Mon, 23 Nov 2026 14:17:21 GMT (before Phase 52)
- ETag: "eb3589ea6fa24cd2603e6e93377e1c9d"

## Actual security header values

| Header                    | Actual value                                 | Expected (Phase 52)             | Result            |
| ------------------------- | -------------------------------------------- | ------------------------------- | ----------------- |
| Content-Security-Policy   | (none)                                       | Full CSP policy                 | MISSING           |
| X-Content-Type-Options    | (none)                                       | nosniff                         | MISSING           |
| Referrer-Policy           | (none)                                       | strict-origin-when-cross-origin | MISSING           |
| Permissions-Policy        | (none)                                       | geolocation=(self)              | MISSING           |
| X-Frame-Options           | (none)                                       | DENY                            | MISSING           |
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload | (Vercel default)                | Present (default) |

## CSP verification

- CSP is NOT enforced in production. No Content-Security-Policy header present.
- This is expected: Phase 52 changes are uncommitted and not deployed.
- Production still uses inline theme script (old version).
- theme-init.js returns 404 in production.

## Theme script verification

- /theme-init.js: 404 (not deployed). Production uses inline script in index.html (old version).

## Map resources

- Map tiles load from OpenStreetMap (production smoke test passed, map heading visible).
- No CSP to restrict tiles in production (old deployment has no CSP).

## Browser smoke test results

- Desktop: home, results, map, saved, 404 all load. No console errors. No failed requests.
- Mobile: not separately tested in this phase (desktop viewport only).
- Search, results, details, map, saved, theme, routing all work.

## Production/local comparison

- Production asset filename: index-DjPbKCPQ.js (matches local build).
- Production HTML still has inline theme script (old version).
- Production does NOT have Phase 52 changes (no CSP, no theme-init.js).
- Classification: UNVERIFIED (deployed commit SHA not exposed; asset filename match is informational only).

## Deployment provenance classification

UNVERIFIED (same as Phase 42/51). Asset filenames match but commit SHA not exposed.

## Security findings by severity

- Medium: CSP not yet deployed (expected; changes uncommitted).
- Low: No CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options in production (will be applied on next deployment).
- Informational: HSTS present (Vercel default). No secrets exposed.

## Remaining limitations

- Phase 52 changes not deployed (read-only phase).
- Deployed commit SHA unknown.
- No CSP in production until deployment.

## Recommended actions

1. Deploy the Phase 52 changes (vercel.json + theme-init.js) via normal deployment process.
2. Verify CSP headers after deployment.
3. Verify theme-init.js loads (200) after deployment.
4. Confirm no CSP violations in production browser console.

## Final Git state

- Branch: main
- HEAD: 4d6627fe48d1b0b3bef4b8db1d63aaa62ceed56c
- Modified: docs/CHANGELOG.md, vercel.json, index.html, tests/e2e/journey-details.spec.mjs, tests/e2e/mobile-responsive.spec.mjs
- Untracked: public/theme-init.js, docs/quality/phase-50-integrated-release-readiness-audit.md, docs/quality/phase-51-production-provenance-verification.md, docs/quality/phase-52-security-hardening-report.md, docs/quality/phase-53-production-security-verification.md
- No commit, push, or deploy.
