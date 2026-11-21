# 04L Claim Checklist — Para

Use this checklist for a qualified reviewer. It does not require the user to conduct fieldwork.

Route: `04L` (`route-04l-lahug-sm-via-ayala`)

## Route identity

- [ ] Route code `04L` is supported by an identifiable source.
- [ ] Source organization is recorded.
- [ ] Source title and URL are recorded.
- [ ] Publication or update date is recorded, if available.
- [ ] Review date is recorded.

## Origin / boarding area

- [ ] JY Square/Lahug is supported as a boarding area.
- [ ] Exact boarding location is documented or marked unavailable.
- [ ] Source type is recorded.

## Destination / alighting area

- [ ] SM City Cebu is supported as an alighting area.
- [ ] Exact alighting location is documented or marked unavailable.
- [ ] Source type is recorded.

## Intermediate stop

- [ ] Ayala Center Cebu is supported as an intermediate landmark or stop.
- [ ] Whether vehicles stop at Ayala is documented.
- [ ] Exact Ayala boarding/alighting location is documented or marked unavailable.

## Stop sequence

- [ ] Stop order is explicitly documented or observed.
- [ ] Complete stop list is available or marked unavailable.
- [ ] No stop sequence is inferred from proximity or geocoding.

## Forward direction

- [ ] Forward-direction service is supported.
- [ ] Source or observation is recorded.

## Reverse direction

- [ ] Reverse-direction service is supported by evidence.
- [ ] If unsupported, reverse direction remains undocumented.

## Route geometry

- [ ] Verified coordinate path or authoritative route map is available.
- [ ] If unavailable, `path` remains `null`.
- [ ] No straight-line geometry is invented.

## Fare

- [ ] Route-specific fare is supported by a reliable source.
- [ ] If unavailable, `estimatedFarePhp` remains `null`.

## Schedule

- [ ] Operating schedule is supported by a reliable source.
- [ ] If unavailable, schedule remains undocumented.

## Travel time

- [ ] Measured or documented route-specific travel time is available.
- [ ] If unavailable, `estimatedTravelTimeMinutes` remains `null`.

## Authorization / route-plan status

- [ ] Applicable LPTRP or authorization status is documented from a reliable source.
- [ ] If unavailable, route remains unverified.

## Verification decision

- [ ] `verified` remains `false` unless all required evidence is present.
- [ ] `verificationStatus` is `partially_verified` or `verified` as justified.
- [ ] Conflicting evidence is documented.
- [ ] Limitations are documented.
- [ ] `npm run validate:data` is run after any change.
- [ ] Changelog is updated.
