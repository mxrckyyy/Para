# Route Verification Framework

## Purpose

A reusable checklist for evaluating whether a candidate route has sufficient evidence for inclusion in Para's dataset.

## Verification dimensions

1. **Source authority** - Is the source official, secondary, or tertiary?
2. **Publication date** - When was the source published or updated?
3. **Current validity** - Does the source reflect current service?
4. **Route identity** - Is the route code consistently documented?
5. **Endpoints** - Are origin and destination supported?
6. **Intermediate stops** - Are specific stops documented?
7. **Directional differences** - Is the route direction established?
8. **Geographic accuracy** - Are coordinates verified?
9. **Franchise authorization** - Is the route officially authorized?
10. **Current operational status** - Is the route currently operating?
11. **Independent corroboration** - Do multiple independent sources agree?
12. **Conflicting information** - Do sources disagree?

## Minimum evidence for each status

### VERIFIED

- Identifiable source organization or publisher.
- Source document, URL, or publication reference.
- Clear evidence reference.
- lastReviewed date.
- Reviewer or verification process.
- Documented limitations.
- For geometry: evidence that coordinate path was checked.

### PARTIALLY VERIFIED

- Some fields supported by a credible source.
- Important details remain unchecked.
- Supporting evidence documented in source, evidenceReference, or notes.

### HISTORICAL

- Supported as a historical fact.
- Not established as current.

### UNVERIFIED

- Discovered from a source or created for development.
- Not independently checked.

### CONFLICTING

- Sources provide inconsistent information.

### DEFERRED

- Evidence exists but is insufficient for inclusion.
- Further documentary research needed.

## Decision rules

- A route can be PARTIALLY VERIFIED if route identity and endpoints are supported by at least one credible source.
- A route should not be marked VERIFIED without official or field evidence.
- Secondary sources may support PARTIALLY VERIFIED if their content is sufficiently specific and independently corroborated.
- Multiple pages from one publisher do not count as independent corroboration.
- Historical evidence does not automatically establish current operational status.
- No route should be added without at least route identity and endpoint support.
