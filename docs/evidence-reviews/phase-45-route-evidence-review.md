# Phase 45 Route Evidence Review

## 1. Review scope

Re-review of existing 04L evidence and investigation of one additional Cebu jeepney route candidate using publicly accessible documentary sources. No route data was modified.

## 2. Initial repository state

- Branch: main
- HEAD: b7d747b2ce7cb9347b938b7bf35beded0b5cbb14
- Working tree: modified (docs/CHANGELOG.md, README.md) + untracked (prior phase artifacts)
- Dataset: 9 stops, 4 routes (all preliminary/unverified; 04L partially_verified)

## 3. 04L evidence review

Route: route-04l-lahug-sm-via-ayala (04L - Lahug (JY Square) to SM via Ayala Center Cebu)

### Existing sources

1. Cebu Daily News Digital (May 15, 2026)
   - Title: 04-L | Lahug (JY Square) - SM: via Ayala Center Cebu
   - Type: Secondary (news article citing route code)
   - Supports: Route identity (code 04L), endpoints (Lahug/JY Square to SM), corridor (via Ayala Center Cebu)
   - Does not support: Stop sequence, geometry, fare, schedule, travel time, direction beyond corridor description

2. Suroy.ph (updated October 24, 2026)
   - Title: Cebu City Jeepney Guide 2026
   - Type: Secondary (travel guide)
   - Supports: Route identity (04L as JY Square to Ayala and SM), boarding advice (board around JY Square, confirm Ayala or SM)
   - Does not support: Complete stop sequence, geometry, fare, schedule, travel time

3. CommuteTour (updated January 2026)
   - Type: Secondary (transit guide)
   - Supports: Route existence and general corridor
   - Does not support: Verified stop sequence, geometry, fare, schedule

### 04L assessment

- Route identity: SUPPORTED (multiple secondary sources agree on code and endpoints)
- Origin/destination: SUPPORTED (JY Square/Lahug to SM City Cebu via Ayala)
- Intermediate stops: PARTIALLY SUPPORTED (Ayala Center Cebu mentioned as intermediate; full sequence not verified)
- Stop sequence: NOT VERIFIED (only 3 stops in Para's simplified sequence; actual sequence may differ)
- Direction: NOT VERIFIED (may be one-way or loop; sources unclear)
- Geometry: NOT AVAILABLE (no verified path)
- Fare: NOT AVAILABLE
- Schedule: NOT AVAILABLE
- Travel time: ESTIMATED (straight-line heuristic, not verified)

### Decision for 04L

PARTIALLY ACCEPT: Route identity and corridor are supported by multiple secondary sources. Intermediate stop sequence, direction, geometry, fare, schedule, and travel time remain unverified. No data changes needed; existing partially_verified status is appropriate.

## 4. Additional candidate route selection

### Selection rationale

Candidate: Route 10H (Bulacao/Pardo to SM City Cebu)

Selection criteria met:

- Credible public documentary references exist (Suroy.ph, Inquirer.net, CommuteTour, Reddit).
- Route is sufficiently identified (code 10H, endpoints Bulacao/Pardo to SM City Cebu).
- Connects to an existing Para stop (SM City Cebu).
- Not previously researched in Para's evidence reviews.

### Sources investigated

1. Suroy.ph (Cebu Jeepney Route Guide)
   - Type: Secondary (travel magazine)
   - Supports: Route code 10H, endpoints (Bulacao/Pardo to SM City Cebu), general path (N. Bacalso Ave, Mambaling, Basak Pardo)
   - Does not support: Exact stop sequence, coordinates, geometry, fare, schedule, travel time

2. Inquirer.net (community/commuter guide)
   - Type: Secondary (news organization, community content)
   - Supports: Route existence and general corridor
   - Does not support: Verified stop sequence, coordinates, geometry, fare, schedule

3. CommuteTour (transit guide)
   - Type: Secondary
   - Supports: Route existence and general path
   - Does not support: Verified stop sequence, coordinates, geometry, fare, schedule

4. Reddit (user discussions)
   - Type: Tertiary (unverified user reports)
   - Supports: Route existence and commuter usage patterns
   - Does not support: Any verified claim

### Claim-by-claim assessment for 10H

- Route identity: PARTIALLY SUPPORTED (multiple secondary sources agree on code and endpoints)
- Origin/destination: PARTIALLY SUPPORTED (Bulacao/Pardo to SM City Cebu)
- Intermediate stops: NOT VERIFIED (Basak Pardo, Mambaling, CIT-U, CCMC, etc. mentioned but not confirmed as official stops)
- Stop sequence: NOT VERIFIED
- Direction: NOT VERIFIED
- Geometry: NOT AVAILABLE
- Fare: NOT AVAILABLE (general Cebu fare table exists but not route-specific)
- Schedule: NOT AVAILABLE
- Travel time: NOT AVAILABLE

### Conflicting evidence

- Sources disagree on exact intermediate path (some mention T. Padilla, others mention P. del Rosario).
- No official LTFRB or city government document confirms this route.
- Route code 10H vs 10M variants create ambiguity about which exact service operates.

### Decision for 10H

REJECT (for now): Evidence consists entirely of secondary and tertiary sources. No official or independently corroborated documentation exists. Intermediate stops, sequence, direction, geometry, fare, and schedule are all unverified. The route connects to an existing stop (SM City Cebu) but adding it would require unverified intermediate stops and a stop sequence. Not added to the dataset.

Recommendation: DEFER until an official source (LTFRB notice, city ordinance, or LPTRP document) confirms the route.

## 5. Route-data changes

No route or stop data was modified in this phase. The existing 4 routes and 9 stops remain unchanged.

## 6. Remaining uncertainties

- 04L stop sequence beyond 3 simplified stops remains unverified.
- 04L direction (one-way vs loop) not confirmed.
- No geometry available for any route.
- No fares, schedules, or verified travel times for any route.
- 10H and other candidate routes lack sufficient evidence for inclusion.

## 7. Recommendations for next evidence-review phase

- Continue searching for official LTFRB or Cebu City LPTRP documents that list specific route codes with stop sequences.
- Consider reviewing CommuteTour or Suroy.ph for routes with more detailed stop-level documentation.
- Do not add routes without at least one credible source naming the route code and endpoints, plus ideally a stop sequence.
- Maintain the conservative verification approach.
