import { ROUTE_ESTIMATE_DEFAULTS } from './routeConstants.js'

const EARTH_RADIUS_METRES = 6371000

function toRadians(value) {
  return (value * Math.PI) / 180
}

function haversineDistanceMetres(lat1, lng1, lat2, lng2) {
  const phi1 = toRadians(lat1)
  const phi2 = toRadians(lat2)
  const deltaPhi = toRadians(lat2 - lat1)
  const deltaLambda = toRadians(lng2 - lng1)

  const haversine =
    Math.sin(deltaPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2

  return 2 * EARTH_RADIUS_METRES * Math.asin(Math.sqrt(haversine))
}

function normaliseStop(stop) {
  if (typeof stop === 'string') {
    return { id: stop, lat: null, lng: null }
  }

  if (!stop || typeof stop !== 'object') return null

  return {
    id: stop.id ?? null,
    lat: stop.lat ?? stop.latitude ?? null,
    lng: stop.lng ?? stop.longitude ?? null,
  }
}

function buildStopLookup(stops) {
  if (!stops) return new Map()
  if (stops instanceof Map) return new Map(stops)
  if (Array.isArray(stops)) {
    return new Map(
      stops.flatMap((stop) => {
        const normalised = normaliseStop(stop)
        return normalised?.id ? [[normalised.id, normalised]] : []
      }),
    )
  }
  if (typeof stops === 'object') {
    if (Array.isArray(stops.stops)) return buildStopLookup(stops.stops)
    return new Map(
      Object.entries(stops).map(([id, stop]) => [id, { id, ...normaliseStop(stop) }]),
    )
  }
  return new Map()
}

export function calculateRouteStopDistanceMetres(stopIds, stops) {
  const lookup = buildStopLookup(stops)
  if (!Array.isArray(stopIds) || stopIds.length < 2) return null

  let totalDistance = 0
  for (let index = 0; index < stopIds.length - 1; index += 1) {
    const firstId = stopIds[index]
    const secondId = stopIds[index + 1]
    const firstStop = lookup.get(firstId)
    const secondStop = lookup.get(secondId)

    if (!firstStop || !secondStop) return null
    if (!Number.isFinite(firstStop.lat) || !Number.isFinite(firstStop.lng)) return null
    if (!Number.isFinite(secondStop.lat) || !Number.isFinite(secondStop.lng)) return null

    totalDistance += haversineDistanceMetres(
      firstStop.lat,
      firstStop.lng,
      secondStop.lat,
      secondStop.lng,
    )
  }

  return Math.round(totalDistance)
}

export function estimateJourneyDurationMinutes(
  distanceMetres,
  transferCount = 0,
  options = {},
) {
  const config = { ...ROUTE_ESTIMATE_DEFAULTS, ...options }
  if (!Number.isFinite(distanceMetres) || distanceMetres < 0) return null
  if (
    !Number.isFinite(config.averageSpeedKilometresPerHour) ||
    config.averageSpeedKilometresPerHour <= 0
  ) {
    return null
  }

  const distanceKilometres = distanceMetres / 1000
  const travelMinutes = (distanceKilometres / config.averageSpeedKilometresPerHour) * 60
  const transferWaitMinutes = Math.max(0, transferCount) * config.transferWaitMinutes

  // This initial estimate has no dwell model beyond the documented transfer
  // wait. Intermediate-stop dwell is intentionally kept out of route-only
  // calculations so the engine does not present unsupported precision.
  const totalMinutes = travelMinutes + transferWaitMinutes

  if (totalMinutes === 0) return 0
  return Math.max(1, Math.round(totalMinutes))
}

export function estimateJourney(journey, stops = null, options = {}) {
  if (!journey || typeof journey !== 'object') return journey

  const config = { ...ROUTE_ESTIMATE_DEFAULTS, ...options }
  const transferCount = Number.isFinite(journey.transferCount) ? journey.transferCount : 0

  const existingDistance = Number.isFinite(journey.estimatedDistanceMetres)
    ? journey.estimatedDistanceMetres
    : null

  const calculatedDistance =
    existingDistance === null
      ? calculateRouteStopDistanceMetres(journey.estimatedRouteStopIds ?? [], stops)
      : existingDistance

  const durationMinutes = estimateJourneyDurationMinutes(
    calculatedDistance,
    transferCount,
    config,
  )

  return {
    ...journey,
    estimatedDistanceMetres: calculatedDistance,
    estimatedDurationMinutes: durationMinutes,
    estimatedFarePhp: null,
    estimatedFareRangePhp: null,
    estimateStatus: {
      distance: calculatedDistance === null ? 'unavailable' : 'estimate',
      duration: durationMinutes === null ? 'unavailable' : 'estimate',
      fare: 'unavailable',
    },
    estimateAssumptions: [
      'Straight-line distances between listed stop coordinates.',
      `Average speed of ${config.averageSpeedKilometresPerHour} km/h.`,
      `Transfer wait of ${config.transferWaitMinutes} minute(s) where one transfer is used.`,
    ],
    dataVerificationStatus: 'preliminary-unverified',
    fareStatusReason:
      'No fare information is present in the preliminary Phase 2 dataset.',
  }
}
