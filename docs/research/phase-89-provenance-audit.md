# Phase 89 Provenance Audit Report

## Initial Git state

- Branch: main
- HEAD: 3f442345161b05da9998d5189833e6c9630aa5ee
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts)
- origin/main: 3f442345161b05da9998d5189833e6c9630aa5ee (match)

## Source inventory

15 sources identified (S1-S15). See docs/research/source-inventory.md for full details.

Key findings:

- 6 secondary sources (CDN Digital, Suroy.ph, CommuteTour, Inquirer.net, OpenAlfa, SunStar)
- 3 tertiary sources (Reddit, Weebly, OSM/Photon)
- 2 official references (LTFRB-7 Show Cause Orders, LPTRP via SunStar) - not directly inspected
- 1 official document (Cebu City Ordinance No. 2000) - cited but not directly inspected
- 1 official organization (CCTO) - cited but not directly inspected

## Source dependency findings

### Confirmed dependencies

- S1 (CDN Digital) depends on S13 (Ordinance 2000) and S14 (CCTO) - cited as sources.
- S7 (Inquirer.net) is owned by the same publisher as S1 (CDN Digital) - NOT independent.
- S9 (Suroy.ph) is a single source, not multiple independent sources.
- S10 (SunStar) depends on S6 (LPTRP) - reports on the planning document.

### Likely dependencies

- S2 (Suroy.ph) may use CDN Digital as a reference for route codes.
- S12 (Weebly) may copy from CommuteTour or similar guides.
- S4/S15 (OpenAlfa) may derive from CommuteTour.

### Independent sources

- S3 (CommuteTour): appears independent.
- S5 (LTFRB-7): official regulatory source, independent.
- S6 (LPTRP): official planning document, independent.
- S8 (OSM/Photon): independent geocoding service.

### Critical finding: S1 and S7 are NOT independent

Cebu Daily News Digital and Inquirer.net are owned by the same publisher (Inquirer Publications). They should not be counted as independent corroboration.

### Critical finding: Suroy.ph appears once

Suroy.ph is cited as a single source. The 2026 guide and any earlier references are the same publication.

## Route-level evidence findings

- 04L: Route identity, endpoints, and corridor supported by S1 and S2 (2 independent secondary sources). PARTIALLY VERIFIED is justified.
- 01K: Route identity, endpoints, and corridor supported by S1 and S3 (2 independent secondary sources) + S5 (official for service existence). PARTIALLY VERIFIED is justified.
- 13C: Route identity, endpoints, and corridor supported by S1 and S3 (2 independent secondary sources) + S6 (official for route existence). PARTIALLY VERIFIED is justified.
- 17B: Only route identity and endpoints supported by S1 (1 secondary source). UNVERIFIED is appropriate.
- 03A: Route identity and endpoints partially supported by S3 and S7 (but S7 is same publisher as S1, so effectively 1 independent secondary source). NOT sufficient for PARTIALLY VERIFIED.
- 10H: Route identity and endpoints partially supported by S2, S3, S7 (but S7 same publisher as S1). Conflicting intermediate paths. NOT sufficient.
- 06A: Only mentioned in route code family lists. NOT sufficient.
- 12L: Only mentioned in route code family lists. NOT sufficient.

## Official-source inspection status

All official sources (LTFRB-7, LPTRP, Ordinance 2000, CCTO) are UNINSPECTED:

- LTFRB-7 website: HTTP 403
- Cebu City government: HTTP 404
- CCTO: not accessible
- No alternative access methods successful

## Issues categorized by severity

### Critical: None

### High: None

### Medium: None

### Low: None

### Informational:

- S1 and S7 (CDN Digital and Inquirer.net) are same publisher. Route 03A's evidence relies partly on S7, which is not independent of S1.
- Suroy.ph is a single source, not multiple independent sources.
- 03A has effectively only 1 independent secondary source (CommuteTour), not 2 as previously assessed.
- OpenAlfa may derive from CommuteTour (possible dependency).

## Recommended corrections

None required for route data. The verification statuses are consistent with the evidence. However, the evidence assessment for 03A should be updated to reflect that it has effectively only 1 independent secondary source (not 2).

## Records request status

All four requests remain NOT SUBMITTED. No requests have been submitted.

## Dataset and application integrity

- 9 stops, 4 routes. Unchanged.
- No route data or application code modified.
- Route engine not modified.

## Validation results

- validate:data: PASS (9 stops, 4 routes)
- lint: PASS
- format:check: PASS
- npm test: 86/86 passed
- npm audit: 0 vulnerabilities (from prior phase)

## Final Git state

- Branch: main
- HEAD: 3f442345161b05da9998d5189833e6c9630aa5ee
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts + phase-89 docs + source inventory + dependency matrix + claim evidence matrix)
- No commit, push, or deploy.

## Remaining evidence gaps

- No official LTFRB or city government route-level documentation found accessible.
- Complete stop sequences remain unverified for all routes.
- No geometry, fares, schedules, or verified travel times for any route.
- 03A has effectively only 1 independent secondary source.
- No field verification conducted for any route.

## Recommended Phase 90

Phase 90 should:

1. If official documents become accessible, conduct evidence review for 03A.
2. If no official sources are found, consider whether secondary sources alone justify adding 03A with partially_verified status.
3. Do not add any routes without official or independently corroborated evidence.
4. Continue documenting the evidence gap.

## Classification

PARTIALLY VERIFIED

The existing verification statuses (04L, 01K, 13C as partially_verified) are supported by at least 2 independent secondary sources each. However, the evidence base is entirely secondary/tertiary. No official source has been directly inspected. The source independence analysis revealed that some previously assumed independent sources are actually from the same publisher (CDN Digital and Inquirer.net). No route can be marked as verified without official or field evidence. 03A has effectively only 1 independent secondary source and should not be added.
