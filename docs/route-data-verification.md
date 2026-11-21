# Route Data Verification — Para

This document describes how Para's preliminary transit data should be researched, verified, and maintained.

## Current verification status

As of this audit, all 9 stop records and all 4 route records are `verified: false`.
No route has been field-verified. No route geometry has been verified. No fare or schedule data is present.

The application must continue to present this data as preliminary and unverified.

## Verification statuses

| Status               | Meaning                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------- |
| `unverified`         | Discovered from a source or created for development, but not independently checked.       |
| `partially_verified` | Some fields are supported by a credible source, but important details remain unchecked.   |
| `verified`           | Independently checked against an identifiable source and, where relevant, field evidence. |
| `outdated`           | Previously verified but no longer known to be current.                                    |

A record may be `partially_verified` only when the supporting evidence is documented in its `source`, `evidenceReference`, or notes.

## Source discovery versus verification

Source discovery means locating a route code, endpoint description, stop name, or landmark from a public document or map.

Verification means checking that the information is accurate, complete, and current enough to support route discovery.

A public guide can support source discovery without being sufficient for verification. For example, a guide that lists “04L — Lahug (JY Square) to SM via Ayala Center Cebu” supports the existence of a route code and a short description, but it does not by itself prove every intermediate stop, operating direction, fare, schedule, or geometry.

## Required evidence for verified records

A record should not be marked `verified: true` unless it has:

- an identifiable source organization or publisher,
- a source document, URL, or publication reference,
- a clear evidence reference,
- a `lastReviewed` date,
- a reviewer or verification process,
- documented limitations,
- and, for geometry, evidence that the coordinate path was checked rather than inferred.

## Verification process

1. Discover a candidate source.
2. Record the source organization, title, URL, and publication or update date.
3. Compare the source with existing records.
4. Field-check stop locations, route direction, and observed boarding/alighting behavior where possible.
5. Record only supported stop sequences and directions.
6. Add geometry only when a verified coordinate path is available.
7. Mark the record with the appropriate verification status.
8. Add limitations and uncertainty notes.
9. Run `npm run validate:data`.

## Safe handling of incomplete information

- Use `null` for unknown values.
- Do not infer intermediate stops from corridor names.
- Do not derive road geometry from stop coordinates.
- Do not reverse a route unless the data explicitly supports that direction.
- Do not estimate fare or schedule without a documented, clearly labeled heuristic.
- Do not merge different route descriptions merely because they appear similar.

## Pilot verification outcome

Pilot route: `04L` (`route-04l-lahug-sm-via-ayala`)

Status: `partially_verified`

Evidence:

- Suroy.ph lists `04L` as "JY Square to Ayala and SM".
- Suroy.ph advises boarding around JY Square and confirming Ayala or SM.
- Cebu Daily News Digital cites `04-L | Lahug (JY Square) – SM: via Ayala Center Cebu`.
- The existing simplified stop sequence is `JY Square (Lahug) -> Ayala Center Cebu -> SM City Cebu`.

Not verified:

- Official LTFRB or city authorization.
- Exact stop sequence beyond the supported corridor.
- Exact direction beyond the stated origin and destination.
- Fare.
- Schedule.
- Travel time.
- Route geometry.

Result: The route's code, endpoints, and intermediate Ayala/SM corridor are supported by secondary sources. The route is not marked `verified` because official or field evidence is not available. No geometry, fare, schedule, or additional stop was added.

## Phase 18 official-source investigation

Official and government sources attempted:

- LTFRB website and regional pages: not accessible in this audit (HTTP 403 or transport errors).
- Cebu City government website: not accessible in this audit (HTTP 404 or transport errors).
- Cebu City Transportation Office pages: not accessible in this audit.
- Cebu provincial government website: accessible, but no route-specific jeepney data was found.

No official LTFRB, Cebu City, or Cebu City Transportation Office document was directly reviewed in this phase.

Secondary source reviewed:

- Suroy.ph, "Cebu City Jeepney Guide 2026: Route Codes, Fares, and How to Ride", updated October 24, 2026.
  - Supports 04L as "JY Square to Ayala and SM".
  - Supports 01K as "Urgello in Sambag II to the SM City Cebu side".
  - Supports 17B as "Apas near IT Park, Lahug, Capitol, Osmeña Boulevard, Colon, Carbon".
  - Supports 13C as "Talamban, Colon", via Echavez and Sikatuna.
  - Provides general fare structure, not route-specific fares.

Pilot route 04L findings:

- Endpoints: supported as JY Square and SM by Suroy.ph and Cebu Daily News Digital.
- Intermediate stop: Ayala Center Cebu is supported by Suroy.ph and Cebu Daily News Digital.
- Stop ordering: supported only as a simplified corridor sequence.
- Direction: supported as JY Square toward Ayala and SM by secondary sources.
- Geometry: no authoritative geometry found.
- Fare: no route-specific fare found.
- Schedule or travel time: no source found.

Conflicting information:

- Route `01K` uses `SWU (Sambag II)` as an endpoint in Para's current data, while Suroy.ph describes the route as starting at `Urgello in Sambag II`. This is a potential endpoint mismatch and remains unresolved.
- Suroy.ph describes route `17B` as passing additional corridor landmarks, but Para's record contains only endpoints.
- Suroy.ph describes route `13C` as passing Echavez and Sikatuna, but Para's record contains only endpoints.

Verification decision:

- Route `04L` remains `partially_verified`.
- `verified` remains `false`.
- `direction` remains `forward` because secondary sources support travel from JY Square toward Ayala and SM.
- `path` remains `null`.
- No fare, schedule, travel time, or additional stop was added.

Field-verification requirements before any route can be marked verified:

- Record the exact boarding and alighting locations for each route.
- Record the order in which stops are served.
- Confirm the outbound and return directions separately.
- Record evidence with photos, timestamps, and observer notes where permitted.
- Compare observations against at least one credible source.
- Add geometry only from a verified route path.
- Add fares only from an official or clearly current source.
- Document conflicting observations instead of resolving them by assumption.

## Claim-level verification

Verification is claim-level, not route-level.

A route may have some supported claims and some unsupported claims. For example, a route code and endpoints may be supported by a credible source while its stop sequence, direction, fare, schedule, and geometry remain unverified.

The route's overall status must reflect the weakest unsupported required detail. A route with supported endpoints but unsupported geometry, fare, or schedule must not be marked `verified`.

## Evidence documentation model

Evidence should be recorded as lightweight documentation, not fabricated data. A future evidence record should include:

- Evidence ID.
- Related route ID or stop ID.
- Claim category.
- Source title.
- Publisher or organization.
- Source type.
- URL or reference.
- Publication date, if known.
- Date reviewed.
- Specific claim supported.
- Supporting details.
- Limitations.
- Confidence level.
- Review status.

Evidence categories include:

- Route endpoints.
- Intermediate stops.
- Stop sequence.
- Direction.
- Route geometry.
- Fare.
- Schedule.
- Travel time.
- Accessibility information.
- Other.

Source types include:

- Government document.
- Transit operator publication.
- Credible secondary publication.
- Map reference.
- Documented observation.
- Other.

An evidence record documents source discovery or support. It does not by itself verify a route unless the source is sufficiently credible and current and the claim is directly supported.

## Evidence review workflow

1. Identify the claim requiring verification.
2. Find an appropriate source.
3. Record source metadata.
4. Evaluate source credibility and recency.
5. Identify exactly what the source supports.
6. Identify what the source does not support.
7. Compare the source with existing Para data.
8. Document conflicts.
9. Decide whether the claim can be updated.
10. Record the review date and reviewer.
11. Revalidate the dataset with `npm run validate:data`.
12. Update the changelog.

A source supporting one attribute must not automatically verify another attribute. Endpoints, intermediate stops, stop order, direction, geometry, fare, schedule, and travel time must be evaluated separately.

## Safe observation protocol

Field observation is optional and must never be required for routine verification.

Rules:

- Never require independent travel.
- Never require boarding a jeepney.
- Never require approaching unfamiliar drivers or passengers.
- Never require taking photographs of people.
- Conduct any observation only in public, appropriate, and safe settings.
- If observation is ever undertaken, it must be accompanied by a trusted adult.
- If safe observation cannot be performed, the claim simply remains unverified.
- Document conflicting observations instead of resolving them by assumption.

This workflow supports documentary research without field observation.

## Evidence template

Use `docs/evidence-review-template.md` for each route or stop claim.

The template is intentionally empty. Do not pre-fill it with unconfirmed information.

## 2025–2026 transport framework timeline

- Cebu Daily News Digital, May 15, 2026, cites Cebu City Ordinance No. 2000 and city transportation office data for PUJ route code amendments.
- SunStar Cebu, September 8, 2025, reports that LTFRB-7 issued a Notice of Compliance to Cebu City's LPTRP.
- The SunStar report states that the city must pass a local ordinance formally adopting the LPTRP before it receives legal force.
- Suroy.ph, updated October 24, 2026, describes current Cebu City jeepney route codes and fares.
- CommuteTour Philippines, updated January 16, 2026, describes Cebu jeepney route codes and landmarks.

Interpretation limits:

- The existence of an approved LPTRP does not automatically verify every older jeepney route code.
- The SunStar report does not list `04L` among the newly rationalized PUJ Class 2 routes.
- The absence of `04L` from that list does not establish whether it remains in operation, has been discontinued, or may be incorporated into another route.
- Secondary route guides may describe legacy or current operating patterns, but they do not establish official authorization.

## Invalid data handling

The application and validator must never crash because of malformed saved or route data.

- Invalid saved entries are ignored and counted.
- Invalid route records must produce clear validation errors.
- The validator must not silently repair or rewrite data.
- If a record can no longer be reconstructed, the application should show an unavailable state and allow removal.
