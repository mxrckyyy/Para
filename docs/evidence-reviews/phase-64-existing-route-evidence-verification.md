# Phase 64 Existing Route Evidence Verification & Status Assessment

## 1. Initial Git state

- Branch: main
- HEAD: 3f442345161b05da9998d5189833e6c9630aa5ee
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts)
- Dataset: 9 stops, 4 routes

## 2. Verification criteria

Based on the existing verification model (docs/route-data-verification.md):

| Status             | Meaning                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------- |
| unverified         | Discovered from a source or created for development, but not independently checked.     |
| partially_verified | Some fields are supported by a credible source, but important details remain unchecked. |
| verified           | Independently checked against an identifiable source and field evidence.                |
| outdated           | Previously verified but no longer known to be current.                                  |

A record may be partially_verified only when supporting evidence is documented in source, evidenceReference, or notes.

Claims assessed separately:

- Route identity (code exists and is documented)
- Endpoints (origin and destination supported)
- Corridor (general path supported)
- Intermediate stops (specific stops documented)
- Stop sequence (ordering documented)
- Direction (one-way vs loop)
- Geometry (verified coordinate path)
- Fare, schedule, travel time
- Current service status

## 3. Route 01K evidence assessment

Route: route-01k-swu-sm-north-bus-terminal (01K - Sambag II (SWU) to SM and North Bus Terminal)

### Sources

1. Suroy.ph (Cebu City Jeepney Guide 2026, updated October 24, 2026)
   - Type: Secondary (travel magazine)
   - Supports: Route code 01K, endpoints (Sambag/SWU to SM and North Bus Terminal), general corridor
   - Does not support: Complete stop sequence, geometry, fare, schedule, travel time, direction

2. Cebu Daily News Digital (May 15, 2026 guide)
   - Type: Secondary (news organization)
   - Supports: Route code 01K, general corridor
   - Does not support: Complete stop sequence, geometry, fare, schedule

3. CommuteTour (updated January 2026)
   - Type: Secondary (transit guide)
   - Supports: Route existence, detailed stop sequence (17+ intermediate stops listed)
   - Does not support: Official verification, geometry, fare, schedule

4. LTFRB Region VII (Show Cause Orders, 2025-2026)
   - Type: Official (regulatory)
   - Supports: Route 01K exists as a Libreng Sakay service; authorized loading/unloading stops for the free ride program; operators (JP and Sons, Aleja Fua)
   - Does not support: Complete route sequence beyond free-ride stops; general (non-free) service details; fare, schedule, geometry

### Claim-by-claim assessment

- Route identity: SUPPORTED (multiple sources agree on code 01K)
- Endpoints: SUPPORTED (SWU/Sambag II to SM City Cebu and North Bus Terminal)
- Corridor: SUPPORTED (via N. Bacalso, downtown, M.J. Cuenco)
- Intermediate stops: PARTIALLY SUPPORTED (CommuteTour lists 17+ stops; LTFRB lists authorized free-ride stops; not independently verified)
- Stop sequence: NOT VERIFIED (secondary sources list stops but sequence not confirmed by official source)
- Direction: NOT VERIFIED (sources describe both directions but not confirmed as bidirectional service)
- Geometry: NOT AVAILABLE
- Fare: NOT AVAILABLE (free ride program exists but regular fare not documented)
- Schedule: NOT AVAILABLE
- Travel time: ESTIMATED (straight-line heuristic)
- Current service status: PARTIALLY SUPPORTED (LTFRB compliance actions confirm service exists; free-ride program active)

### Source independence assessment

- Suroy.ph, Cebu Daily News Digital, and CommuteTour are independent publishers but all are secondary sources.
- LTFRB-7 is an official source but only for the Libreng Sakay program, not the general route.
- No single source independently confirms the complete stop sequence.

### Decision for 01K

RECOMMEND PARTIALLY VERIFIED: Route identity and endpoints are supported by multiple independent secondary sources. Intermediate stops are documented by CommuteTour but not independently verified. LTFRB-7 confirms service existence (via compliance actions) but only for the free-ride program. The current unverified status is conservative; upgrading to partially_verified would be justified if the project accepts secondary source documentation for route identity and endpoints, consistent with how 04L was classified.

However, the evidence does not support verified status. Complete stop sequence, direction, geometry, fare, and schedule remain unverified.

## 4. Route 13C evidence assessment

Route: route-13c-talamban-colon (13C - Talamban to Colon via Echavez and Sikatuna)

### Sources

1. Suroy.ph (Cebu City Jeepney Guide 2026)
   - Type: Secondary (travel magazine)
   - Supports: Route code 13C, endpoints (Talamban to Colon), general corridor
   - Does not support: Complete stop sequence, geometry, fare, schedule

2. Cebu Daily News Digital (May 15, 2026 guide)
   - Type: Secondary (news organization)
   - Supports: Route code 13C, general corridor
   - Does not support: Complete stop sequence, geometry, fare, schedule

3. CommuteTour (updated January 2026)
   - Type: Secondary (transit guide)
   - Supports: Route existence, detailed stop sequence (17+ intermediate stops listed)
   - Does not support: Official verification, geometry, fare, schedule

4. OpenAlfa (transit reference)
   - Type: Secondary
   - Supports: Route existence and general path
   - Does not support: Verified stop sequence, geometry, fare, schedule

5. Reddit (user discussions)
   - Type: Tertiary
   - Supports: Route existence and commuter usage patterns
   - Does not support: Any verified claim

6. LTFRB / Cebu City LPTRP
   - Type: Official (regulatory)
   - Supports: Route 13C exists as a traditional/developmental route under LPTRP; subject to modernization compliance
   - Does not support: Specific stop sequence, geometry, fare, schedule, direction

### Claim-by-claim assessment

- Route identity: SUPPORTED (multiple sources agree on code 13C)
- Endpoints: SUPPORTED (Talamban to Colon via Banilad, Ayala, Echavez, Sikatuna)
- Corridor: SUPPORTED (via Gov. M. Cuenco Ave, Ayala Center Cebu, Echavez, Sikatuna)
- Intermediate stops: PARTIALLY SUPPORTED (CommuteTour lists 17+ stops; not independently verified)
- Stop sequence: NOT VERIFIED (secondary sources list stops but sequence not confirmed by official source)
- Direction: NOT VERIFIED (sources describe both directions but not confirmed as bidirectional)
- Geometry: NOT AVAILABLE
- Fare: NOT AVAILABLE
- Schedule: NOT AVAILABLE
- Travel time: ESTIMATED (straight-line heuristic)
- Current service status: PARTIALLY SUPPORTED (LPTRP confirms route exists; modernization compliance ongoing)

### Source independence assessment

- Suroy.ph, Cebu Daily News Digital, CommuteTour, OpenAlfa are independent publishers but all secondary.
- LTFRB/LP is official but only confirms route existence under modernization, not stop-level details.
- No single source independently confirms the complete stop sequence.

### Decision for 13C

RECOMMEND PARTIALLY VERIFIED: Route identity and endpoints are supported by multiple independent secondary sources. Intermediate stops are documented by CommuteTour but not independently verified. LPTRP confirms route exists under modernization compliance. The current unverified status is conservative; upgrading to partially_verified would be consistent with how 04L was classified.

However, the evidence does not support verified status. Complete stop sequence, direction, geometry, fare, and schedule remain unverified.

## 5. Route 03A candidate assessment

Route: 03A (Mabolo/Panagdait to Carbon Market) - NOT in current dataset

### Sources

1. CommuteTour (transit guide)
   - Type: Secondary
   - Supports: Route existence, detailed stop sequence (15+ intermediate stops with landmarks)
   - Does not support: Official verification, geometry, fare, schedule

2. Inquirer.net (community/commuter guide)
   - Type: Secondary (news organization)
   - Supports: Route existence and general corridor
   - Does not support: Verified stop sequence, coordinates, geometry, fare, schedule

3. Weebly (personal blog)
   - Type: Tertiary
   - Supports: Route existence and detailed path
   - Does not support: Any verified claim

### Claim-by-claim assessment

- Route identity: PARTIALLY SUPPORTED (secondary sources agree on code 03A and endpoints)
- Endpoints: PARTIALLY SUPPORTED (Mabolo/Panagdait to Carbon Market)
- Intermediate stops: NOT VERIFIED (detailed but from secondary/tertiary sources)
- Stop sequence: NOT VERIFIED
- Direction: NOT VERIFIED (sources describe both directions)
- Geometry: NOT AVAILABLE
- Fare: NOT AVAILABLE
- Schedule: NOT AVAILABLE
- Travel time: NOT AVAILABLE

### Classification

Promising but incomplete: Multiple secondary sources provide detailed stop sequences, but no official corroboration exists. The route connects to Carbon Market (existing stop) which would improve network connectivity. Requires coordinate verification for new stops (Mabolo/Panagdait) and official source confirmation before adding to dataset.

## 6. Source inventory

### Primary sources

- None found accessible online for route-level documentation.

### Secondary sources

- Suroy.ph (travel magazine) - Cebu City Jeepney Guide 2026
- Cebu Daily News Digital (news) - May 15, 2026 route guide
- CommuteTour (transit guide) - updated January 2026
- Inquirer.net (news) - community/commuter guides
- OpenAlfa (transit reference)
- SunStar Cebu (news) - LPTRP coverage

### Tertiary sources

- Reddit (user discussions)
- Weebly (personal blogs)
- OpenStreetMap/Photon (coordinate approximation)

### Source independence

- Suroy.ph, CDN Digital, CommuteTour, Inquirer.net, and OpenAlfa are independent publishers.
- However, all are secondary sources citing the same general route information.
- No independent official source corroborates any route's complete stop sequence.

### Conflicts

- 04L: Sources agree on corridor (JY Square to SM via Ayala). No conflicts.
- 01K: Sources agree on endpoints (SWU to SM/NBT). Intermediate stops vary slightly between sources.
- 13C: Sources agree on endpoints (Talamban to Colon). Intermediate paths vary (Echavez vs Sikatuna).
- 10H: Sources conflict on intermediate path (T. Padilla vs P. del Rosario). 10H vs 10M variant ambiguity.

## 7. Network implications

### Supported connectivity findings

- 01K connects SWU/Sambag to SM City Cebu and North Bus Terminal (shares SM with 04L).
- 13C connects Talamban to Colon Street (isolated in current dataset).
- Upgrading 01K and 13C to partially_verified would not change network topology but would improve transparency.

### Potential benefits

- 01K upgrade: Improves confidence in the only transfer point (SM City Cebu) shared with 04L.
- 13C upgrade: Documents a north-to-downtown corridor, even though it remains isolated in Para's dataset.
- 03A addition (if verified): Would connect Carbon Market to Mabolo, potentially enabling transfers with 17B (Apas-Carbon).

### Dataset limitations

- Even with upgrades, the network remains small (4 routes, 9 stops).
- Transfer opportunities remain limited (1 shared stop).
- No route connects isolated stops (Carbon Market, Colon Street) to the main network.

## 8. Recommended route status decisions

### 04L: Keep partially_verified

- Already classified correctly. No change needed.

### 01K: Recommend upgrade to partially_verified

- Route identity and endpoints supported by multiple independent secondary sources.
- LTFRB-7 confirms service existence (via compliance actions for Libreng Sakay).
- Intermediate stops documented by CommuteTour but not independently verified.
- Complete stop sequence, direction, geometry, fare, schedule remain unverified.
- Rationale: Consistent with 04L's classification (secondary sources support identity and endpoints).

### 13C: Recommend upgrade to partially_verified

- Route identity and endpoints supported by multiple independent secondary sources.
- LPTRP confirms route exists under modernization compliance.
- Intermediate stops documented by CommuteTour but not independently verified.
- Complete stop sequence, direction, geometry, fare, schedule remain unverified.
- Rationale: Consistent with 04L's classification.

### 17B: Keep unverified

- Only 2 stops, no sourceOrganization or verificationStatus.
- Limited secondary documentation.
- No evidence of current service status.

### 03A: Keep as candidate (not in dataset)

- Promising but requires official corroboration.
- Detailed stop sequence from secondary sources.
- Connects to existing Carbon Market stop.

### 10H: Keep deferred

- Conflicting intermediate paths.
- 10H vs 10M variant ambiguity.
- No official documentation.

## 9. Remaining documentary research gaps

- No official LTFRB or Cebu City government document listing specific route codes with stop sequences found accessible online.
- LTFRB Region VII website may have route-specific notices but were not accessible (HTTP 403 or transport errors in previous phases).
- Suroy.ph and CommuteTour provide the most detailed stop sequences but are secondary sources.
- No field verification has been conducted for any route.

## 10. Recommended next implementation phase

Phase A (from V1.1 roadmap): Upgrade 01K and 13C to partially_verified.

- Add sourceOrganization, evidenceReference, verificationStatus, verificationDate, reviewedBy to 01K and 13C records.
- Document secondary sources and their limitations.
- Do not add new stops or change stop sequences.
- Acceptance: validate:data passes; records have provenance; verified remains false.

## 11. Classification

PARTIAL EVIDENCE - ROUTE STATUSES SHOULD REMAIN UNCHANGED

While the evidence supports upgrading 01K and 13C to partially_verified (consistent with 04L's classification), this phase is research-only and does not modify data. The recommendation is documented for a future implementation phase. No official source has been found for any route's complete stop sequence.

## 12. Boundaries

This is a research and documentation phase only. No route data, application code, route statuses, or deployment settings were modified. No commit, push, or deploy was performed.
