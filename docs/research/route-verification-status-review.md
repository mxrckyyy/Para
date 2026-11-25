# Route Verification Status Review

## Purpose

Review each route's current classification against the documented verification framework, based on Phase 91 evidence count reconciliation.

## Verification framework reference

Route classifications (from docs/research/route-verification-framework.md):

- **verified**: Official documentation or field verification confirms route identity, endpoints, corridor, and current service.
- **partially_verified**: At least 2 independent secondary sources support route identity, endpoints, and corridor. Official sources may be cited but not directly inspected.
- **unverified**: Only 1 secondary source supports route identity. No independent corroboration.
- **deferred**: Candidate not added to dataset. Insufficient evidence for any classification.

## Route 04L - partially_verified

**Supported claims:**

- Route identity (code 04L exists): S1, S2 (2 independent secondary sources)
- Origin (JY Square/Lahug): S1, S2
- Destination (SM City Cebu): S1, S2
- General corridor (via Ayala): S1, S2
- Intermediate stops: partially supported (S1, S2, low strength)
- Current service status: partially supported (S1, S2, low strength)

**Unsupported claims:**

- Complete stop sequence: not verified (no official route matrix)
- Direction: not verified
- Route geometry: not available
- Fare: not available
- Schedule: not available
- Travel time: estimated (straight-line heuristic, not measured)
- Current operational status: not verified

**Source independence:**

- S1 (CDN Digital) and S2 (Suroy.ph) are different publishers. Genuinely independent secondary sources.
- S2 may derive route codes from S1's underlying source (Ordinance 2000), but presents original reporting for corridors and boarding advice.
- Official references (S13 Ordinance 2000, S14 CCTO) cited but NOT directly inspected.

**Classification assessment:** PARTIALLY VERIFIED is defensible. Supported by 2 independent secondary sources for identity, endpoints, and corridor. No official source directly inspected. Complete sequence, direction, geometry, fare, schedule, and verified travel time remain unverified.

**Recommendation:** Retain current classification. No change.

## Route 01K - partially_verified

**Supported claims:**

- Route identity (code 01K exists): S1, S2, S3 (2 independent secondary sources: S1, S3)
- Origin (SWU/Sambag II): S1, S2, S3
- Destination (SM and North Bus Terminal): S1, S2, S3
- General corridor (via N. Bacalso, downtown, M.J. Cuenco): S1, S2, S3
- Intermediate stops: partially supported (S3, low strength)
- Current service status: partially supported (S5 LTFRB-7 Show Cause Orders, medium strength)
- Current operational status: partially supported (S5, medium strength)

**Unsupported claims:**

- Complete stop sequence: not verified
- Direction: not verified
- Route geometry: not available
- Fare: not available
- Schedule: not available
- Travel time: estimated (straight-line heuristic)

**Source independence:**

- S1 (CDN Digital) and S3 (CommuteTour) are different publishers. Genuinely independent.
- S5 (LTFRB-7) is an official regulatory source, cited but NOT directly inspected.
- S13 (Ordinance 2000) cited but NOT directly inspected.

**Classification assessment:** PARTIALLY VERIFIED is defensible. Supported by 2 independent secondary sources for identity, endpoints, and corridor. LTFRB-7 confirms service existence but document not directly inspected.

**Recommendation:** Retain current classification. No change.

## Route 13C - partially_verified

**Supported claims:**

- Route identity (code 13C exists): S1, S2, S3, S4 (2 independent secondary sources: S1, S3)
- Origin (Talamban): S1, S2, S3, S4
- Destination (Colon): S1, S2, S3, S4
- General corridor (via Banilad, Ayala, Echavez, Sikatuna): S1, S2, S3, S4
- Intermediate stops: partially supported (S3, low strength)
- Current service status: partially supported (S6 LPTRP via SunStar, medium strength)
- Current operational status: partially supported (S6, medium strength)

**Unsupported claims:**

- Complete stop sequence: not verified
- Direction: not verified
- Route geometry: not available
- Fare: not available
- Schedule: not available
- Travel time: estimated (straight-line heuristic)

**Source independence:**

- S1 (CDN Digital) and S3 (CommuteTour) are different publishers. Genuinely independent.
- S6 (LPTRP) is an official planning document, cited via SunStar (S10) but NOT directly inspected.
- S13 (Ordinance 2000) cited but NOT directly inspected.

**Classification assessment:** PARTIALLY VERIFIED is defensible. Supported by 2 independent secondary sources for identity, endpoints, and corridor. LPTRP confirms route existence but document not directly inspected.

**Recommendation:** Retain current classification. No change.

## Route 17B - unverified

**Supported claims:**

- Route identity (code 17B exists): S1 (1 secondary source, low strength)
- Origin (Apas): S1
- Destination (Carbon Market): S1

**Unsupported claims:**

- General corridor: not verified
- Intermediate stops: not verified
- Complete stop sequence: not verified
- Direction: not verified
- Route geometry: not available
- Fare: not available
- Schedule: not available
- Travel time: not available
- Current service status: not verified
- Current operational status: not verified

**Source independence:**

- Only 1 secondary source (S1/CDN Digital). No independent corroboration.

**Classification assessment:** UNVERIFIED is appropriate. Only route identity and endpoints supported by a single source. All other claims unsupported.

**Recommendation:** Retain current classification. No change. Do not promote to partially_verified without additional independent evidence.

## Candidate 03A - deferred

**Supported claims (from secondary sources only):**

- Route identity (code 03A exists): S3, S7, S12 (effectively 1 independent secondary source: S3/CommuteTour)
- Origin (Mabolo/Panagdait): S3, S7
- Destination (Carbon Market): S3, S7
- General corridor: S3, S7

**Unsupported claims:**

- Complete stop sequence: not verified
- Direction: not verified
- Route geometry: not available
- Fare: not available
- Schedule: not available
- Travel time: not available
- Current service status: not verified
- Current operational status: not verified

**Source independence:**

- S3 (CommuteTour) is genuinely independent.
- S7 (Inquirer.net) is owned by the same publisher as S1 (CDN Digital) - NOT independent. Does not provide independent corroboration.
- S12 (Weebly) has unknown independence (possible dependency on S3).
- Effectively only 1 independent secondary source.

**Classification assessment:** DEFERRED is correct. 03A does not meet the threshold for partially_verified (requires 2 independent secondary sources). Only 1 genuinely independent secondary source exists. No official source has been directly inspected.

**Recommendation:** Retain DEFERRED status. Do not add to dataset. Reassess if official documents become accessible or if 2+ genuinely independent secondary sources emerge.

## Candidate 10H - not in dataset (deferred)

**Supported claims:**

- Route identity: S2, S7, S3, S11 (multiple secondary but with conflicting intermediate paths)
- Origin: S2, S7, S3
- Destination: S2, S7, S3
- General corridor: S2, S7, S3 (conflicting: T. Padilla vs P. del Rosario)

**Classification assessment:** NOT in dataset. Conflicting intermediate path evidence. NOT sufficient for addition.

## Candidate 06A - not in dataset (deferred)

**Supported claims:**

- Endpoints: partially supported (route code family descriptions only)

**Classification assessment:** NOT in dataset. Only endpoints partially supported. All other claims not verified.

## Candidate 12L - not in dataset (deferred)

**Supported claims:**

- Endpoints: partially supported (route code family descriptions only)

**Classification assessment:** NOT in dataset. Only endpoints partially supported. All other claims not verified.

## Summary

| Route/Candidate | Classification     | Independent sources    | Official sources inspected | Change recommended? |
| --------------- | ------------------ | ---------------------- | -------------------------- | ------------------- |
| 04L             | partially_verified | 2 (S1, S2)             | 0                          | No                  |
| 01K             | partially_verified | 2 (S1, S3)             | 0                          | No                  |
| 13C             | partially_verified | 2 (S1, S3)             | 0                          | No                  |
| 17B             | unverified         | 1 (S1)                 | 0                          | No                  |
| 03A             | deferred           | 1 (S3)                 | 0                          | No                  |
| 10H             | deferred           | multiple (conflicting) | 0                          | No                  |
| 06A             | deferred           | 0                      | 0                          | No                  |
| 12L             | deferred           | 0                      | 0                          | No                  |

**Conclusion:** All current classifications remain defensible under the documented verification framework. No route classifications should be changed based on Phase 91 evidence reconciliation. The evidence base remains entirely secondary/tertiary. No official source has been directly inspected for any route.
