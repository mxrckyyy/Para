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

## Invalid data handling

The application and validator must never crash because of malformed saved or route data.

- Invalid saved entries are ignored and counted.
- Invalid route records must produce clear validation errors.
- The validator must not silently repair or rewrite data.
- If a record can no longer be reconstructed, the application should show an unavailable state and allow removal.
