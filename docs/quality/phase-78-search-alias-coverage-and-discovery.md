# Phase 78 Search Alias Coverage & Discovery Improvements

## 1. Initial Git state

- Branch: main
- HEAD: 3075fa7a02d6e702002c22f9e5eda851154e9959
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts)

## 2. Search architecture audit

### Existing matching

- StopAutocomplete uses normaliseText (trim + lowercase) on both query and terms.
- stopMatchesQuery checks if any term (name + aliases) includes the query.
- DEBOUNCE_MS = 120ms.

### Normalization gaps

- No whitespace collapsing (multiple spaces not handled).
- No punctuation handling.
- No Unicode normalization.

## 3. Alias opportunities

### Existing aliases (already in data)

- JY Square (Lahug): JY Square Mall, Lahug, JY Square Centre
- Ayala Center Cebu: Ayala Cebu, Cebu Business Park (+ Ayala added)
- SM City Cebu: SM Cebu, SM City (+ SM added)
- SWU (Sambag II): Southwestern University, Sambag II
- North Bus Terminal: Cebu North Bus Terminal, NBT
- Carbon Market: Carbon Public Market, Carbon
- Apas: Barangay Apas
- Talamban: Talamban, Cebu City
- Colon Street: Colon, Colon Street, Cebu City

### Added aliases (EXISTING DATA supported)

- SM City Cebu: "SM" (common abbreviation, supported by route descriptions mentioning "SM")
- Ayala Center Cebu: "Ayala" (common abbreviation, supported by route descriptions mentioning "Ayala")

## 4. Normalization rules

Created src/utils/searchNormalization.js with normaliseSearchText:

- NFKC Unicode normalization
- Lowercase
- Replace non-alphanumeric (except spaces) with space
- Collapse repeated whitespace
- Trim

## 5. Ambiguous and duplicate matching

- Canonical name matches: handled by normaliseText(term).includes(query)
- Alias matches: handled (aliases included in terms)
- Case-insensitive: handled (lowercase)
- Whitespace: now handled (collapse + trim)
- Punctuation: now handled (replace with space)
- Empty input: returns false (no suggestions)
- Unknown names: "No matching stops found" shown
- Duplicate aliases: not present in data
- Ambiguous aliases: none found (each alias maps to one stop)

## 6. Automated tests

Created src/utils/searchNormalization.test.js with 7 tests:

1. Case normalization
2. Leading/trailing whitespace
3. Repeated whitespace collapse
4. Punctuation handling
5. Empty string
6. Non-string input
7. Unicode NFKC normalization

Total tests: 74 (67 original + 7 new).

## 7. Data integrity

- Stops: 9 (unchanged)
- Routes: 4 (unchanged)
- Stop IDs: unchanged
- Route IDs: unchanged
- Coordinates: unchanged
- Verification statuses: unchanged
- Added 2 aliases: "SM" to SM City Cebu, "Ayala" to Ayala Center Cebu

## 8. Accessibility and responsive validation

- Autocomplete remains keyboard accessible (arrows, Enter, Escape).
- Focus indicators unchanged.
- No horizontal overflow (existing tests pass).
- Dark/light themes unaffected.

## 9. Validation

- validate:data: PASS (9 stops, 4 routes)
- lint: PASS
- format:check: PASS
- npm test: 74/74 passed
- build: PASS
- E2E (chromium): 18/18 passed

## 10. Remaining issues

- No fuzzy matching (not needed for current dataset).
- No component-level tests (RTL not installed).
- Aliases are manually curated; could be expanded with more sources.

## 11. Final Git state

- Branch: main
- HEAD: 3075fa7a02d6e702002c22f9e5eda851154e9959
- Modified: src/components/search/StopAutocomplete.jsx, src/data/stops.json, docs/CHANGELOG.md, docs/roadmap/V1.1-ROADMAP.md
- Untracked: src/utils/searchNormalization.js, src/utils/searchNormalization.test.js, prior phase artifacts
- No commit, push, or deploy.

## Classification

COMPLETED SUCCESSFULLY

Normalization improved (whitespace, punctuation, unicode). Two aliases added (SM, Ayala). 7 new tests. All 74 tests pass. No route data or algorithm changes. No accessibility regressions.
