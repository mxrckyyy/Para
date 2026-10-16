export function isFiniteLatitude(value) {
  return (
    typeof value === 'number' && Number.isFinite(value) && value >= -90 && value <= 90
  )
}

export function isFiniteLongitude(value) {
  return (
    typeof value === 'number' && Number.isFinite(value) && value >= -180 && value <= 180
  )
}

export function isValidMapStop(stop) {
  return Boolean(
    stop &&
    typeof stop === 'object' &&
    typeof stop.id === 'string' &&
    stop.id.trim().length > 0 &&
    isFiniteLatitude(stop.lat) &&
    isFiniteLongitude(stop.lng),
  )
}

export function getValidMapStops(stops) {
  if (!Array.isArray(stops)) return []
  const uniqueStops = new Map()
  for (const stop of stops) {
    if (isValidMapStop(stop) && !uniqueStops.has(stop.id)) {
      uniqueStops.set(stop.id, stop)
    }
  }
  return [...uniqueStops.values()]
}

export function getJourneyStopIds(journey, originId, destinationId) {
  const stopIds = new Set()
  if (typeof originId === 'string' && originId) stopIds.add(originId)
  if (typeof destinationId === 'string' && destinationId) stopIds.add(destinationId)
  if (typeof journey?.transferStopId === 'string' && journey.transferStopId) {
    stopIds.add(journey.transferStopId)
  }
  return stopIds
}

export function getStopsById(stops) {
  const lookup = new Map()
  for (const stop of getValidMapStops(stops)) {
    lookup.set(stop.id, stop)
  }
  return lookup
}

export function hasValidRouteGeometry(routeOrGeometry) {
  const geometry = Array.isArray(routeOrGeometry)
    ? routeOrGeometry
    : (routeOrGeometry?.path ?? routeOrGeometry?.geometry ?? null)

  if (!Array.isArray(geometry) || geometry.length < 2) return false

  return geometry.every((point) => {
    if (!Array.isArray(point) || point.length !== 2) return false
    return isFiniteLatitude(point[0]) && isFiniteLongitude(point[1])
  })
}

export function getSupportedGeometryForRoutes(routeIds, routes) {
  if (!Array.isArray(routeIds) || !Array.isArray(routes)) return null
  const routeLookup = new Map(routes.map((route) => [route.id, route]))
  const geometries = routeIds
    .map((routeId) => routeLookup.get(routeId))
    .map((route) =>
      route && hasValidRouteGeometry(route) ? (route.path ?? route.geometry) : null,
    )
    .filter(Boolean)

  return geometries.length > 0 ? geometries : null
}

export function getMarkerType(stopId, relevantStopIds) {
  const id = typeof stopId === 'string' ? stopId : String(stopId)
  if (relevantStopIds?.originId === id) return 'origin'
  if (relevantStopIds?.destinationId === id) return 'destination'
  if (relevantStopIds?.transferIds?.includes(id)) return 'transfer'
  return 'listed'
}

export function getMapDefaultCenter(stops) {
  const validStops = getValidMapStops(stops)
  if (validStops.length === 0) return null
  const latitudes = validStops.map((stop) => stop.lat)
  const longitudes = validStops.map((stop) => stop.lng)
  return {
    lat: latitudes.reduce((sum, value) => sum + value, 0) / latitudes.length,
    lng: longitudes.reduce((sum, value) => sum + value, 0) / longitudes.length,
  }
}
