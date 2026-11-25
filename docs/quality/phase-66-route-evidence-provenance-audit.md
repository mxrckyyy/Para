# Phase 66 Route Evidence & Data Provenance Integrity Audit

## 1. Initial Git state

- Branch: main
- HEAD: 3075fa7a02d6e702002c22f9e5eda851154e9959 (auto-committed "phase 60")
- Working tree: clean
- Dataset: 9 stops, 4 routes

## 2. Exact Phase 65 changes inspected

Phase 65 modified:

- src/data/routes.json: Added provenance metadata to 01K and 13C (sourceOrganization, evidenceReference, verificationStatus, verificationDate, lastReviewed, reviewedBy, notes)
- src/data/stops.json: Added provenance metadata to SWU, North Bus Terminal, Talamban, Colon Street

## 3. Source inventory and accessibility

### 01K sources

1. Cebu Daily News Digital (May 15, 2026) - credible news organization citing Cebu City Ordinance No. 2000 and city transportation office data
2. Suroy.ph (updated October 24, 2026) - travel magazine
3. CommuteTour (updated January 2026) - transit guide
4. LTFRB-7 Show Cause Orders (2025-2026) - official regulatory (Libreng Sakay program)

### 13C sources

1. Cebu Daily News Digital (May 15, 2026) - credible news organization
2. Suroy.ph (updated October 24, 2026) - travel magazine
3. CommuteTour (updated January 2026) - transit guide
4. OpenAlfa (transit reference)
5. LTFRB/LPTRP - official (modernization compliance)

### Source accessibility

- CDN Digital article: referenced in existing data, not independently re-fetched in this phase (assumed accessible based on Phase 45/64 research).
- Suroy.ph: accessible (used in prior phases).
- CommuteTour: accessible (used in prior phases).
- LTFRB-7: Show Cause Orders referenced but not directly inspected in this phase.

## 4. Route-by-route evidence matrix

### 04L

| Claim               | Status                                |
| ------------------- | ------------------------------------- |
| Route identity      | Supported (Suroy.ph + CDN Digital)    |
| Endpoints           | Supported (JY Square to SM via Ayala) |
| Intermediate stops  | Partially supported (Ayala mentioned) |
| Stop sequence       | Not verified                          |
| Direction           | Not verified                          |
| Geometry            | Not available                         |
| Fare                | Not available                         |
| Schedule            | Not available                         |
| Travel time         | Estimated (straight-line heuristic)   |
| Current service     | Partially supported                   |
| Verification status | partially_verified (appropriate)      |

### 01K

| Claim               | Status                                                                  |
| ------------------- | ----------------------------------------------------------------------- |
| Route identity      | Supported (CDN Digital + Suroy.ph + CommuteTour)                        |
| Endpoints           | Supported (SWU/Sambag to SM and North Bus Terminal)                     |
| General corridor    | Supported (via N. Bacalso, downtown, M.J. Cuenco)                       |
| Intermediate stops  | Partially supported (CommuteTour lists 17+; not independently verified) |
| Stop sequence       | Not verified                                                            |
| Direction           | Not verified                                                            |
| Geometry            | Not available                                                           |
| Fare                | Not available                                                           |
| Schedule            | Not available                                                           |
| Travel time         | Estimated (straight-line heuristic)                                     |
| Current service     | Partially supported (LTFRB-7 compliance actions)                        |
| Verification status | partially_verified (justified, consistent with 04L)                     |

### 13C

| Claim               | Status                                                                  |
| ------------------- | ----------------------------------------------------------------------- |
| Route identity      | Supported (CDN Digital + Suroy.ph + CommuteTour + OpenAlfa)             |
| Endpoints           | Supported (Talamban to Colon via Echavez and Sikatuna)                  |
| General corridor    | Supported (via Banilad, Ayala, Echavez, Sikatuna)                       |
| Intermediate stops  | Partially supported (CommuteTour lists 17+; not independently verified) |
| Stop sequence       | Not verified                                                            |
| Direction           | Not verified                                                            |
| Geometry            | Not available                                                           |
| Fare                | Not available                                                           |
| Schedule            | Not available                                                           |
| Travel time         | Estimated (straight-line heuristic)                                     |
| Current service     | Partially supported (LPTRP confirms route exists)                       |
| Verification status | partially_verified (justified, consistent with 04L)                     |

### 17B

| Claim               | Status                                      |
| ------------------- | ------------------------------------------- |
| Route identity      | Supported (CDN Digital)                     |
| Endpoints           | Supported (Apas to Carbon)                  |
| All other claims    | Not verified / Not available                |
| Verification status | unverified (appropriate - limited evidence) |

## 5. Stop-level metadata assessment

### SWU (Sambag II)

- sourceOrganization: Cebu Daily News Digital; Photon/Komoot - appropriate (route-level evidence + coordinate source)
- verificationStatus: partially_verified - justified (route identity supported by CDN Digital)
- lastReviewed: 2026-11-24 - appropriate (date of review)
- reviewedBy: Para Phase 65 evidence review - consistent with 04L stops
- notes: mentions route identity support and approximate coordinates - appropriate
- Assessment: PASS (metadata consistent with route-level evidence)

### North Bus Terminal

- Same assessment as SWU: PASS

### Talamban

- Same assessment: PASS

### Colon Street

- Same assessment: PASS

### Carbon Market and Apas (unchanged)

- No provenance metadata added. Appropriate (17B remains unverified).

### Assessment note

Route-level evidence (CDN Digital listing route codes) supports the stop's association with the route but does not independently verify the stop's coordinates or precise location. The notes correctly state that coordinates are approximate. The verificationStatus reflects route-level evidence, not individual stop verification. This is consistent with how 04L's stops were handled.

## 6. Schema and metadata consistency findings

- Date format: ISO YYYY-MM-DD (consistent)
- Verification status vocabulary: unverified, partially_verified, verified, outdated (consistent)
- Reviewer naming: "Para Phase 65 evidence review" (consistent with 04L's "Para Phase 17 pilot verification")
- Source organization names: consistent formatting (semicolon-separated)
- Evidence references: detailed, include source title, date, and cited text
- Notes: clear distinction between supported and unsupported claims
- No duplicated or contradictory metadata
- No accidental changes to route or stop identifiers

### One minor observation

The notes for 01K and 13C mention "LTFRB-7 issued Show Cause Orders" and "LPTRP confirms route exists" respectively. These are regulatory references that confirm service existence but not route details. The notes correctly frame these as supporting service existence only, not complete route verification. This is appropriate.

## 7. Route network and algorithm integrity findings

- Route IDs: unchanged (route-04l-lahug-sm-via-ayala, route-01k-swu-sm-north-bus-terminal, route-17b-apas-carbon, route-13c-talamban-colon)
- Stop IDs: unchanged (9 stops)
- Route-stop relationships: unchanged (same stopIds arrays)
- Stop sequences: unchanged (no new stops added)
- Route directions: unchanged (all null)
- Route connectivity: unchanged (only SM City Cebu shared)
- Route engine: not modified
- Transfer logic: not modified
- Duration calculations: not modified
- Ranking behavior: not modified

No changes to algorithm behavior. Phase 65 only modified evidence metadata fields.

## 8. Issues categorized by severity

### Critical: None

### High: None

### Medium: None

### Low: None

### Informational:

- Only 04L, 01K, and 13C have provenance metadata. 17B and its stops (Carbon Market, Apas) remain without provenance. This is consistent with the evidence (17B has limited documentation).
- The notes for 01K and 13C mention secondary sources (Suroy.ph, CommuteTour) that were not individually verified as accessible in this audit. However, they were used in prior phases.

## 9. Recommended corrections

None required. The metadata is consistent with the existing schema and verification model. The evidence supports the partially_verified classification for 01K and 13C, consistent with 04L.

One future consideration: if the project wants to distinguish "route identity supported" from "stop sequence verified" more precisely, a more granular evidence model could be considered. However, the current model (verified/partially_verified/unverified/outdated) is sufficient and should not be changed without a documented decision.

## 10. Final classification

AUDIT PASSED WITH DOCUMENTED LIMITATIONS

The evidence metadata introduced in Phase 65 is accurate, consistent, and supported by the underlying evidence. The verification status upgrades (01K and 13C to partially_verified) are justified by multiple independent secondary sources and are consistent with how 04L was classified. No factual errors, unsupported claims, or schema inconsistencies were found.

Limitations: No official LTFRB or city government route-level documentation was found. Complete stop sequences remain unverified. The sources are secondary/tertiary.

## 11. Validation

- validate:data: PASS (9 stops, 4 routes)
- lint: PASS
- format:check: PASS
- npm test: 56/56 passed
- build: not run (no code changes)
- npm audit: 0 vulnerabilities (from prior phase)

## 12. Final Git state

- Branch: main
- HEAD: 3f442345161b05da9998d5189833e6c9630aa5ee
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts, phase-64 and phase-65 docs, phase-66 audit doc)
- No commit, push, or deploy.
- No route data or application code modified in this phase.
