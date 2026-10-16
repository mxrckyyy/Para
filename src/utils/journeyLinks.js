function safeDecode(value) {
  if (typeof value !== 'string') return null
  try {
    return decodeURIComponent(value)
  } catch {
    return null
  }
}

function safeParseJson(value) {
  if (typeof value !== 'string') return null
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export function readSearchParameters(search = '') {
  const params = new URLSearchParams(search)
  return {
    from: safeDecode(params.get('from')),
    to: safeDecode(params.get('to')),
    journey: safeDecode(params.get('journey')),
    route: safeDecode(params.get('route')),
    transfer: safeDecode(params.get('transfer')),
  }
}

export function createResultsPath(fromId, toId) {
  const params = new URLSearchParams()
  params.set('from', fromId)
  params.set('to', toId)
  return `/results?${params.toString()}`
}

export function createJourneyToken(journey) {
  if (!journey || typeof journey !== 'object') return ''
  return JSON.stringify({
    type: journey.type,
    routes: Array.isArray(journey.routeIds) ? journey.routeIds : [],
    transfer: journey.transferStopId ?? null,
  })
}

export function encodeJourneyToken(journey) {
  return encodeURIComponent(createJourneyToken(journey))
}

export function decodeJourneyToken(value) {
  const decoded = safeDecode(value)
  const parsed = safeParseJson(decoded)
  if (!parsed || typeof parsed !== 'object') return null
  if (parsed.type !== 'direct' && parsed.type !== 'transfer') return null
  if (!Array.isArray(parsed.routes) || parsed.routes.length === 0) return null
  if (parsed.routes.some((route) => typeof route !== 'string')) return null
  if (parsed.transfer !== null && typeof parsed.transfer !== 'string') return null
  return parsed
}

export function journeyMatchesToken(journey, token) {
  if (!journey || !token) return false
  const candidateToken = createJourneyToken(journey)
  try {
    return candidateToken === JSON.stringify(token)
  } catch {
    return false
  }
}

export function formatDistanceMetres(value) {
  if (!Number.isFinite(value) || value < 0) return null
  if (value < 1000) return `${Math.round(value)} m`
  return `${(value / 1000).toFixed(1)} km`
}

export function safeStopName(stop) {
  return typeof stop?.name === 'string' && stop.name.trim() ? stop.name.trim() : null
}
