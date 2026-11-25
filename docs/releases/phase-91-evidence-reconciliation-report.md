# Phase 91 — Evidence Count Reconciliation & Research Readiness Report

## Classification: PARTIALLY VERIFIED

## A. Initial Git state

- Branch: main
- HEAD: dbcd8822ad5deaa850c6aefbc71dfa37c0c64d48
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts)
- origin/main: 3f442345161b05da9998d5189833e6c9630aa5ee (HEAD moved forward by auto-commit)
- No reset, clean, or discard operations performed.

## B. S1/S2 dependency investigation

**S1 (CDN Digital) and S2 (Suroy.ph):**

- Different publishers (Inquirer Publications vs Suroy.ph travel magazine).
- Independent publications.
- S2 may reference S1's route code listings (same route codes).
- S1 cites Cebu City Ordinance No. 2000 and CCTO as sources.
- S2 does not explicitly cite S1.
- Classification: **LIKELY DEPENDENCY** (S2 may derive route codes from S1 or from the same underlying ordinance, but presents original reporting for corridors and boarding advice).

**S1 and S7 (CDN Digital and Inquirer.net):**

- Same publisher (Inquirer Publications).
- Classification: **CONFIRMED DEPENDENCY** (same publisher, not independent).

**S2 and S9 (Suroy.ph):**

- Duplicate inventory entries for the same source.
- Classification: **DUPLICATE** (not an independent source).

**S4 and S15 (OpenAlfa):**

- Duplicate inventory entries for the same source.
- Classification: **DUPLICATE** (not an independent source).

## C. S2/S9 source identity reconciliation

- S2 and S9 are the same source (Suroy.ph - Cebu City Jeepney Guide 2026).
- S4 and S15 are the same source (OpenAlfa).
- After deduplication: 13 unique sources (S1-S13), not 15.
- Source-dependency-matrix.md updated to reflect duplicates.

## D. Revised source dependency matrix

Key corrections applied:

1. S2/S9 merged (duplicate ID).
2. S4/S15 merged (duplicate ID).
3. S1/S7 confirmed same publisher (not independent).
4. S2 (Suroy.ph) reclassified from POSSIBLE to LIKELY DEPENDENCY for route codes.
5. Revised evidence counts table added.

## E. Recalculated route evidence counts

| Route | Directly inspected | Independent | Dependent/potential | Official uninspected | Unknown independence |
| ----- | ------------------ | ----------- | ------------------- | -------------------- | -------------------- |
| 04L   | 2 (S1, S2)         | 2           | 0                   | 2 (S13, S14)         | 0                    |
| 01K   | 2 (S1, S3)         | 2           | 0                   | 2 (S5, S13)          | 0                    |
| 13C   | 2 (S1, S3)         | 2           | 0                   | 2 (S6, S13)          | 0                    |
| 17B   | 1 (S1)             | 1           | 0                   | 1 (S13)              | 0                    |
| 03A   | 1 (S3)             | 1           | 1 (S7)              | 0                    | 1 (S12)              |

## F. Route classification review

- **04L**: partially_verified — defensible. 2 independent secondary sources. No change.
- **01K**: partially_verified — defensible. 2 independent secondary + LTFRB-7 (uninspected). No change.
- **13C**: partially_verified — defensible. 2 independent secondary + LPTRP (uninspected). No change.
- **17B**: unverified — appropriate. 1 secondary source. No change.
- **03A**: deferred — correct. Effectively 1 independent secondary source. No change.

No route classifications changed.

## G. 03A assessment

03A remains DEFERRED. Effectively only 1 independent secondary source (CommuteTour/S3). S7 (Inquirer.net) is same publisher as S1 (CDN Digital) and does not provide independent corroboration. S12 (Weebly) has unknown independence. No official source directly inspected. 03A should not be added to the dataset.

## H. Official-source inspection status

All official sources remain UNINSPECTED:

- LTFRB-7: HTTP 403
- Cebu City government: HTTP 404
- CCTO: not accessible
- Ordinance 2000: not directly inspected
- LPTRP: not directly inspected

No alternative access methods successful. Search tools unavailable (HTTP 403/402).

## I. Records request readiness

All four records requests remain NOT SUBMITTED:

1. LTFRB-7 franchise/route records
2. CPDO LPTRP documents
3. CCTO route documentation
4. City Council ordinance records

No submission dates or reference numbers fabricated. Drafts ready for manual review. No unverified government contact information inserted.

## J. Research strategy recommendations

1. Do not repeat broad searches using the same unavailable search services (HTTP 403/402).
2. Practical next steps that do not depend on unavailable search tools:
   - Manual review of official government websites by the user.
   - Manual submission of the prepared records requests.
   - Review of documents supplied by the user.
   - Inspection of accessible official PDF or public records repositories.
   - Future review of actual government responses.
3. If official documents become accessible, conduct evidence review for 03A.
4. If no official sources are found, consider whether secondary sources alone justify adding 03A with partially_verified status.
5. Do not add any routes without official or independently corroborated evidence.
6. Continue documenting the evidence gap.

## K. Dataset and application integrity

- 9 stops, 4 routes. Unchanged.
- No route data or application code modified.
- Route engine not modified.
- No application source code changed.
- 03A remains DEFERRED.
- All four records requests remain NOT SUBMITTED.

## L. Validation results

Run during this phase (fresh results, not reused):

- `npm run validate:data`: PASS (9 stops, 4 routes)
- `npm run lint`: PASS
- `npm run format:check`: PASS
- `npm test`: 86/86 passed
- `npm audit`: 0 vulnerabilities

## M. Files created or modified

Created:

- docs/research/phase-91-evidence-count-reconciliation.md
- docs/research/route-verification-status-review.md
- docs/releases/phase-91-evidence-reconciliation-report.md

Modified:

- docs/research/source-dependency-matrix.md (corrected S2/S9 and S4/S15 duplicates, reclassified S2 dependency)
- docs/CHANGELOG.md (Phase 91 entry)

## N. Final Git state

- Branch: main
- HEAD: dbcd8822ad5deaa850c6aefbc71dfa37c0c64d48
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts + phase-91 docs + corrected matrices)
- No commit, push, or deploy performed.

## O. Remaining limitations

- No official LTFRB or city government route-level documentation found accessible.
- Complete stop sequences remain unverified for all routes.
- No geometry, fares, schedules, or verified travel times for any route.
- 03A has effectively only 1 independent secondary source.
- No field verification conducted for any route.
- Search tools unavailable (HTTP 403/402).
- No official source has been directly inspected for any route.

## P. Recommended Phase 92

Phase 92 should:

1. If official documents become accessible, conduct evidence review for 03A.
2. If no official sources are found, consider whether secondary sources alone justify adding 03A with partially_verified status.
3. Do not add any routes without official or independently corroborated evidence.
4. Continue documenting the evidence gap.
5. Perform manual accessibility review using docs/quality/manual-accessibility-checklist.md.
6. Verify production commit SHA via Vercel dashboard.

## Conclusion

PARTIALLY VERIFIED. The existing verification statuses (04L, 01K, 13C as partially_verified) are supported by at least 2 independent secondary sources each. However, the evidence base is entirely secondary/tertiary. No official source has been directly inspected. The source independence analysis revealed that some previously assumed independent sources are actually from the same publisher (CDN Digital and Inquirer.net). S2 and S9 are duplicate entries for the same source (Suroy.ph). S4 and S15 are duplicate entries for the same source (OpenAlfa). No route can be marked as verified without official or field evidence. 03A has effectively only 1 independent secondary source and should not be added.
