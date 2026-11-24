# Phase 63 Route Coverage Expansion & Data Intelligence Audit

## 1. Initial Git state

- Branch: main
- HEAD: 3f442345161b05da9998d5189833e6c9630aa5ee
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts)
- Dataset: 9 stops, 4 routes

## 2. Existing network baseline

### Stops (9)

1. stop-jy-square-lahug - JY Square (Lahug)
2. stop-ayala-center-cebu - Ayala Center Cebu
3. stop-sm-city-cebu - SM City Cebu
4. stop-swu-sambag - SWU (Sambag II)
5. stop-north-bus-terminal - North Bus Terminal
6. stop-carbon-market-cebu - Carbon Market
7. stop-apas-cebu - Apas
8. stop-talamban-cebu - Talamban
9. stop-colon-street-cebu - Colon Street

### Routes (4)

1. 04L: JY Square (Lahug) -> Ayala Center Cebu -> SM City Cebu (partially_verified)
2. 01K: SWU (Sambag II) -> SM City Cebu -> North Bus Terminal (unverified)
3. 17B: Apas -> Carbon Market (unverified)
4. 13C: Talamban -> Colon Street (unverified)

### Transfer opportunities

- Only SM City Cebu is shared between routes (04L and 01K).
- 17B and 13C are isolated (no shared stops).
- Network has 1 transfer point, limiting one-transfer journey options.

### Coverage limitations

- Only 4 route corridors represented.
- No routes connecting Carbon Market to other areas (except 17B from Apas).
- No routes connecting Talamban/Colon to other areas (except 13C).
- No routes to Mandaue, Lapu-Lapu, or Talisay.
- Stop sequences are simplified (2-3 stops per route vs. 10-17 actual stops).
- No geometry, fares, or schedules for any route.

## 3. Geographic coverage assessment

### Areas represented

- Lahug (JY Square, Ayala, SM) - 04L
- Sambag/SWU (SWU to SM/NBT) - 01K
- Apas (Apas to Carbon) - 17B
- Talamban (Talamban to Colon) - 13C

### Areas not represented

- Mabolo, Guadalupe, Banawa, Basak, Pardo, Bulacao, Labangon, Tisa, Inayawan
- Mandaue City, Lapu-Lapu City, Talisay City
- Major hospitals, universities (except SWU, USC Talamban)
- Cebu South Bus Terminal, Pier areas

### Connectivity gaps

- Carbon Market only connects to Apas (17B). No connection to downtown or other areas.
- Colon Street only connects to Talamban (13C). No connection to other downtown areas.
- No route connects the north and south corridors.
- The 01K and 04L share SM City Cebu, creating one transfer point.

## 4. Documentary research findings

### Sources examined

1. Suroy.ph - Cebu City Jeepney Guide 2026 (secondary, travel magazine)
2. Cebu Daily News Digital - May 15, 2026 (secondary, news)
3. CommuteTour - updated January 2026 (secondary, transit guide)
4. Inquirer.net - community/commuter guides (secondary)
5. Reddit - user discussions (tertiary)
6. OpenAlfa, Weebly, RedDoorz - tertiary references
7. SunStar Cebu - LPTRP coverage (secondary, news)
8. Cebu City government / LTFRB - no directly accessible route-level documents found

### Key findings from research

- Cebu has approximately 40+ traditional jeepney route codes organized by number families (01-62).
- Route 04L: "Lahug (JY Square) to SM via Ayala Center Cebu" - partially verified (Suroy.ph + CDN Digital).
- Route 01K: "Sambag/SWU to SM and North Bus Terminal" - unverified. Detailed stop sequences available from secondary sources (weebly, inquirer, commutetour) but not official.
- Route 13C: "Talamban to Colon via Echavez and Sikatuna" - unverified. Detailed stop sequences available from secondary sources.
- Route 17B: "Apas to Carbon via Escario and Osmeña Boulevard" - unverified. Limited secondary documentation.
- Route 10H: "Bulacao/Pardo to SM City Cebu" - investigated in Phase 45, rejected/deferred (secondary sources only).
- Route 03A: "Mabolo (Panagdait) to Carbon Market" - detailed secondary documentation available (weebly, inquirer).
- Route 06A: "Guadalupe to Colon" - mentioned in route code families.
- Route 12L: "Labangon to Ayala" - mentioned in route code families.

### Evidence quality assessment

No official LTFRB or Cebu City government document listing specific route codes with stop sequences was found accessible online. All available sources are secondary (travel guides, news articles, community posts) or tertiary (user discussions, blogs).

## 5. Candidate routes and evidence

### Candidate 1: 03A (Mabolo to Carbon Market)

- Evidence: Secondary (weebly, inquirer). Detailed stop sequence available (15+ intermediate stops).
- Endpoints: Mabolo (Panagdait) to Carbon Public Market.
- Connects to: Carbon Market (existing stop).
- New stops needed: Mabolo/Panagdait, plus ~15 intermediate stops.
- Coverage value: HIGH (connects Mabolo to Carbon, improving north-central connectivity).
- Evidence quality: MEDIUM (detailed but secondary).
- Classification: Promising but incomplete (detailed stop sequence from secondary sources; no official corroboration).

### Candidate 2: 06A (Guadalupe to Colon)

- Evidence: Route code family mention only. No detailed stop sequence found.
- Endpoints: Guadalupe to Colon.
- Connects to: Colon Street (existing stop).
- Coverage value: MEDIUM (connects Guadalupe to downtown).
- Evidence quality: LOW (no detailed documentation found).
- Classification: Research required.

### Candidate 3: 10H (Bulacao/Pardo to SM City Cebu)

- Evidence: Secondary (Suroy.ph, Inquirer.net, CommuteTour, Reddit).
- Endpoints: Bulacao/Pardo to SM City Cebu.
- Connects to: SM City Cebu (existing stop).
- Coverage value: HIGH (connects southern areas to SM).
- Evidence quality: MEDIUM (multiple secondary sources, but conflicting intermediate paths).
- Classification: Promising but incomplete (investigated in Phase 45, deferred).

### Candidate 4: 12L (Labangon to Ayala)

- Evidence: Route code family mention only.
- Endpoints: Labangon to Ayala Center Cebu.
- Connects to: Ayala Center Cebu (existing stop).
- Coverage value: MEDIUM (connects Labangon to Ayala).
- Evidence quality: LOW (no detailed documentation found).
- Classification: Research required.

### Candidate 5: 01K (already in dataset, needs verification)

- Evidence: Secondary (weebly, inquirer, commutetour) with detailed stop sequence.
- Current Para data: 3 stops (SWU, SM, North Bus Terminal) vs actual 17+ stops.
- Verification status: unverified.
- Recommendation: Could be upgraded to partially_verified with existing evidence, but stop sequence simplification should be documented.

### Candidate 6: 13C (already in dataset, needs verification)

- Evidence: Secondary (weebly, suroy.ph, commutetour, openalfa, reddit) with detailed stop sequence.
- Current Para data: 2 stops (Talamban, Colon) vs actual 17+ stops.
- Verification status: unverified.
- Recommendation: Could be upgraded to partially_verified with existing evidence.

## 6. Candidate scoring/classification

| Candidate | Evidence Quality | Route Identity | Endpoint Confidence | Sequence Confidence | Coverage Value | Transfer Value | Classification |
|---|---|---|---|---|---|---|
| 04L (existing) | Medium | High | High | Low | Medium | Medium (SM shared) | Partially verified |
| 01K (existing) | Medium | High | High | Low (Para simplified) | Medium | High (SM shared) | Unverified -> could upgrade |
| 13C (existing) | Medium | High | High | Low (Para simplified) | Medium | Low (isolated) | Unverified -> could upgrade |
| 17B (existing) | Low | High | Medium | Low | Low | Low (isolated) | Unverified |
| 03A (new) | Medium | High | High | Medium | High | Medium (Carbon shared) | Promising but incomplete |
| 10H (new) | Medium | High | High | Low | High | High (SM shared) | Promising but incomplete |
| 06A (new) | Low | Medium | Medium | Low | Medium | Low | Research required |
| 12L (new) | Low | Medium | Medium | Low | Medium | Medium (Ayala shared) | Research required |

## 7. Route 04L reassessment

- Previous evidence (Suroy.ph, Cebu Daily News Digital) still the best available.
- No new official sources found in this research cycle.
- The detailed stop sequence from secondary sources (04L via Ayala, passing IT Park, etc.) is more detailed than Para's 3-stop simplification but not independently verified.
- Recommendation: Maintain partially_verified status. Consider documenting the secondary-source stop sequence as a note (not as verified data).

## 8. Connectivity and transfer analysis

### Network graph (current)

```
04L: JY Square -- Ayala -- SM
01K: SWU -- SM -- North Bus Terminal
17B: Apas -- Carbon
13C: Talamban -- Colon
```

### Transfer points

- SM City Cebu: 04L + 01K (1 transfer point)
- No other shared stops.

### Isolated routes

- 17B (Apas-Carbon): no shared stops with any other route.
- 13C (Talamban-Colon): no shared stops with any other route.

### Improvement opportunities

- Adding a route connecting Carbon Market to downtown would unlock transfers from 17B.
- Adding a route connecting Colon Street to other downtown areas would unlock transfers from 13C.
- Adding a route connecting Mandaue to Cebu City would expand coverage to a new area.

### Network metrics limitations

- With only 4 routes and 9 stops, network metrics are not statistically meaningful.
- Transfer count (1) is too small for useful analysis.
- Coverage is limited to 4 corridors in Cebu City.

## 9. Recommended coverage priorities

### Priority 1 (P0): Upgrade existing route evidence

- Upgrade 01K and 13C from unverified to partially_verified using existing secondary sources.
- Document the detailed stop sequences as notes (not verified stops).
- This improves transparency without adding unverified data.

### Priority 2 (P1): Investigate 03A (Mabolo to Carbon)

- Connects to existing Carbon Market stop.
- Multiple secondary sources with detailed stop sequences.
- Would improve north-central connectivity.
- Requires coordinate verification for new stops.

### Priority 3 (P1): Investigate 10H (Bulacao/Pardo to SM)

- Connects to existing SM City Cebu stop.
- Multiple secondary sources.
- Would improve south-to-north connectivity.
- Requires coordinate verification for new stops.

### Priority 4 (P2): Investigate 06A, 12L

- Lower evidence quality. Requires more research.

## 10. Rejected or deferred candidates

### Deferred

- 03A, 10H, 06A, 12L: Require official source corroboration before adding to dataset.
- 01K, 13C, 17B: Can be upgraded to partially_verified with existing evidence (no new stops needed).

### Rejected

- None explicitly rejected. All candidates remain deferred pending better evidence.

## 11. Data limitations

- No official LTFRB or city government route-level documentation found accessible online.
- All sources are secondary (travel guides, news articles, community posts) or tertiary (user discussions).
- Stop coordinates are approximate landmarks, not verified.
- No fare, schedule, geometry, or verified travel time for any route.
- Route sequences are simplified (2-3 stops vs. 10-17 actual stops).
- Transfer opportunities are limited (1 shared stop).

## 12. Proposed implementation roadmap for a future phase

### Phase A (P0): Upgrade 01K and 13C to partially_verified

- Add sourceOrganization, evidenceReference, verificationStatus to 01K and 13C records.
- Document secondary sources and their limitations.
- Do not add new stops or change stop sequences.
- Acceptance: validate:data passes; records have provenance; verified remains false.

### Phase B (P1): Evidence review for 03A

- Investigate official sources for 03A (Mabolo to Carbon).
- If sufficient evidence, add route with existing Carbon Market stop + new Mabolo stop.
- Coordinate verification for new stops.

### Phase C (P1): Evidence review for 10H

- Investigate official sources for 10H (Bulacao/Pardo to SM).
- If sufficient evidence, add route with existing SM City Cebu stop + new stops.

### Phase D (P2): Network connectivity improvement

- Add routes that connect isolated stops (Carbon Market, Colon Street) to downtown.
- Requires documented evidence for each route.

## 13. Classification

ROUTE EXPANSION OPPORTUNITIES IDENTIFIED

The analysis identified 2 existing routes that could be upgraded to partially_verified (01K, 13C) and 2 candidate routes (03A, 10H) that are promising but require official corroboration before adding to the dataset. No reliable official sources were found for any route's complete stop sequence.
