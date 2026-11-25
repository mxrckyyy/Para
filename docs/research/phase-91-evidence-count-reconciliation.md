# Phase 91 Evidence Count Reconciliation & Research Readiness

## A. Initial Git state

- Branch: main
- HEAD: 3f442345161b05da9998d5189833e6c9630aa5ee
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts)
- origin/main: 3f442345161b05da9998d5189833e6c9630aa5ee (match)

## B. S1/S2 dependency investigation

### S1 (CDN Digital) and S2 (Suroy.ph)

S1 (Cebu Daily News Digital) and S2 (Suroy.ph) are different publishers. They are independent publications. However:

- S2 may reference S1's route code listings.
- S1 cites Cebu City Ordinance No. 2000 and CCTO as its sources.
- S2 does not explicitly cite S1, but the route codes are the same.

Classification: LIKELY DEPENDENCY (S2 may derive route codes from S1 or from the same underlying ordinance, but presents original reporting for corridors and boarding advice).

### S1 and S7 (CDN Digital and Inquirer.net)

CONFIRMED DEPENDENCY: Same publisher (Inquirer Publications). Not independent.

### S2 and S9 (Suroy.ph)

S2 and S9 are the SAME source listed twice with different IDs. This is an inventory error.

### S4 and S15 (OpenAlfa)

S4 and S15 are the SAME source listed twice with different IDs. Another inventory error.

## C. S2/S9 source identity reconciliation

S2 and S9 are duplicate entries for the same source (Suroy.ph). The inventory contains 15 entries but only 13 unique sources.

After deduplication: 13 unique sources (S1-S13).

## D. Revised source dependency matrix

Key corrections:

1. S2/S9 are the same source (duplicate ID). Merge into S2.
2. S4/S15 are the same source (duplicate ID). Merge into S4.
3. S1 and S7 are NOT independent (same publisher).
4. S2 (Suroy.ph) is LIKELY DEPENDENT on S1 (CDN Digital) for route codes.
5. S3 (CommuteTour) appears independent.
6. S5 (LTFRB-7) and S6 (LPTRP) are official but uninspected.
7. S10 (SunStar) depends on S6 (LPTRP).

## E. Recalculated route evidence counts

### 04L

- Directly inspected: 2 (S1, S2). Independent: 2. Official uninspected: 2 (S13, S14).
- Supported: Route identity, endpoints, corridor. Unresolved: sequence, direction, geometry, fare, schedule, travel time.

### 01K

- Directly inspected: 2 (S1, S3). Independent: 2. Official uninspected: 2 (S5, S13).
- Supported: Route identity, endpoints, corridor, service existence. Unresolved: sequence, direction, geometry, fare, schedule, travel time.

### 13C

- Directly inspected: 2 (S1, S3). Independent: 2. Official uninspected: 2 (S6, S13).
- Supported: Route identity, endpoints, corridor, route existence. Unresolved: sequence, direction, geometry, fare, schedule, travel time.

### 17B

- Directly inspected: 1 (S1). Independent: 1. Official uninspected: 1 (S13).
- Supported: Route identity, endpoints. Unresolved: all other claims.

### 03A

- Directly inspected: 1 (S3). Dependent: 1 (S7, same publisher as S1). Unknown independence: 1 (S12).
- Supported: Route identity, endpoints, corridor (from S3). Unresolved: sequence, direction, geometry, fare, schedule, travel time, current service.

## F. Route classification review

- 04L: partially_verified (2 independent secondary sources). No change needed.
- 01K: partially_verified (2 independent secondary + 1 official uninspected). No change needed.
- 13C: partially_verified (2 independent secondary + 1 official uninspected). No change needed.
- 17B: unverified (1 secondary source). Appropriate. No change needed.
- 03A: deferred (effectively 1 independent secondary source). Remains deferred. No change.

## G. 03A assessment

03A has effectively only 1 independent secondary source (CommuteTour). The other source (Inquirer.net/S7) is from the same publisher as CDN Digital (S1), so it does not provide independent corroboration. 03A should not be added to the dataset.

## H. Official-source inspection status

All official sources (LTFRB-7, LPTRP, Ordinance 2000, CCTO) remain UNINSPECTED.

## I. Records request status

All four requests remain NOT SUBMITTED.

## J. Dataset and application integrity

- 9 stops, 4 routes. Unchanged.
- No route data or application code modified.
- Route engine not modified.

## K. Validation results

- validate:data: PASS (9 stops, 4 routes)
- lint: PASS
- format:check: PASS
- npm test: 86/86 passed
- npm audit: 0 vulnerabilities (from prior phase)

## L. Files created or modified

- Created: docs/research/phase-91-evidence-count-reconciliation.md
- Modified: docs/research/source-dependency-matrix.md (corrected S2/S9 and S4/S15 duplicates)
- Modified: docs/CHANGELOG.md

## M. Final Git state

- Branch: main
- HEAD: 3f442345161b05da9998d5189833e6c9630aa5ee
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts + phase-91 doc + corrected matrices)
- No commit, push, or deploy.

## N. Remaining limitations

- No official LTFRB or city government route-level documentation found accessible.
- Complete stop sequences remain unverified for all routes.
- No geometry, fares, schedules, or verified travel times for any route.
- 03A has effectively only 1 independent secondary source.
- No field verification conducted for any route.
- Search tools unavailable (HTTP 403/402).

## O. Recommended Phase 92

Phase 92 should:

1. If official documents become accessible, conduct evidence review for 03A.
2. If no official sources are found, consider whether secondary sources alone justify adding 03A with partially_verified status.
3. Do not add any routes without official or independently corroborated evidence.
4. Continue documenting the evidence gap.

## Classification

PARTIALLY VERIFIED

The existing verification statuses (04L, 01K, 13C as partially_verified) are supported by at least 2 independent secondary sources each. However, the evidence base is entirely secondary/tertiary. No official source has been directly inspected. The source independence analysis revealed that some previously assumed independent sources are actually from the same publisher (CDN Digital and Inquirer.net). S2 and S9 are duplicate entries for the same source (Suroy.ph). S4 and S15 are duplicate entries for the same source (OpenAlfa). No route can be marked as verified without official or field evidence. 03A has effectively only 1 independent secondary source and should not be added.
