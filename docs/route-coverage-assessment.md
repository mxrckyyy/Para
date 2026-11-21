# Route Coverage Assessment — Para

This document assesses Para's current Cebu jeepney route dataset and defines a responsible strategy for future route research and verification.

## 1. Executive summary

Para currently contains 9 stops and 4 routes. All route and stop records are preliminary. One route, `04L`, is `partially_verified` based on secondary sources. The other three routes are `unverified`.

No route has verified geometry. No fare, schedule, or measured travel-time data exists. Several routes contain only endpoint stops.

The current dataset is useful for demonstrating Para's search, ranking, map, and saved-journey features, but it is not sufficient for reliable public commuter use.

The priority for future work is not adding more routes. The priority is verifying the existing `04L` corridor and resolving its evidence gaps before expanding coverage.

## 2. Existing route inventory

| Route ID                              | Code | Name / corridor                                 | Stop count | Stop sequence                                                         | Direction | Geometry | Fare        | Schedule / travel time | Verification status  | Evidence                                      |
| ------------------------------------- | ---- | ----------------------------------------------- | ---------: | --------------------------------------------------------------------- | --------- | -------- | ----------- | ---------------------- | -------------------- | --------------------------------------------- |
| `route-04l-lahug-sm-via-ayala`        | 04L  | Lahug (JY Square) to SM via Ayala Center Cebu   |          3 | `stop-jy-square-lahug`, `stop-ayala-center-cebu`, `stop-sm-city-cebu` | `forward` | `null`   | unavailable | unavailable            | `partially_verified` | CDNDigital; Suroy.ph; CommuteTour Philippines |
| `route-01k-swu-sm-north-bus-terminal` | 01K  | Sambag II (SWU) to SM and North Bus Terminal    |          3 | `stop-swu-sambag`, `stop-sm-city-cebu`, `stop-north-bus-terminal`     | `null`    | `null`   | unavailable | unavailable            | `unverified`         | CDNDigital; Suroy.ph                          |
| `route-17b-apas-carbon`               | 17B  | Apas to Carbon via Escario and Osmeña Boulevard |          2 | `stop-apas-cebu`, `stop-carbon-market-cebu`                           | `null`    | `null`   | unavailable | unavailable            | `unverified`         | CDNDigital; Suroy.ph                          |
| `route-13c-talamban-colon`            | 13C  | Talamban to Colon via Echavez and Sikatuna      |          2 | `stop-talamban-cebu`, `stop-colon-street-cebu`                        | `null`    | `null`   | unavailable | unavailable            | `unverified`         | CDNDigital; Suroy.ph                          |

## 3. Existing stop inventory summary

Para currently has 9 stops:

| Stop ID                   | Name               | Coordinates                           | Routes referencing it                                                 | Supported role                                 |
| ------------------------- | ------------------ | ------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------- |
| `stop-jy-square-lahug`    | JY Square (Lahug)  | Approximate landmark coordinate       | `route-04l-lahug-sm-via-ayala`                                        | Pilot route origin                             |
| `stop-ayala-center-cebu`  | Ayala Center Cebu  | Approximate landmark coordinate       | `route-04l-lahug-sm-via-ayala`                                        | Pilot route intermediate landmark              |
| `stop-sm-city-cebu`       | SM City Cebu       | Approximate landmark coordinate       | `route-04l-lahug-sm-via-ayala`, `route-01k-swu-sm-north-bus-terminal` | Pilot route destination and transfer candidate |
| `stop-swu-sambag`         | SWU (Sambag II)    | Approximate landmark coordinate       | `route-01k-swu-sm-north-bus-terminal`                                 | Route endpoint in simplified data              |
| `stop-north-bus-terminal` | North Bus Terminal | Approximate landmark coordinate       | `route-01k-swu-sm-north-bus-terminal`                                 | Route endpoint in simplified data              |
| `stop-carbon-market-cebu` | Carbon Market      | Approximate landmark coordinate       | `route-17b-apas-carbon`                                               | Route endpoint in simplified data              |
| `stop-apas-cebu`          | Apas               | Approximate district-level coordinate | `route-17b-apas-carbon`                                               | Route endpoint in simplified data              |
| `stop-talamban-cebu`      | Talamban           | Approximate district-level coordinate | `route-13c-talamban-colon`                                            | Route endpoint in simplified data              |
| `stop-colon-street-cebu`  | Colon Street       | Approximate landmark coordinate       | `route-13c-talamban-colon`                                            | Route endpoint in simplified data              |

No stop coordinate is field-verified. All coordinates are approximate landmark or district-level values. No stop should be described as a confirmed operating stop.

## 4. Evidence quality assessment

| Evidence type                                | Current availability  | Assessment                                                                                                    |
| -------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- |
| Official LTFRB documents                     | Not directly reviewed | Potentially authoritative, but no document was accessed in this audit.                                        |
| Cebu City Transportation Office publications | Not directly reviewed | Potentially authoritative, but no publication was accessed in this audit.                                     |
| Cebu City ordinances                         | Cited indirectly      | Cebu Daily News Digital cites Cebu City Ordinance No. 2000, but the ordinance text was not directly reviewed. |
| Credible secondary publications              | Available             | Suroy.ph and Cebu Daily News Digital support route codes and corridor descriptions.                           |
| CommuteTour Philippines                      | Available             | Provides an additional secondary route description and landmark lists.                                        |
| Map or geocoding data                        | Available             | Useful for approximate coordinates only.                                                                      |
| Field observations                           | Not performed         | Not required for this phase.                                                                                  |
| Official geometry                            | Not available         | No verified route path exists.                                                                                |
| Fare data                                    | Not available         | No route-specific fare source has been reviewed.                                                              |
| Schedule data                                | Not available         | No schedule source has been reviewed.                                                                         |

Multiple secondary sources can support source discovery, but they may repeat the same underlying information. They should not automatically be treated as independent verification.

## 5. Route-by-route evidence gaps

### 04L

- Supported: route code, endpoints, and intermediate Ayala/SM corridor by secondary sources.
- Uncertain: exact boarding and alighting locations, complete stop sequence, exact direction, reverse direction, geometry, fare, schedule, and travel time.
- Status: `partially_verified`
- Gap severity: Critical for geometry and direction; High for fare, schedule, and travel time; Medium for stop sequence.

### 01K

- Supported: route code and general corridor by secondary sources.
- Uncertain: endpoint precision because Para uses `SWU (Sambag II)` while Suroy.ph describes the start as `Urgello in Sambag II`.
- Uncertain: intermediate stops, direction, geometry, fare, schedule, and travel time.
- Status: `unverified`
- Gap severity: High for endpoint mismatch and missing direction; Medium for other missing details.

### 17B

- Supported: route code and general corridor by secondary sources.
- Uncertain: all intermediate stops, stop sequence, direction, geometry, fare, schedule, and travel time.
- Current record contains only endpoints.
- Status: `unverified`
- Gap severity: High for stop sequence and direction; Medium for other missing details.

### 13C

- Supported: route code and general corridor by secondary sources.
- Uncertain: all intermediate stops, stop sequence, direction, geometry, fare, schedule, and travel time.
- Current record contains only endpoints.
- Status: `unverified`
- Gap severity: High for stop sequence and direction; Medium for other missing details.

## 6. Coverage limitations

Para cannot currently:

- provide complete Cebu jeepney coverage,
- confirm exact route paths,
- confirm official route authorization,
- provide fares,
- provide schedules,
- provide measured travel times,
- confirm route directions,
- confirm that listed stops are exact boarding or alighting locations.

The current dataset is intentionally small and preliminary. It is suitable for demonstrating route discovery and transparency, but not for authoritative commuter guidance.

## 7. Route prioritization methodology

Future research should be prioritized using the following criteria, in order:

1. Evidence availability: routes with identifiable official or credible sources should be researched first.
2. Corridor clarity: routes with clearly documented endpoints and intermediate landmarks should be prioritized.
3. Transfer usefulness: routes that connect to already documented stops or corridors should be prioritized.
4. Uncertainty severity: routes with unresolved endpoint or direction mismatches should be prioritized for clarification.
5. Practical feasibility: routes that can be verified through safe documentary research or optional supervised public observation should be prioritized.
6. Coverage value: routes that improve journey discovery without adding unsupported claims should be prioritized.

A route's research priority is not the same as its verification status. A high-priority route may still be unverified.

## 8. Ranked future research shortlist

1. `04L` — JY Square (Lahug) to Ayala/SM  
   Reason: strongest secondary-source support, clearest endpoints and intermediate landmark, existing simplified sequence, and useful transfer candidate with `01K`.

2. `01K` — Sambag II (SWU) to SM and North Bus Terminal  
   Reason: useful corridor and potential transfer connection, but endpoint wording must be resolved.

3. `17B` — Apas to Carbon  
   Reason: useful long corridor with secondary source support, but only endpoints are currently represented.

4. `13C` — Talamban to Colon  
   Reason: useful corridor with secondary source support, but only endpoints are currently represented.

No route should be expanded until at least one route has complete supporting evidence.

## 9. 04L Case Study

Route `04L` remains the strongest existing candidate, but it is still `partially_verified`, not verified.

Supported claims:

- Route code `04L`.
- General corridor from JY Square (Lahug) to Ayala/SM.
- Ayala Center Cebu as an intermediate landmark.
- Simplified stop sequence `JY Square (Lahug) -> Ayala Center Cebu -> SM City Cebu`.
- Direction from JY Square toward Ayala and SM, based on secondary sources.

Unsupported or uncertain claims:

- Exact boarding and alighting locations.
- Complete stop sequence.
- Exact direction beyond the stated origin and destination.
- Reverse direction.
- Route geometry.
- Fare.
- Schedule.
- Travel time.

Why 04L is not fully verified:

- No official source was directly reviewed.
- No field evidence was collected.
- No route geometry is available.
- The stop sequence is simplified and not field-verified.
- Fare, schedule, and travel time are unavailable.

No changes to 04L's verification status are recommended in this phase.

## 10. Future Evidence Collection Checklist

Before adding or upgrading a route claim, collect:

- Route ID and route code.
- Route identity source.
- Source organization.
- Source title.
- Source URL or reference.
- Publication or update date.
- Date reviewed.
- Origin or boarding area.
- Destination or alighting area.
- Intermediate stops.
- Stop sequence.
- Direction.
- Reverse-direction support.
- Stop coordinates.
- Route geometry.
- Fare.
- Schedule.
- Estimated versus measured travel time.
- Verification status.
- Reviewer or verification process.
- Limitations and uncertainty notes.

Minimum acceptable evidence:

- Route identity: official or credible secondary source.
- Origin and destination: source-supported or observed.
- Intermediate stops: explicitly documented or observed.
- Stop sequence: documented or observed in order.
- Direction: documented or observed.
- Geometry: verified coordinate path or authoritative map.
- Fare: official or current source.
- Schedule: official or operator source.
- Travel time: measured or documented value, not inferred from distance.
- Verification status: supported by documented evidence and review.

## 11. Dataset Expansion Decision Rules

A new route record is justified only when:

- the route code is supported by a credible source,
- at least two endpoints are supported,
- the record is clearly marked unverified unless evidence supports verification.

A stop may be added when:

- the stop name and approximate location are supported or clearly marked approximate,
- the stop is not presented as an official operating stop without evidence.

A stop sequence may be considered supported only when:

- the order is explicitly documented or observed.

A direction may be considered supported only when:

- outbound and, if applicable, return direction are documented or observed.

Geometry must remain `null` unless:

- a verified coordinate path or authoritative route map supports it.

A route must remain `unverified` when:

- only secondary sources support it,
- endpoints or stop order are uncertain,
- direction is unsupported,
- geometry, fare, or schedule is unavailable.

Conflicting evidence must prevent an update when:

- sources disagree on endpoints, direction, or stop sequence,
- and no credible basis exists to resolve the disagreement.

A route may be marked `partially_verified` when:

- some claims are supported by credible sources,
- but important details remain uncertain.

A route may be marked `verified` only when:

- all required route details have sufficient supporting evidence,
- the evidence is documented,
- and the review date and reviewer are recorded.

## 12. Recommended Next Phases

1. Field-verification phase for route `04L` using safe public observations.
2. Evidence review for route `01K`, especially its endpoint wording.
3. Evidence review for route `17B`.
4. Evidence review for route `13C`.
5. Only after at least one route has complete supporting evidence, consider dataset expansion.

Do not add route geometry, fare, schedule, or travel-time data until supporting evidence exists.

## 13. Explicit Limitations

- No official source was directly reviewed in this assessment.
- No field verification was performed.
- The dataset remains preliminary.
- The route engine and application behavior were not changed.
- The ranked shortlist reflects research priority, not verification status.
- No coverage percentage or completeness score is provided because the current methodology does not support one.

## 14. Automated Verification Results

- `npm run validate:data`: PASS, 9 stops and 4 routes
- `npm run lint`: PASS
- `npm run format:check`: PASS
- `npm test`: PASS, 49/49
- `npm run build`: PASS

## 15. Final Git State

- Branch: `main`
- HEAD: `7266e87883ce3e29cb5ff39bf05d5d43d3259214`
- Working tree: modified files from previous phases plus new documentation changes
- No commit or push was performed.

## 16. Recommended Phase 25

Proceed with a supervised field-verification phase for route `04L`. Verify each stop, direction, and any available route path using safe public observations before marking any part of the route as verified. Do not expand route coverage until at least one route has complete supporting evidence.
