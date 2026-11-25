# Phase 92 — Production Verification

## A. Vercel access

- Vercel CLI available via `npx vercel` (v66.6.0), authenticated as `mxrckyyy`.
- Project: `para` (prj_YAR0t7BX7ZoeFf6ZsukflnnIx1rF), owner `mxrckyyy`, framework Vite, build `npm run build`, output `dist`.
- Production branch: `main`, Git provider: GitHub (mxrckyyy/Para).

## B. Deployment status

- Latest production deployment: `para-aody1mgbs-mxrckyyy.vercel.app` (id `dpl_EUeLZswhpr4DSrt3Gs8uUsXktJcM`).
- Status: **Ready** (promoted).
- Created: Wed Nov 25 2026 10:41:00 GMT+0800 (Singapore Standard Time).
- Build duration: 7s (+ 15s post-build). Billable: 1m.
- Aliases: `para-rosy.vercel.app`, `para-mxrckyyy.vercel.app`, `para-git-main-mxrckyyy.vercel.app`.

## C. Deployed commit SHA verification

- Vercel deployment `gitSource.sha`: `dbcd8822ad5deaa850c6aefbc71dfa37c0c64d48`.
- Local HEAD: `dbcd8822ad5deaa850c6aefbc71dfa37c0c64d48`.
- `origin/main`: `dbcd8822ad5deaa850c6aefbc71dfa37c0c64d48`.
- Commit message: "add docs".
- **Classification: VERIFIED MATCH** — deployed SHA matches both local HEAD and origin/main.

## D. Production HTTP checks

| Route                       | Status | Notes                                  |
| --------------------------- | ------ | -------------------------------------- |
| `/`                         | 200    | SPA shell loads                        |
| `/results`                  | 200    | SPA fallback                           |
| `/map`                      | 200    | SPA fallback                           |
| `/saved`                    | 200    | SPA fallback                           |
| `/nonexistent-route`        | 200    | SPA fallback (client-side 404 renders) |
| `/theme-init.js`            | 200    | 398 bytes                              |
| `/assets/index-CbAm7A4m.js` | 200    | 247,442 bytes                          |
| `/favicon.svg`              | 200    | 266 bytes                              |

SPA fallback behavior correct. No 404 from server for unknown paths (client handles 404).

## E. Security headers (production)

- Content-Security-Policy: present (default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.tile.openstreetmap.org; ...)
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: geolocation=(self)
- X-Frame-Options: DENY
- Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
- X-Vercel-Cache: HIT

## F. Production smoke tests

- Home: heading visible (prior phase + HTTP 200).
- Results: reachable.
- Map: reachable.
- Saved: reachable.
- 404: client-side fallback renders.
- Console errors: none observed (prior phase).
- Failed requests: none observed (prior phase).
- `theme-init.js`: 200, 398 bytes.

## G. Production vs local

- Navigation consistent (same routes).
- Search/results: same query params supported.
- Map: lazy-loaded chunk present in build.
- Saved routes: localStorage-based, consistent.
- Responsive layout: consistent (same CSS).
- Production-only console/network errors: none observed.

## H. Production title defect (pre-existing, not yet deployed fix)

- Current production page title renders as `Para â€— Find jeepney routes in Cebu` (mojibake em dash) due to double-encoded UTF-8 in `index.html`.
- Local fix applied in this phase (replaced mojibake `â€—` with `—`); will take effect on next deploy.
- Classification of production title: **defect present in deployed build; fix pending deployment.**

## I. Limitations

- Vercel dashboard manual access not required; CLI provided sufficient metadata.
- No new deployment triggered; no settings changed.
- Production smoke tests performed via HTTP checks and prior-phase Playwright runs; full interactive production E2E not re-run in this phase.
