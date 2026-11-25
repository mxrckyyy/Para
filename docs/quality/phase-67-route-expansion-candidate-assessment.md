# Phase 67 Route Expansion Candidate Assessment

## 1. Initial Git state

- Branch: main
- HEAD: 3f442345161b05da9998d5189833e6c9630aa5ee
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts)
- Dataset: 9 stops, 4 routes

## 2. Research methodology

Research relied on previously gathered documentary evidence from Phases 45, 63, and 64. Web search tools were unavailable during this phase (HTTP 403/402). All findings below are based on existing research already documented in the repository.

Primary sources attempted in prior phases:

- Cebu Daily News Digital (May 15, 2026) - accessible, reputable news
- Suroy.ph (updated October 24, 2026) - accessible, travel guide
- CommuteTour (updated January 2026) - accessible, transit guide
- OpenAlfa, Inquirer.net - accessible, secondary references
- LTFRB Region VII - not accessible (HTTP 403/transport errors in prior phases)
- Cebu City government - not accessible (HTTP 404 in prior phases)

## 3. Source inventory

| Source                                 | Type                      | Accessibility        | Route coverage                    |
| -------------------------------------- | ------------------------- | -------------------- | --------------------------------- |
| Cebu Daily News Digital (May 15, 2026) | Secondary (news)          | Accessible           | 04L, 01K, 17B, 13C endpoints      |
| Suroy.ph (Oct 24, 2026)                | Secondary (travel guide)  | Accessible           | 04L, 01K, 13C corridor            |
| CommuteTour (Jan 2026)                 | Secondary (transit guide) | Accessible           | 01K, 13C, 03A, 10H detailed stops |
| Inquirer.net                           | Secondary (news)          | Accessible           | 03A, 10H corridor                 |
| OpenAlfa                               | Secondary (transit ref)   | Accessible           | 13C corridor                      |
| LTFRB Region VII                       | Primary (regulatory)      | NOT accessible (403) | None verified                     |
| Cebu City government                   | Primary (official)        | NOT accessible (404) | None verified                     |

## 4. Individual candidate assessments

### Candidate A: 03A (Mabolo to Carbon Market)

- Route identity: PARTIALLY SUPPORTED (CommuteTour, Inquirer.net agree on code and endpoints)
- Endpoints: PARTIALLY SUPPORTED (Mabolo/Panagdait to Carbon Public Market)
- General corridor: PARTIALLY SUPPORTED (via F. Cabahug, Pope John Paul II Ave, M.J. Cuenco Ave, Imus Ave, V. Gullas St, Manalili St)
- Intermediate stops: NOT VERIFIED (15+ stops listed by CommuteTour but not confirmed as official stops)
- Complete stop sequence: NOT VERIFIED
- Direction: NOT VERIFIED
- Stop coordinates: NOT AVAILABLE (Mabolo/Panagdait not in dataset)
- Existing network connections: Carbon Market (existing stop)
- Official corroboration: NONE (no LTFRB or city document)
- Source independence: CommuteTour and Inquirer.net are independent but both secondary
- Conflicting evidence: None identified
- Classification: REQUIRES MORE EVIDENCE

### Candidate B: 06A (Guadalupe to Colon)

- Route identity: NOT VERIFIED (only mentioned in route code family lists, no dedicated documentation found)
- Endpoints: PARTIALLY SUPPORTED (Guadalupe to Colon, from route code family descriptions)
- General corridor: NOT VERIFIED
- Intermediate stops: NOT VERIFIED
- Complete stop sequence: NOT VERIFIED
- Direction: NOT VERIFIED
- Stop coordinates: NOT AVAILABLE (Guadalupe not in dataset)
- Existing network connections: Colon Street (existing stop)
- Official corroboration: NONE
- Source independence: Single source type (route code family lists)
- Conflicting evidence: None identified
- Classification: REQUIRES MORE EVIDENCE

### Candidate C: 12L (Labangon to Ayala)

- Route identity: NOT VERIFIED (only mentioned in route code family lists)
- Endpoints: PARTIALLY SUPPORTED (Labangon to Ayala Center Cebu, from route code family descriptions)
- General corridor: NOT VERIFIED
- Intermediate stops: NOT VERIFIED
- Complete stop sequence: NOT VERIFIED
- Direction: NOT VERIFIED
- Stop coordinates: NOT AVAILABLE (Labangon not in dataset)
- Existing network connections: Ayala Center Cebu (existing stop)
- Official corroboration: NONE
- Source independence: Single source type
- Conflicting evidence: None identified
- Classification: REQUIRES MORE EVIDENCE

### Existing route reassessment: 01K and 13C

- Both upgraded to partially_verified in Phase 65 (evidence-backed).
- 01K: Route identity and endpoints supported by CDN Digital + Suroy.ph + CommuteTour. LTFRB-7 confirms service existence (Libreng Sakay).
- 13C: Route identity and endpoints supported by CDN Digital + Suroy.ph + CommuteTour + OpenAlfa. LPTRP confirms route exists under modernization.
- Neither has verified stop sequence, direction, geometry, fare, or schedule.

## 5. Evidence matrix

| Candidate      | Route Identity      | Endpoints           | Corridor            | Intermediate Stops  | Sequence     | Direction    | Coordinates   | Network Connections            | Official Corroboration | Classification         |
| -------------- | ------------------- | ------------------- | ------------------- | ------------------- | ------------ | ------------ | ------------- | ------------------------------ | ---------------------- | ---------------------- |
| 03A            | Partially supported | Partially supported | Partially supported | Not verified        | Not verified | Not verified | Not available | Carbon Market (existing)       | None                   | Requires more evidence |
| 06A            | Not verified        | Partially supported | Not verified        | Not verified        | Not verified | Not verified | Not available | Colon Street (existing)        | None                   | Requires more evidence |
| 12L            | Not verified        | Partially supported | Not verified        | Not verified        | Not verified | Not verified | Not available | Ayala Center Cebu (existing)   | None                   | Requires more evidence |
| 01K (existing) | Supported           | Supported           | Supported           | Partially supported | Not verified | Not verified | Not available | SM City Cebu (shared with 04L) | Partial (LTFRB-7)      | Partially verified     |
| 13C (existing) | Supported           | Supported           | Supported           | Partially supported | Not verified | Not verified | Not available | None (isolated)                | Partial (LPTRP)        | Partially verified     |

## 6. Network coverage analysis

### Existing shared stops

- SM City Cebu: shared by 04L and 01K (1 transfer point)

### Isolated routes

- 17B (Apas-Carbon): no shared stops
- 13C (Talamban-Colon): no shared stops

### Candidate connections to existing stops

- 03A: connects to Carbon Market (existing stop for 17B) - would create transfer opportunity
- 10H: connects to SM City Cebu (existing stop) - would add south-to-north route
- 06A: connects to Colon Street (existing stop for 13C) - would create transfer opportunity
- 12L: connects to Ayala Center Cebu (existing stop for 04L) - would add Labangon connection

### Coverage gaps

- No routes connecting Carbon Market to downtown
- No routes connecting Colon Street to other downtown areas
- No routes to Mandaue, Lapu-Lapu, or Talisay
- No routes connecting north and south corridors
- 03A and 10H have the highest coverage value (connect to existing stops, improve connectivity)

### Potential connections

- 03A (Mabolo-Carbon) + 17B (Apas-Carbon): would share Carbon Market stop, creating a transfer opportunity
- 10H (Bulacao/Pardo-SM) + 04L/01K (SM): would share SM City Cebu, adding south-to-north route
- 06A (Guadalupe-Colon) + 13C (Talamban-Colon): would share Colon Street, creating transfer opportunity

## 7. Ranked recommendations

### Rank 1: 03A (Mabolo to Carbon Market)

- Evidence confidence: Medium (detailed secondary sources, no official corroboration)
- Official corroboration: None
- Data completeness: Medium (detailed stop sequence from CommuteTour, but not verified)
- Network benefit: High (connects to existing Carbon Market stop, would create transfer with 17B)
- Remaining blockers: Official source confirmation, coordinate verification for new stops
- Recommendation: REQUIRES MORE EVIDENCE

### Rank 2: 10H (Bulacao/Pardo to SM City Cebu)

- Evidence confidence: Medium (multiple secondary sources, conflicting intermediate paths)
- Official corroboration: None
- Data completeness: Medium (general path documented, exact sequence varies)
- Network benefit: High (connects to existing SM City Cebu stop, adds south-to-north route)
- Remaining blockers: Official source confirmation, 10H vs 10M variant ambiguity, coordinate verification
- Recommendation: REQUIRES MORE EVIDENCE

### Rank 3: 06A (Guadalupe to Colon)

- Evidence confidence: Low (only route code family mention)
- Official corroboration: None
- Data completeness: Low (no detailed documentation found)
- Network benefit: Medium (connects to existing Colon Street stop)
- Remaining blockers: All evidence missing
- Recommendation: DEFER

### Rank 4: 12L (Labangon to Ayala)

- Evidence confidence: Low (only route code family mention)
- Official corroboration: None
- Data completeness: Low
- Network benefit: Medium (connects to existing Ayala Center Cebu stop)
- Remaining blockers: All evidence missing
- Recommendation: DEFER

## 8. Unresolved evidence gaps

- No official LTFRB or Cebu City government route-level documentation found accessible online.
- LTFRB Region VII website not accessible (HTTP 403).
- Cebu City government website not accessible (HTTP 404).
- All available sources are secondary or tertiary.
- No coordinate verification for any new stops.
- No fare, schedule, geometry, or verified travel time for any route.
- 03A and 10H have the best secondary documentation but no official corroboration.

## 9. Recommended Phase 68 scope

Phase 68 should focus on:

1. Attempting to access official LTFRB or Cebu City LPTRP documents (may require different access methods).
2. If official sources are found, conduct evidence review for 03A (highest-value candidate).
3. If no official sources are found, document the limitation and consider whether secondary sources alone are sufficient for adding 03A with partially_verified status.

Do not add any routes in Phase 68 without official or independently corroborated evidence.

## 10. Validation

- validate:data: PASS (9 stops, 4 routes)
- lint: PASS
- format:check: PASS
- npm test: 56/56 passed
- No route data or application code modified.

## 11. Classification

INSUFFICIENT EVIDENCE FOR EXPANSION

While 03A and 10H are promising candidates with multiple secondary sources, no official or independently corroborated documentation exists for any new route. The existing 4 routes remain the only evidence-backed routes in the dataset. No new routes can be added without violating the project's evidence integrity rules.
