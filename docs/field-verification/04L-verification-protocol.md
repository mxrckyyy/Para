# 04L Verification Protocol — Para

## Purpose and scope

This protocol defines how Para may safely evaluate and improve evidence for route `04L` without requiring independent travel, boarding unfamiliar vehicles, approaching drivers or passengers, or conducting unsupervised field research.

This phase is documentation-only. It does not change route data, application behavior, or verification status.

## Current evidence baseline

Route `04L` (`route-04l-lahug-sm-via-ayala`) currently has:

- Route code: `04L`
- Simplified stops: `JY Square (Lahug) -> Ayala Center Cebu -> SM City Cebu`
- Direction: `forward`
- `verified`: `false`
- `verificationStatus`: `partially_verified`
- `path`: `null`
- `estimatedFarePhp`: `null`
- `estimatedTravelTimeMinutes`: `null`

Secondary sources support the route code and general corridor, including Ayala and SM as landmarks. Secondary sources do not establish the complete stop sequence, exact boarding and alighting locations, exact direction, reverse direction, fare, schedule, travel time, or route geometry.

## Safe research boundaries

- Documentary research is the preferred verification method.
- Field observation is optional.
- No one is required to travel independently.
- No one should board unfamiliar vehicles as a research requirement.
- No one should approach, interview, photograph, or record identifiable drivers or passengers.
- No one should enter restricted terminals or private property.
- Any real-world observation must be optional, conducted in safe public settings, and accompanied by a trusted adult.
- If safe observation cannot be performed, the claim remains unverified.
- No personally identifiable information about drivers, passengers, or other individuals may be collected.

## Documentary evidence checklist

For each claim, record:

- Publisher.
- Exact source title.
- Original URL.
- Publication or update date, if available.
- Access/review date.
- Source type.
- Specific claim supported.
- Supporting details.
- Limitations.
- Whether the source is official.
- Whether the source conflicts with other sources.

Official sources should be prioritized. Secondary sources may support source discovery but do not by themselves establish official verification.

## Supervised observation evidence standards

If future observation is ever considered, it must be optional and safely supervised.

Observation may distinguish only:

- A location that is merely a landmark.
- A location where a vehicle appears to stop.
- A confirmed operating stop, when repeated safe observation supports it.
- A route terminal, when boarding or alighting behavior is observed.
- A vehicle's observed direction.
- A complete verified stop sequence only when multiple observations and sources support it.

A single vehicle observation cannot establish permanent operating conditions. Observations should be repeated, documented with timestamps, and compared with credible sources before any claim is upgraded.

Observation records must not include personal information about drivers, passengers, or other individuals.

## Claim-level verification checklist

Use `docs/evidence-review-template.md` for each claim.

Claims to evaluate independently:

1. Route code identity.
2. Origin or terminal.
3. Destination or terminal.
4. Boarding locations.
5. Alighting locations.
6. Intermediate operating stops.
7. Stop sequence.
8. Forward-direction service.
9. Reverse-direction service.
10. Road path.
11. Route geometry.
12. Route-specific fare.
13. Operating schedule.
14. Travel-time estimate.
15. Current authorization or applicable LPTRP status.

For each claim, record:

- Existing Para value.
- Current evidence.
- Evidence required.
- Acceptable source types.
- What would count as sufficient corroboration.
- What would not count as sufficient evidence.
- Whether documentary evidence alone can resolve the claim.
- Whether any supervised observation could add useful evidence.
- Whether the claim should remain unavailable in the application.

## Evidence acceptance criteria

A claim may be updated only when:

- the supporting source is identifiable,
- the source directly supports the specific claim,
- the source is sufficiently current,
- conflicting evidence is documented,
- the review date and reviewer are recorded,
- and limitations are stated.

A claim must remain unavailable when:

- only secondary or approximate support exists,
- the source is inaccessible,
- evidence conflicts without a credible basis for resolution,
- the information could be inferred only from proximity or geocoding,
- or official or field evidence is absent.

A route may be marked `partially_verified` when some claims are supported by credible sources but important details remain uncertain.

A route may be marked `verified` only when all required route details have sufficient supporting evidence and the evidence is documented.

## Conflict-resolution process

1. Record each conflicting source separately.
2. Identify the specific claim that conflicts.
3. Compare source type, publication date, and relevance.
4. Prefer official or directly reviewed sources over secondary summaries.
5. If no credible basis exists to resolve the conflict, leave the claim unchanged.
6. Document the conflict and required next evidence.

Do not silently choose one source over another.

## Data-update approval workflow

1. Identify the specific claim to update.
2. Record the supporting evidence.
3. Check for conflicting evidence.
4. Determine whether the evidence is sufficient.
5. Update only the supported claim.
6. Preserve `path: null` unless verified geometry exists.
7. Preserve unavailable fare, schedule, and travel-time values unless supported.
8. Run `npm run validate:data`.
9. Run `npm run lint`.
10. Run `npm run format:check`.
11. Run `npm test`.
12. Run `npm run build`.
13. Record the decision in the evidence review.
14. Update the changelog.

## Privacy considerations

- Do not collect personal information about drivers, passengers, or other individuals.
- Do not publish identifiable observations.
- Store only route, stop, source, evidence, and review metadata.
- Keep observation records optional and minimal.

## Known limitations

- No official source was directly reviewed for route `04L`.
- No field verification has been performed.
- Route `04L` remains `partially_verified`.
- No route geometry is available.
- No fare, schedule, or travel-time data is available.
- The reverse direction is not established.
- The dataset remains preliminary.

## Conditions required before route status can change

Route `04L` may only be marked `verified` when:

- official or field evidence supports the route code,
- endpoints,
- stop sequence,
- direction,
- and any geometry, fare, schedule, or travel-time data that is added.

Until then, `04L` must remain `verified: false`.
