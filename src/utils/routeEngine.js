import {
  ROUTE_DATASET_STATUS,
  ROUTE_ESTIMATE_DEFAULTS,
  ROUTE_JOURNEY_TYPES,
} from './routeConstants.js'
import { estimateJourney } from './routeEstimates.js'

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function asStringId(value) {
  if (value === null || value === undefined) return null
  const result = String(value).trim()
  return result.length > 0 ? result : null
}

function normaliseStopLookup(stopInput) {
  if (!stopInput) return new Map()

  if (stopInput instanceof Map) {
    return new Map(stopInput)
  }

  if (Array.isArray(stopInput)) {
    return stopInput.reduce((lookup, stop, index) => {
      if (!stop || typeof stop !== 'object') return lookup
      const id = asStringId(stop.id ?? stop.stopId ?? stop.value ?? index)
      if (id) lookup.set(id, stop)
      return lookup
    }, new Map())
  }

  if (typeof stopInput === 'object') {
    if (Array.isArray(stopInput.stops)) return normaliseStopLookup(stopInput.stops)
    if (Array.isArray(stopInput.data)) return normaliseStopLookup(stopInput.data)
    if (stopInput.stops && typeof stopInput.stops === 'object') {
      return normaliseStopLookup(stopInput.stops)
    }

    return Object.entries(stopInput).reduce((lookup, [key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const id = asStringId(value.id ?? key)
        if (id) lookup.set(id, value)
      }
      return lookup
    }, new Map())
  }

  return new Map()
}

function normaliseRouteInput(routeInput) {
  if (Array.isArray(routeInput)) {
    return [...routeInput].filter(
      (route) => route && typeof route === 'object' && !Array.isArray(route),
    )
  }

  if (routeInput && typeof routeInput === 'object') {
    if (Array.isArray(routeInput.routes)) return normaliseRouteInput(routeInput.routes)
    if (Array.isArray(routeInput.data)) return normaliseRouteInput(routeInput.data)
    if (
      routeInput.routes &&
      typeof routeInput.routes === 'object' &&
      !Array.isArray(routeInput.routes)
    ) {
      return normaliseRouteInput(Object.values(routeInput.routes))
    }
  }

  return []
}

function resolveRequest(routeInput, context) {
  if (
    routeInput &&
    typeof routeInput === 'object' &&
    !Array.isArray(routeInput) &&
    routeInput.routes
  ) {
    return {
      routes: normaliseRouteInput(routeInput),
      stops: normaliseStopLookup(
        context?.stops ?? routeInput.stops ?? routeInput.stopData ?? null,
      ),
      estimateOptions: context?.estimateOptions ?? context?.estimateConfig ?? {},
    }
  }

  return {
    routes: normaliseRouteInput(routeInput),
    stops: normaliseStopLookup(context?.stops ?? context?.stopData ?? null),
    estimateOptions: context?.estimateOptions ?? context?.estimateConfig ?? {},
  }
}

function getRouteId(route, index) {
  return asStringId(route?.id) ?? `route-${index + 1}`
}

function getRouteCode(route) {
  const code = route?.code ?? route?.routeCode ?? route?.number ?? null
  return isNonEmptyString(code) ? code : null
}

function getStopSequence(route) {
  const candidates = [route?.stopIds, route?.stops, route?.stopSequence, route?.sequence]
  const sequence = candidates.find(Array.isArray)
  if (!sequence) return []

  return sequence.map((stopId) => asStringId(stopId)).filter(Boolean)
}

function getRouteDirections(route) {
  const sequence = getStopSequence(route)
  if (sequence.length === 0) return []

  const directions = new Set()

  let direction =
    route?.direction ?? route?.directionType ?? route?.routeDirection ?? null

  if (typeof direction === 'string') direction = direction.trim().toLowerCase()

  if (direction === 'reverse' || direction === 'backward' || direction === 'descending') {
    directions.add(sequence.join('\u0000').split('\u0000').reverse().join('\u0000'))
  } else if (
    direction === 'bidirectional' ||
    direction === 'both' ||
    direction === 'either' ||
    route?.bidirectional === true
  ) {
    directions.add(sequence.join('\u0000'))
    directions.add(sequence.join('\u0000').split('\u0000').reverse().join('\u0000'))
  } else {
    // Without explicit direction information we only use the order present
    // in the data. We never assume that the opposite sequence exists.
    directions.add(sequence.join('\u0000'))
  }

  return [...directions]
    .map((item) => item.split('\u0000'))
    .filter((item) => item.length > 0)
}

function firstIndexAfter(sequence, value, afterIndex = -1) {
  return sequence.findIndex((stopId, index) => index > afterIndex && stopId === value)
}

function makeDirectJourney(
  route,
  orientation,
  routeId,
  originStopId,
  destinationStopId,
  stops,
  estimateOptions,
) {
  const originIndex = orientation.findIndex((stopId) => stopId === originStopId)
  const destinationIndex = firstIndexAfter(orientation, destinationStopId, originIndex)

  if (originIndex < 0 || destinationIndex < 0) return null

  const travelStopIds = orientation.slice(originIndex, destinationIndex + 1)
  const baseJourney = {
    originStopId,
    destinationStopId,
    type: ROUTE_JOURNEY_TYPES.direct,
    routeIds: [routeId],
    routeCodes: [getRouteCode(route)].filter(Boolean),
    transferStopId: null,
    transferCount: 0,
    traversedStopIds: travelStopIds,
    estimatedRouteStopIds: travelStopIds,
    dataVerificationStatus: ROUTE_DATASET_STATUS,
    dataStatusNote:
      'Preliminary and unverified route geometry is not available; travel duration is estimated from stop coordinates when available.',
  }

  return estimateJourney(baseJourney, stops, {
    ...ROUTE_ESTIMATE_DEFAULTS,
    ...estimateOptions,
  })
}

function makeTransferJourney(
  firstRoute,
  secondRoute,
  firstRouteId,
  secondRouteId,
  firstOrientation,
  secondOrientation,
  originStopId,
  destinationStopId,
  transferStopId,
  transferIndexInFirst,
  transferIndexInSecond,
  destinationIndexInSecond,
  stops,
  estimateOptions,
) {
  const firstTravelStopIds = firstOrientation.slice(
    firstOrientation.findIndex((stopId) => stopId === originStopId),
    transferIndexInFirst + 1,
  )
  const secondTravelStopIds = secondOrientation.slice(
    transferIndexInSecond,
    destinationIndexInSecond + 1,
  )

  const baseJourney = {
    originStopId,
    destinationStopId,
    type: ROUTE_JOURNEY_TYPES.transfer,
    routeIds: [firstRouteId, secondRouteId],
    routeCodes: [getRouteCode(firstRoute), getRouteCode(secondRoute)].filter(Boolean),
    transferStopId,
    transferCount: 1,
    traversedStopIds: [...new Set([...firstTravelStopIds, ...secondTravelStopIds])],
    estimatedRouteStopIds: [...firstTravelStopIds, ...secondTravelStopIds.slice(1)],
    dataVerificationStatus: ROUTE_DATASET_STATUS,
    dataStatusNote:
      'Preliminary and unverified route geometry is not available; travel duration is estimated from stop coordinates when available.',
  }

  return estimateJourney(baseJourney, stops, {
    ...ROUTE_ESTIMATE_DEFAULTS,
    ...estimateOptions,
  })
}

function buildDirectJourneyKey(journey) {
  return `direct|${journey.originStopId}|${journey.destinationStopId}|${journey.routeIds.join('+')}`
}

function buildTransferJourneyKey(journey) {
  return `transfer|${journey.originStopId}|${journey.destinationStopId}|${journey.routeIds.join('+')}|${journey.transferStopId}`
}

function compareJourneys(first, second) {
  const typeRank = { direct: 0, transfer: 1 }
  const firstType = typeRank[first.type] ?? 2
  const secondType = typeRank[second.type] ?? 2
  if (firstType !== secondType) return firstType - secondType

  const firstHasDuration = Number.isFinite(first.estimatedDurationMinutes)
  const secondHasDuration = Number.isFinite(second.estimatedDurationMinutes)
  if (firstHasDuration !== secondHasDuration) return firstHasDuration ? -1 : 1
  if (
    firstHasDuration &&
    secondHasDuration &&
    first.estimatedDurationMinutes !== second.estimatedDurationMinutes
  ) {
    return first.estimatedDurationMinutes - second.estimatedDurationMinutes
  }

  if ((first.transferCount ?? 0) !== (second.transferCount ?? 0)) {
    return (first.transferCount ?? 0) - (second.transferCount ?? 0)
  }

  const firstRoutes = (first.routeIds ?? []).map(String).join('|')
  const secondRoutes = (second.routeIds ?? []).map(String).join('|')
  if (firstRoutes !== secondRoutes) return firstRoutes < secondRoutes ? -1 : 1

  const firstTransfer = String(first.transferStopId ?? '')
  const secondTransfer = String(second.transferStopId ?? '')
  if (firstTransfer !== secondTransfer) return firstTransfer < secondTransfer ? -1 : 1

  return 0
}

export function findDirectJourneys(
  originStopId,
  destinationStopId,
  routeInput,
  context = {},
) {
  const request = resolveRequest(routeInput, {
    stops: context?.stops ?? context?.stopData ?? null,
    estimateOptions: context?.estimateOptions ?? context?.estimateConfig ?? {},
  })

  const originId = asStringId(originStopId)
  const destinationId = asStringId(destinationStopId)

  if (!originId || !destinationId || originId === destinationId) return []

  const journeys = new Map()

  request.routes.forEach((route, routeIndex) => {
    const routeId = getRouteId(route, routeIndex)

    for (const orientation of getRouteDirections(route)) {
      const originIndex = orientation.findIndex((stopId) => stopId === originId)
      if (originIndex < 0) continue

      const destinationIndex = firstIndexAfter(orientation, destinationId, originIndex)
      if (destinationIndex < 0) continue

      const journey = makeDirectJourney(
        route,
        orientation,
        routeId,
        originId,
        destinationId,
        request.stops,
        request.estimateOptions,
      )

      if (!journey) continue

      const key = buildDirectJourneyKey(journey)
      if (!journeys.has(key)) journeys.set(key, journey)
    }
  })

  return [...journeys.values()]
}

export function findTransferJourneys(
  originStopId,
  destinationStopId,
  routeInput,
  context = {},
) {
  const request = resolveRequest(routeInput, {
    stops: context?.stops ?? context?.stopData ?? null,
    estimateOptions: context?.estimateOptions ?? context?.estimateConfig ?? {},
  })

  const originId = asStringId(originStopId)
  const destinationId = asStringId(destinationStopId)

  if (!originId || !destinationId || originId === destinationId) return []

  const routes = request.routes.map((route, index) => ({
    route,
    routeId: getRouteId(route, index),
  }))

  const journeys = new Map()

  for (let firstIndex = 0; firstIndex < routes.length; firstIndex += 1) {
    for (let secondIndex = 0; secondIndex < routes.length; secondIndex += 1) {
      if (firstIndex === secondIndex) continue

      const firstEntry = routes[firstIndex]
      const secondEntry = routes[secondIndex]
      if (firstEntry.routeId === secondEntry.routeId) continue

      for (const firstOrientation of getRouteDirections(firstEntry.route)) {
        const originIndexInFirst = firstOrientation.findIndex(
          (stopId) => stopId === originId,
        )
        if (originIndexInFirst < 0) continue

        for (const secondOrientation of getRouteDirections(secondEntry.route)) {
          const destinationIndexInSecond = secondOrientation.reduce(
            (found, stopId, index) => {
              return stopId === destinationId && index > found ? index : found
            },
            -1,
          )

          if (destinationIndexInSecond < 0) continue

          const candidateTransferIds = new Set(
            firstOrientation
              .slice(originIndexInFirst + 1)
              .filter((stopId) => stopId !== destinationId),
          )

          for (const transferStopId of candidateTransferIds) {
            const transferIndexInFirst = firstOrientation.findIndex(
              (stopId, index) => index > originIndexInFirst && stopId === transferStopId,
            )
            const transferIndexInSecond = secondOrientation.findIndex(
              (stopId, index) =>
                index < destinationIndexInSecond && stopId === transferStopId,
            )

            if (transferIndexInFirst < 0 || transferIndexInSecond < 0) continue
            if (transferStopId === originId) continue

            const journey = makeTransferJourney(
              firstEntry.route,
              secondEntry.route,
              firstEntry.routeId,
              secondEntry.routeId,
              firstOrientation,
              secondOrientation,
              originId,
              destinationId,
              transferStopId,
              transferIndexInFirst,
              transferIndexInSecond,
              destinationIndexInSecond,
              request.stops,
              request.estimateOptions,
            )

            if (!journey) continue

            const key = buildTransferJourneyKey(journey)
            if (!journeys.has(key)) journeys.set(key, journey)
          }
        }
      }
    }
  }

  return [...journeys.values()]
}

export function deduplicateJourneys(journeys) {
  if (!Array.isArray(journeys)) return []
  const unique = new Map()

  for (const journey of journeys) {
    if (!journey || typeof journey !== 'object') continue

    const key =
      journey.type === ROUTE_JOURNEY_TYPES.transfer
        ? buildTransferJourneyKey(journey)
        : buildDirectJourneyKey(journey)

    if (!unique.has(key)) unique.set(key, { ...journey })
  }

  return [...unique.values()]
}

export function rankJourneys(journeys) {
  if (!Array.isArray(journeys)) return []
  return [...journeys].sort(compareJourneys)
}

export function rankAndDeduplicateJourneys(journeys) {
  return rankJourneys(deduplicateJourneys(journeys))
}

export function findJourneys(options = {}) {
  const originStopId = options.originStopId ?? options.origin ?? options.from
  const destinationStopId = options.destinationStopId ?? options.destination ?? options.to
  const routeInput = options.routeData ?? options.routes ?? options.routeDataset ?? []
  const stops = options.stops ?? options.stopData ?? null

  const direct = findDirectJourneys(originStopId, destinationStopId, routeInput, {
    stops,
    estimateOptions: options.estimateOptions ?? {},
  })
  const transfers = findTransferJourneys(originStopId, destinationStopId, routeInput, {
    stops,
    estimateOptions: options.estimateOptions ?? {},
  })

  return rankAndDeduplicateJourneys([...direct, ...transfers])
}

export { ROUTE_DATASET_STATUS, ROUTE_ESTIMATE_DEFAULTS } from './routeConstants.js'
export {
  calculateRouteStopDistanceMetres,
  estimateJourney,
  estimateJourneyDurationMinutes,
} from './routeEstimates.js'
