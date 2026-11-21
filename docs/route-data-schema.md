# Route Data Schema — Para

This document describes the schema used by Para's static route and stop data.

## File-level structure

### `src/data/stops.json`

```json
{
  "version": "1.0.0",
  "lastReviewed": null,
  "source": "Dataset-level source note",
  "stops": []
}
```

### `src/data/routes.json`

```json
{
  "version": "1.0.0",
  "lastReviewed": null,
  "source": "Dataset-level source note",
  "routes": []
}
```

## Stop record

Required fields:

- `id`: unique stable string identifier
- `name`: display name
- `lat`: finite number from -90 to 90
- `lng`: finite number from -180 to 180
- `aliases`: array of strings
- `source`: non-empty source reference
- `verified`: boolean
- `lastReviewed`: ISO date string or null

Optional fields:

- `notes`: string
- `sourceOrganization`: string
- `evidenceReference`: string
- `verificationStatus`: one of `unverified`, `partially_verified`, `verified`, `outdated`
- `verificationDate`: ISO date string or null
- `reviewedBy`: string

## Route record

Required fields:

- `id`: unique string identifier
- `code`: route code or display code
- `name`: display name
- `color`: hexadecimal color
- `stopIds`: array with at least two stop IDs
- `path`: null or array of `[latitude, longitude]` pairs
- `source`: non-empty source reference
- `verified`: boolean
- `lastReviewed`: ISO date string or null

Optional fields:

- `direction`: string or null
- `estimatedFarePhp`: number or null
- `estimatedTravelTimeMinutes`: number or null
- `aliases`: array of strings
- `notes`: string
- `sourceOrganization`: string
- `evidenceReference`: string
- `verificationStatus`: one of `unverified`, `partially_verified`, `verified`, `outdated`
- `verificationDate`: ISO date string or null
- `reviewedBy`: string

## Coordinate order

Stop coordinates use:

```json
{
  "lat": 10.318,
  "lng": 123.905
}
```

Route path coordinates use `[latitude, longitude]` pairs:

```json
[
  [10.3, 123.89],
  [10.31, 123.9]
]
```

This differs from GeoJSON's usual `[longitude, latitude]` order. If a future migration to GeoJSON is made, that change must be documented and all validators and map code updated together.

## Route geometry requirements

- Geometry is optional.
- Geometry must be an explicit `LineString`-equivalent array of coordinate pairs.
- Geometry must not be inferred from stop coordinates.
- Geometry must not be created merely because two stops share a route.
- Missing geometry is represented as `null`.
- The UI must not draw a route line when geometry is `null`.
- Geometry should only be marked verified when supported by field or authoritative evidence.

## Provenance model

The provenance model separates source discovery from verification.

Source discovery fields:

- `source`
- `sourceOrganization`
- `evidenceReference`

Verification fields:

- `verified`
- `verificationStatus`
- `verificationDate`
- `lastReviewed`
- `reviewedBy`
- `notes`

A record can be discovered from a source without being verified. Only records with documented evidence and review should be marked `verified: true` or `verificationStatus: "verified"`.

## Optional evidence record

Future route or stop records may include an optional `evidenceRecords` array. This is documentation metadata and does not make a record verified by itself.

Each evidence record may contain:

- `evidenceId`
- `relatedRecordId`
- `claimCategory`
- `sourceTitle`
- `sourceOrganization`
- `sourceType`
- `urlOrReference`
- `publicationDate`
- `dateReviewed`
- `claimSupported`
- `supportingDetails`
- `limitations`
- `confidence`
- `reviewStatus`

## Saved journey storage

Saved journeys store only reference data, not authoritative route facts.

Current key: `para_saved_routes`

Schema version: `1`

Each saved item contains:

- `schemaVersion`
- `originStopId`
- `destinationStopId`
- `routeIds`
- `transferStopId`
- `key`
- `savedAt`

Saved journeys are reconstructed from current route data before display. Stale or invalid items are ignored.

## Validation

`npm run validate:data` checks:

- duplicate stop IDs
- duplicate route IDs
- required fields
- latitude and longitude ranges
- hexadecimal route colors
- ISO date fields
- missing stop references
- routes with fewer than two stops
- invalid path coordinate pairs
- optional provenance field types
- consistency between `verified` and `verificationStatus`
