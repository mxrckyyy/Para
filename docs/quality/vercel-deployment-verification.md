# Vercel Deployment Verification - Para

## Production URL

https://para-rosy.vercel.app

## Repository reference

https://github.com/mxrckyyy/Para.git

## Previously documented commit reference

6d784fbad51ebb5549a6999f4a80016a9a3538d0

## Later local HEAD reported in previous phases

d8d4819277269828c070a5bf57cc6441d15f7f5f

## Deployment source commit

Not independently verified. The production deployment does not expose the source commit SHA via HTTP headers or HTML. Matching asset filenames (index-*.js/css) between local build and production indicate the deployed application bundle is current, but this is not proof of deployment provenance.

## Verification method used

- HTTP reachability check (200 OK).
- Direct SPA route loading and refresh (/, /results, /map, /saved, /no-such-page).
- Theme toggle and console error inspection via Playwright.
- Asset filename comparison (informational only).

## Deployment limitations

- No authenticated Vercel API access was available.
- No commit SHA exposed by the deployment.
- No deployment record or build log inspected.

## Manual Vercel dashboard verification instructions

1. Open the Vercel dashboard and select the Para project.
2. Open the Deployments tab.
3. Identify the production deployment (marked Production).
4. Open the deployment details and note the Git Commit SHA (full 40-character SHA).
5. Compare that SHA with `git rev-parse HEAD` in the local repository.
6. Confirm the deployment's source branch and repository match `https://github.com/mxrckyyy/Para.git` (main branch).
7. Check the deployment status and creation time.
8. Do not change any settings or trigger a redeployment.

If the full SHA matches the local HEAD, the production deployment contains the current local code. If it differs, identify the deployed commit in Git history to determine which features are included.
