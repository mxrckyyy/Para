// Mean radius of the Earth in metres.
const EARTH_RADIUS_METRES = 6371000

function toRadians(value) {
  return (value * Math.PI) / 180
}

export function haversineDistanceMeters(lat1, lng1, lat2, lng2) {
  const latitude1 = toRadians(lat1)
  const latitude2 = toRadians(lat2)
  const latitudeDifference = toRadians(lat2 - lat1)
  const longitudeDifference = toRadians(lng2 - lng1)

  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(latitude1) * Math.cos(latitude2) * Math.sin(longitudeDifference / 2) ** 2

  return 2 * EARTH_RADIUS_METRES * Math.asin(Math.sqrt(haversine))
}

export function formatDistanceMeters(distance) {
  if (!Number.isFinite(distance) || distance < 0) return 'Unknown distance'
  if (distance < 1000) return `${Math.round(distance)} m`
  return `${(distance / 1000).toFixed(1)} km`
}
