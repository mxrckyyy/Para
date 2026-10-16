export const ROUTE_ESTIMATE_DEFAULTS = Object.freeze({
  // Preliminary corpus is coordinate-only, so traversal is estimated from straight-line
  // stop-to-stop distances rather than measured road distances.
  averageSpeedKilometresPerHour: 15,
  // Small documented dwell assumption for intermediate stops on a real route.
  dwellMinutesPerIntermediateStop: 0.5,
  // Simple waiting/transfer assumption used for one-transfer journeys.
  transferWaitMinutes: 5,
  // Prefer direct journeys and keep an explicit cap for large result sets.
  maximumJourneyResults: 12,
})

export const ROUTE_DATASET_STATUS = 'preliminary-unverified'

export const ROUTE_JOURNEY_TYPES = Object.freeze({
  direct: 'direct',
  transfer: 'transfer',
})
