# Route Data Sources — Para

This document describes the provenance, coverage, and limitations of the Phase 2 static jeepney route/stop data.

## Dataset summary

- **Stops:** 9
- **Routes:** 4
- **Verified records:** 0 of 9 stops and 0 of 4 routes
- **All records:** unverified; prepared for development only and clearly labeled as such

The current dataset is intentionally small. Accuracy was prioritized over coverage. No claim is made that this is official Cebu transit data.

## Primary route source

Cebu Daily News Digital, "Lost in Cebu? Here's a guide to Cebu City's jeepney route codes," May 15, 2026:

https://cebudailynews.inquirer.net/728043/lost-in-cebu-heres-a-guide-to-cebu-citys-jeepney-route-codes

The article compiles updated public utility jeepney (PUJ) route code amendments under Cebu City Ordinance No. 2000 and data from the city transportation office. It provides short route descriptions by route code. Route codes and endpoint/corridor wording in `src/data/routes.json` are based on this source.

## Coordinate source

Stop coordinates were obtained during Phase 2 from Photon/Komoot geocoding results based on OpenStreetMap contributors. They are approximate landmark or district-level coordinates and are not field-verified measurements. OSM/Photon source information is retained in each stop's `source` field.

## Included route records

| Route code | Simplified name                                 | Source description                                      |
| ---------- | ----------------------------------------------- | ------------------------------------------------------- |
| 04L        | Lahug (JY Square) to SM via Ayala Center Cebu   | `04-L \| Lahug (JY Square) – SM: via Ayala Center Cebu` |
| 01K        | Sambag II (SWU) to SM and North Bus Terminal    | `01-K \| Sambag II (SWU) – SM – North Bus Terminal`     |
| 17B        | Apas to Carbon via Escario and Osmeña Boulevard | `17-B \| APAS–CARBON via Escario Osmeña Blvd.`          |
| 13C        | Talamban to Colon via Echavez and Sikatuna      | `13-C \| TALAMBAN-COLON via Echavez – Sikatuna`         |

## Known coverage gaps

- Only four route descriptions were converted into records.
- Only nine stops were created; many Cebu streets, terminals, and barangays are not represented.
- Intermediate stops from route corridors are intentionally omitted because they were not verified.
- Route `path` geometry is omitted.
- No fares, schedules, frequencies, directions, or measured travel times are included.
- Route sequences are simplified development data and may not match actual operator paths.
- Coordinates are approximate and may not align with actual pickup/drop-off locations.
- The guide describes many other route codes that are not included.
- The guide itself may not be complete or current.

## Verification status rules

- `verified: false` means the record has not been independently checked against an identifiable authoritative source.
- `lastReviewed: null` means no manual data review has occurred.
- `source` explains where each value came from.
- `notes` explain uncertainty or simplifications.
- Illustrative records must not be described as official government data in the application UI.

## Source research and reliability

The following sources are relevant to future verification. Their exact URLs and publication details should be confirmed before being used as authoritative evidence.

| Source or publisher                          | Type                                           | What it may support                                            | Reliability concern                                                                                   |
| -------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Cebu Daily News Digital route-code guide     | Public news guide                              | Route codes and short origin-destination-corridor descriptions | Secondary source; may summarize or amend local data; not an official transit authority publication.   |
| Cebu City Ordinance No. 2000                 | City ordinance cited by the guide              | Route code amendments                                          | Cited by the guide, but the ordinance text was not directly reviewed in this audit.                   |
| Cebu City Transportation Office              | Local transportation office cited by the guide | City PUJ route information                                     | Cited as a data source, but no direct publication was reviewed in this audit.                         |
| LTFRB                                        | National regulator                             | Franchise and route authorization information                  | Potentially authoritative, but no direct LTFRB document was reviewed in this audit.                   |
| OpenStreetMap contributors via Photon/Komoot | Geocoding/map data                             | Approximate landmark and district coordinates                  | Useful for approximate coordinates only; not confirmation of official operating stops or route paths. |

No official source was directly verified in this audit. Community guides and map geocoding must not be treated as proof of official routes, verified stop sequences, fares, schedules, or geometry.

## Dataset audit

Current dataset contents:

- 9 stops.
- 4 routes.
- 0 verified records.
- 0 records with a review date.
- 0 records with route geometry.
- 0 fare values.
- 0 measured travel-time values.

Checks performed:

- All stop IDs are unique.
- All route IDs are unique.
- All route stop references resolve to existing stop IDs.
- All coordinates are within valid latitude and longitude ranges.
- All route colors are valid hexadecimal colors.
- All route `path` values are null.
- All `verified` values are false.
- All `lastReviewed` values are null.

Known limitations:

- Route sequences are simplified from public descriptions.
- Several routes contain only endpoint stops.
- Route direction is not documented.
- Geometry is unavailable.
- Coordinates are approximate.
- Transfer support is based on simplified sequences.
- The dataset does not cover most Cebu routes or stops.

## Pilot verification source: Suroy.ph Cebu City Jeepney Guide 2026

Publisher: Suroy.ph (travel guide website)

Title: "Cebu City Jeepney Guide 2026: Route Codes, Fares, and How to Ride"

Original URL: https://suroy.ph/cebu-city-jeepney-guide-2026/

Publication/update date: Updated October 24, 2026 (page states fares effective September 28, 2026).

Geographic coverage: Cebu City jeepney route codes, corridors, fares, and riding guidance.

What it supports:

- Route code `04L` is listed as "JY Square to Ayala and SM".
- The guide states to board around JY Square and confirm Ayala or SM.
- Route code `01K` is listed as "Urgello in Sambag II to the SM City Cebu side", passing Colon, Parian, and M.J. Cuenco Avenue.
- Route code `17B` is listed as "Apas near IT Park, Lahug, Capitol, Osmeña Boulevard, Colon, Carbon".
- Route code `13C` is listed as "Talamban, Colon", via Echavez and Sikatuna.
- General fare structure for traditional and modern jeepneys.

What it does not establish:

- Official LTFRB or city authorization.
- Exact stop sequences or stop IDs.
- Exact route direction beyond the stated origin and destination.
- Actual road geometry.
- Route-specific fares.
- Schedules or travel times.

Reliability concern: This is a secondary travel guide, not an official transit authority publication. It is useful for source discovery and cross-checking but is not sufficient to mark a route as verified.

## Pilot verification result

Selected pilot route: `04L` (`route-04l-lahug-sm-via-ayala`).

Reason for selection:

- It has the clearest secondary-source support for both endpoints and an intermediate stop.
- Suroy.ph lists it as "JY Square to Ayala and SM".
- Cebu Daily News Digital lists it as "04-L | Lahug (JY Square) – SM: via Ayala Center Cebu".
- The existing simplified stop sequence `JY Square (Lahug) -> Ayala Center Cebu -> SM City Cebu` matches the supported corridor.

Verification outcome:

- Endpoints: supported by secondary sources.
- Intermediate stop: Ayala Center Cebu is supported by secondary sources.
- Stop ordering: supported as a simplified sequence, but not field-verified.
- Direction: supported as JY Square toward Ayala and SM by secondary sources.
- Geometry: not available; no route line is claimed.
- Fare: not available.
- Schedule or travel time: not available.

Final status: `partially_verified`.

The route remains `verified: false`. No route geometry, fare, schedule, or additional stop was invented.

## Recommended future improvements

- Compare records against official Cebu City transportation office publications.
- Conduct field checks and record exact stop coordinates and route geometry.
- Add schedule and fare sources when available.
- Expand and verify route corridors stop by stop.
- Track source publication dates and review dates.
