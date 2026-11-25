# Phase 86 Government Records Acquisition & Route Evidence Recovery

## 1. Initial Git state

- Branch: main
- HEAD: 3075fa7a02d6e702002c22f9e5eda851154e9959
- Working tree: clean
- origin/main: 3075fa7a02d6e702002c22f9e5eda851154e9959 (match)
- Dataset: 9 stops, 4 routes

## 2. Automatic commit investigation

### Findings

- Git hooks: all .sample (no active hooks)
- Git aliases: none configured
- .opencode / .github directories: not present
- Git config: standard, no automation settings
- Reflog: shows auto-commits (phase 81, phase 80, phase 70, phase 60, fix, etc.) created during phase execution

### Conclusion

Auto-commits are triggered by the OpenCode harness (the agent execution environment), not by git hooks, aliases, or repository configuration. The system automatically commits changes at the end of phase execution. This is a platform behavior, not a repository configuration issue. The commits are legitimate (they contain the phase's changes) but use generic messages ("phase 81", "fix", etc.).

## 3. Research methodology

Attempted to access official sources via web search (google_search, websearch). Both search tools were unavailable (HTTP 403/402). Research relied on previously gathered documentary evidence from Phases 45, 63, 64, 65, 67, 68, 75, and 84.

## 4. DOTr research findings

DOTr was not previously investigated. No DOTr-specific documents were found accessible. The DOTr oversees LTFRB but does not directly publish Cebu City route-level documentation.

## 5. Cebu City government findings

- Cebu City government website: HTTP 404 (not accessible in prior phases).
- Cebu City Planning and Development Office: not accessible.
- Cebu City Transportation Office: not accessible.
- Cebu City Council: not accessible.
- No official government documents were retrieved.

## 6. LTFRB research findings

- LTFRB Region VII website: HTTP 403 (not accessible).
- No route matrix, franchise records, or Notice of Compliance documents were directly inspected.
- LTFRB-7 Show Cause Orders for 01K (Libreng Sakay) were referenced in prior research (SunStar articles) but not directly inspected.
- Board Resolution 186 (Series of 2025) referenced in SunStar articles but not directly inspected.

## 7. Alternative retrieval methods attempted

- Direct website access: failed (403/404)
- Web search: failed (403/402)
- Web archives: not attempted (search tools unavailable to find archived URLs)
- Government document repositories: not accessible
- Social media publications: not investigated (no authenticated access)

## 8. Successfully retrieved official documents

None. No new official documents were retrieved in this phase.

## 9. Inaccessible documents and reasons

| Document                                    | Institution          | Access status  | Reason                   |
| ------------------------------------------- | -------------------- | -------------- | ------------------------ |
| Cebu City LPTRP 2024-2028                   | Cebu City government | HTTP 404       | Website not accessible   |
| LTFRB Notice of Compliance (Sept 2025)      | LTFRB Region VII     | HTTP 403       | Website not accessible   |
| LTFRB Board Resolution 186 (Series of 2025) | LTFRB                | Not accessible | No direct document found |
| Route annexes / route matrices              | Cebu City CPDO       | Not accessible | No direct document found |
| Official route maps                         | Cebu City government | Not accessible | No direct document found |
| Cebu City Ordinance No. 2000                | Cebu City Council    | Not accessible | No direct document found |

## 10. Formal records request drafts

Created four records request drafts under docs/research/requests/:

- ltfrb-region-vii.md
- cebu-city-planning-development-office.md
- cebu-city-transportation-office.md
- cebu-city-council.md

Each draft requests specific documents and explains the purpose. None have been submitted.

## 11. 03A reassessment

No new evidence found. 03A remains a candidate requiring official corroboration. Historical evidence (CommuteTour, Inquirer.net, Weebly) supports route identity and corridor but not current operational status.

## 12. Existing route evidence assessment

No new official sources found. Existing evidence base unchanged.

- 04L: partially_verified (Suroy.ph + CDN Digital)
- 01K: partially_verified (CDN Digital + Suroy.ph + CommuteTour + LTFRB-7 Show Cause Orders)
- 13C: partially_verified (CDN Digital + Suroy.ph + CommuteTour + OpenAlfa + LPTRP)
- 17B: unverified (CDN Digital only)

## 13. Verification framework

Created docs/research/route-verification-framework.md with a reusable checklist for future route additions.

## 14. Route verification requirements matrix

| Route | Route identity      | Endpoints           | Corridor            | Intermediate stops | Sequence     | Direction    | Geometry      | Fare          | Schedule      | Current service     |
| ----- | ------------------- | ------------------- | ------------------- | ------------------ | ------------ | ------------ | ------------- | ------------- | ------------- | ------------------- |
| 04L   | Supported           | Supported           | Supported           | Partial            | Not verified | Not verified | Not available | Not available | Not available | Partially supported |
| 01K   | Supported           | Supported           | Supported           | Partial            | Not verified | Not verified | Not available | Not available | Not available | Partially supported |
| 13C   | Supported           | Supported           | Supported           | Partial            | Not verified | Not verified | Not available | Not available | Not available | Partially supported |
| 17B   | Supported           | Supported           | Not verified        | Not verified       | Not verified | Not verified | Not available | Not available | Not available | Not verified        |
| 03A   | Partially supported | Partially supported | Partially supported | Not verified       | Not verified | Not verified | Not available | Not available | Not available | Not verified        |

## 15. Validation results

- validate:data: PASS (9 stops, 4 routes)
- lint: PASS
- format:check: PASS
- npm test: 86/86 passed
- No route data or application code modified.

## 16. Recommended Phase 87 scope

Phase 87 should:

1. If official documents become accessible, conduct evidence review for 03A (highest-value candidate).
2. If no official sources are found, consider whether secondary sources alone justify adding 03A with partially_verified status.
3. Do not add any routes without official or independently corroborated evidence.
4. Continue documenting the evidence gap.

## 17. Classification

RESEARCH BLOCKED

No new official route-level documentation was retrieved. Search tools were unavailable. The existing evidence base (secondary/tertiary sources) remains unchanged. No new routes can be added without official or independently corroborated evidence. The current operational status of 03A cannot be established.

## Boundaries

This is a research and documentation phase only. No route data, application code, route statuses, or deployment settings were modified. No commit, push, or deploy was performed. No physical fieldwork was conducted.
