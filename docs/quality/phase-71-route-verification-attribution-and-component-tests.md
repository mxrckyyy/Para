# Phase 71 Route Verification Attribution & Component Testing

## 1. Initial Git state

- Branch: main
- HEAD: 3f442345161b05da9998d5189833e6c9630aa5ee
- Working tree: modified (docs/CHANGELOG.md) + untracked (prior phase artifacts)

## 2. Phase 70 behavior inspection

- JourneyCard computed routeVerificationStatuses as an array of unique statuses.
- RouteDetail used the same pattern.
- DataStatusBadge rendered one badge per unique status.
- For transfer journeys, badges showed unique statuses but without route labels, making it ambiguous which status belonged to which route.

## 3. Route-to-status attribution findings

- The association between route and status was ambiguous for transfer journeys.
- Example: Route 01K (partially_verified) + Route 17B (unverified) would show two badges with no route labels.
- Users could not tell which status belonged to which route.

## 4. Implementation summary

- JourneyCard.jsx: Replaced routeVerificationStatuses with routeVerificationGroups (array of {status, codes}). Renders route codes above each badge when multiple routes are present. Direct journeys (1 route) show no route code label (compact).
- RouteDetail.jsx: Same change. Renders route codes above each badge for transfer journeys.

## 5. Component testing decision

React Testing Library is not installed. The project's testing stack is Vitest (unit) + Playwright (E2E). Adding RTL would introduce new dependencies (violating minimal dependency policy). Component rendering is already covered by Playwright E2E tests. Decision: defer component testing to a future phase. Document rationale.

## 6. Tests added

No new component tests added (RTL not available). Existing 67 Vitest tests + 18 Chromium E2E tests cover the changes.

## 7. Accessibility and responsive findings

- Route codes render as small text (text-[10px]) above badges. No contrast issues.
- Multiple badges render in a flex column with gap-1. No horizontal overflow.
- Keyboard navigation unaffected (badges are spans, not interactive).
- Dark theme: route code text uses text-text-muted (adequate contrast).

## 8. Validation results

- validate:data: PASS (9 stops, 4 routes)
- lint: PASS
- format:check: PASS
- npm test: 67/67 passed
- build: PASS
- E2E (chromium): 18/18 passed

## 9. Remaining limitations

- No component-level tests (RTL not installed).
- DataStatusBadge visual rendering not tested in isolation.
- Route code labels only show when multiple routes present (by design for compactness).

## 10. Recommended Phase 72 scope

Phase 72 should focus on:

1. Adding React Testing Library for component-level tests.
2. Testing DataStatusBadge, JourneyCard, and RouteDetail rendering.
3. Route-data expansion (from V1.1 roadmap Phase A).

## Classification

COMPLETED SUCCESSFULLY

Route-to-status attribution ambiguity resolved by adding route code labels above badges for transfer journeys. No component testing introduced (RTL not available; E2E covers rendering). All 67 tests pass. No route data or algorithm changes. No accessibility regressions.
