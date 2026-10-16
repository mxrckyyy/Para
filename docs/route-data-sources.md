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

## Recommended future improvements

- Compare records against official Cebu City transportation office publications.
- Conduct field checks and record exact stop coordinates and route geometry.
- Add schedule and fare sources when available.
- Expand and verify route corridors stop by stop.
- Track source publication dates and review dates.
