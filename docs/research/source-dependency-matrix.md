# Source Dependency Matrix

## Purpose

Identify source dependence and duplication relationships among Para's research sources.

## Source identity reconciliation

- S2 and S9 are **duplicate entries for the same source** (Suroy.ph - Cebu City Jeepney Guide 2026). They must be treated as one source (S2). S9 is not an independent source.
- S4 and S15 are **duplicate entries for the same source** (OpenAlfa). They must be treated as one source (S4). S15 is not an independent source.
- S1 and S7 are owned by the **same publisher** (Inquirer Publications). They are not independent publications.
- After deduplication, the inventory contains **13 unique sources** (S1-S13), not 15.

## Source dependency relationships

| Source A             | Source B             | Relationship                                                                                                                                   | Classification                           |
| -------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| S1 (CDN Digital)     | S13 (Ordinance 2000) | S1 cites S13 as source for route code amendments                                                                                               | CONFIRMED DEPENDENCY (S1 depends on S13) |
| S1 (CDN Digital)     | S14 (CCTO)           | S1 cites S14 as data source                                                                                                                    | CONFIRMED DEPENDENCY (S1 depends on S14) |
| S2 (Suroy.ph)        | S1 (CDN Digital)     | Both cover same routes; S2 may derive route codes from S1 or from the same underlying ordinance, but presents original reporting for corridors | LIKELY DEPENDENCY (route codes)          |
| S3 (CommuteTour)     | S1 (CDN Digital)     | CommuteTour covers routes not in CDN Digital's list; may be independent                                                                        | NO DEPENDENCY IDENTIFIED                 |
| S4 (OpenAlfa)        | S3 (CommuteTour)     | OpenAlfa may derive from CommuteTour or similar guides                                                                                         | POSSIBLE DEPENDENCY                      |
| S5 (LTFRB-7)         | S1 (CDN Digital)     | CDN Digital cites city transportation office data; LTFRB-7 is separate regulatory body                                                         | NO DEPENDENCY IDENTIFIED                 |
| S6 (LPTRP)           | S1 (CDN Digital)     | LPTRP is official planning document; CDN Digital cites city data                                                                               | POSSIBLE DEPENDENCY                      |
| S7 (Inquirer.net)    | S1 (CDN Digital)     | Same publisher (Inquirer.net owns CDN Digital)                                                                                                 | CONFIRMED DEPENDENCY (same publisher)    |
| S8 (OSM/Photon)      | None                 | Independent geocoding service                                                                                                                  | NO DEPENDENCY                            |
| S9 (Suroy.ph)        | S2 (Suroy.ph)        | Duplicate inventory entry for the same source                                                                                                  | DUPLICATE (not an independent source)    |
| S10 (SunStar)        | S6 (LPTRP)           | SunStar reports on LPTRP                                                                                                                       | CONFIRMED DEPENDENCY (S10 depends on S6) |
| S11 (Reddit)         | S1-S4 (various)      | User discussions may reference any source                                                                                                      | UNKNOWN                                  |
| S12 (Weebly)         | S3 (CommuteTour)     | Weebly may copy from CommuteTour or similar                                                                                                    | POSSIBLE DEPENDENCY                      |
| S13 (Ordinance 2000) | None                 | Original legislative document                                                                                                                  | NO DEPENDENCY                            |
| S14 (CCTO)           | None                 | Original government source                                                                                                                     | NO DEPENDENCY                            |
| S15 (OpenAlfa)       | S4 (OpenAlfa)        | Duplicate inventory entry for the same source                                                                                                  | DUPLICATE (not an independent source)    |

## Key findings

### Confirmed dependencies

1. S1 (CDN Digital) depends on S13 (Ordinance 2000) and S14 (CCTO) - cited as sources.
2. S7 (Inquirer.net) is owned by the same publisher as S1 (CDN Digital) - not independent.
3. S9 is a duplicate entry for S2 (Suroy.ph) - not an independent source.
4. S15 is a duplicate entry for S4 (OpenAlfa) - not an independent source.
5. S10 (SunStar) depends on S6 (LPTRP) - reports on the planning document.

### Likely dependencies

1. S2 (Suroy.ph) may use CDN Digital as a reference for route codes (LIKELY DEPENDENCY for route codes, but independent reporting for corridors).
2. S12 (Weebly) may copy from CommuteTour or similar guides.
3. S4 (OpenAlfa) may derive from CommuteTour.

### Independent sources

- S3 (CommuteTour): appears to be an independent transit guide with detailed stop sequences.
- S5 (LTFRB-7): official regulatory source, independent of media sources.
- S6 (LPTRP): official planning document, independent.
- S8 (OSM/Photon): independent geocoding service.

### Critical finding: S1 and S7 are NOT independent

Cebu Daily News Digital and Inquirer.net are owned by the same publisher (Inquirer Publications). They should not be counted as independent corroboration.

### Critical finding: Suroy.ph appears once

Suroy.ph is a single source. The 2026 guide is one publication, not multiple independent sources. S2 and S9 are duplicate inventory IDs for the same source.

### Critical finding: OpenAlfa appears once

OpenAlfa is a single source. S4 and S15 are duplicate inventory IDs for the same source.

### Implication for route classifications

- 04L: Supported by S1 (CDN Digital) and S2 (Suroy.ph) - 2 independent secondary sources. PARTIALLY VERIFIED is justified.
- 01K: Supported by S1 (CDN Digital) and S3 (CommuteTour) - 2 independent secondary sources + S5 (LTFRB-7 official for service existence). PARTIALLY VERIFIED is justified.
- 13C: Supported by S1 (CDN Digital) and S3 (CommuteTour) + S6 (LPTRP) - 2 independent secondary + 1 official (existence only). PARTIALLY VERIFIED is justified.
- 03A: Supported by S3 (CommuteTour) and S7 (Inquirer.net, same publisher as S1) - effectively 1 independent secondary source. NOT sufficient for PARTIALLY VERIFIED under strict rules.
- 10H: Supported by S2 (Suroy.ph), S7 (Inquirer.net), S3 (CommuteTour), S11 (Reddit) - multiple secondary but with conflicting intermediate paths. NOT sufficient.
- 06A: Only mentioned in route code family lists. NOT sufficient.
- 12L: Only mentioned in route code family lists. NOT sufficient.

## Revised evidence counts (Phase 91)

| Route | Directly inspected | Independent | Dependent/potential | Official uninspected | Unknown independence |
| ----- | ------------------ | ----------- | ------------------- | -------------------- | -------------------- |
| 04L   | 2 (S1, S2)         | 2           | 0                   | 2 (S13, S14)         | 0                    |
| 01K   | 2 (S1, S3)         | 2           | 0                   | 2 (S5, S13)          | 0                    |
| 13C   | 2 (S1, S3)         | 2           | 0                   | 2 (S6, S13)          | 0                    |
| 17B   | 1 (S1)             | 1           | 0                   | 1 (S13)              | 0                    |
| 03A   | 1 (S3)             | 1           | 1 (S7)              | 0                    | 1 (S12)              |
