import { describe, expect, it } from 'vitest'

import {
  ROUTE_DATASET_STATUS,
  deduplicateJourneys,
  estimateJourney,
  estimateJourneyDurationMinutes,
  findDirectJourneys,
  findJourneys,
  findTransferJourneys,
  rankAndDeduplicateJourneys,
  rankJourneys,
} from './routeEngine.js'

const testStops = [
  { id: 'stop-origin', lat: 10, lng: 123 },
  { id: 'stop-midpoint', lat: 10.05, lng: 123.05 },
  { id: 'stop-transfer', lat: 10.1, lng: 123.1 },
  { id: 'stop-destination', lat: 10.2, lng: 123.2 },
  { id: 'stop-other', lat: 10.3, lng: 123.3 },
]

const directRoute = {
  id: 'route-direct',
  code: 'D1',
  stopIds: ['stop-origin', 'stop-midpoint', 'stop-destination'],
}

const reverseListedRoute = {
  id: 'route-reverse-listed',
  code: 'R1',
  direction: 'reverse',
  // Listed in the reverse direction; the orientation helper changes it to the usable direction.
  stopIds: ['stop-destination', 'stop-origin'],
}

const bidirectionalRoute = {
  id: 'route-bidirectional',
  code: 'B1',
  direction: 'bidirectional',
  stopIds: ['stop-origin', 'stop-destination'],
}

const transferFirstRoute = {
  id: 'route-first',
  code: 'T1',
  stopIds: ['stop-origin', 'stop-transfer'],
}

const transferSecondRoute = {
  id: 'route-second',
  code: 'T2',
  stopIds: ['stop-transfer', 'stop-destination'],
}

const duplicateTransferRoute = {
  id: 'route-duplicate-transfer',
  code: 'T3',
  stopIds: ['stop-origin', 'stop-transfer', 'stop-destination'],
}

const invalidTransferRoute = {
  id: 'route-invalid-transfer',
  code: 'T4',
  stopIds: ['stop-transfer', 'stop-origin'],
}

const unrelatedRoute = {
  id: 'route-unrelated',
  code: 'U1',
  stopIds: ['stop-other'],
}

describe('direct route discovery', () => {
  it('finds a valid direct journey in stop order', () => {
    const journeys = findDirectJourneys('stop-origin', 'stop-destination', {
      routes: [directRoute],
      stops: testStops,
    })

    expect(journeys).toHaveLength(1)
    expect(journeys[0]).toMatchObject({
      type: 'direct',
      originStopId: 'stop-origin',
      destinationStopId: 'stop-destination',
      routeIds: ['route-direct'],
      transferStopId: null,
      transferCount: 0,
    })
    expect(Number.isFinite(journeys[0].estimatedDistanceMetres)).toBe(true)
    expect(Number.isFinite(journeys[0].estimatedDurationMinutes)).toBe(true)
  })

  it('does not return a route when the stops are in reverse order', () => {
    const journeys = findDirectJourneys('stop-origin', 'stop-destination', {
      routes: [
        {
          id: 'route-reverse-only',
          code: 'R2',
          stopIds: ['stop-destination', 'stop-origin'],
        },
      ],
    })

    expect(journeys).toEqual([])
  })

  it('returns an empty result when the origin and destination are identical', () => {
    expect(
      findDirectJourneys('stop-origin', 'stop-origin', { routes: [directRoute] }),
    ).toEqual([])
  })

  it('returns an empty result for unknown stop IDs', () => {
    expect(
      findDirectJourneys('missing-origin', 'stop-destination', { routes: [directRoute] }),
    ).toEqual([])
    expect(
      findDirectJourneys('stop-origin', 'missing-destination', { routes: [directRoute] }),
    ).toEqual([])
  })

  it('returns no direct journey when a route merely shares a stop', () => {
    const journeys = findDirectJourneys('stop-origin', 'stop-other', {
      routes: [unrelatedRoute, directRoute],
    })
    expect(journeys).toEqual([])
  })

  it('handles an explicitly reversed route direction', () => {
    const journeys = findDirectJourneys('stop-origin', 'stop-destination', {
      routes: [reverseListedRoute],
      stops: testStops,
    })

    expect(journeys).toHaveLength(1)
    expect(journeys[0].routeIds).toEqual(['route-reverse-listed'])
  })

  it('handles an explicitly bidirectional route direction in both supported orientations', () => {
    const forward = findDirectJourneys('stop-origin', 'stop-destination', {
      routes: [bidirectionalRoute],
    })
    const reverse = findDirectJourneys('stop-destination', 'stop-origin', {
      routes: [bidirectionalRoute],
    })

    expect(forward).toHaveLength(1)
    expect(reverse).toHaveLength(1)
  })

  it('does not modify input data', () => {
    const route = {
      id: 'route-freeze',
      code: 'F1',
      stopIds: ['stop-origin', 'stop-destination'],
    }
    const routeInput = [route]
    const original = structuredClone(routeInput)

    findDirectJourneys('stop-origin', 'stop-destination', { routes: routeInput })

    expect(routeInput).toEqual(original)
    expect(route.stopIds).toEqual(['stop-origin', 'stop-destination'])
  })
})

describe('one-transfer route discovery', () => {
  const transferRoutes = [transferFirstRoute, transferSecondRoute]

  it('finds a valid one-transfer journey', () => {
    const journeys = findTransferJourneys('stop-origin', 'stop-destination', {
      routes: transferRoutes,
      stops: testStops,
    })

    expect(journeys).toHaveLength(1)
    expect(journeys[0]).toMatchObject({
      type: 'transfer',
      originStopId: 'stop-origin',
      destinationStopId: 'stop-destination',
      routeIds: ['route-first', 'route-second'],
      transferStopId: 'stop-transfer',
      transferCount: 1,
    })
  })

  it('does not return a transfer when routes do not share a valid transfer sequence', () => {
    const journeys = findTransferJourneys('stop-origin', 'stop-destination', {
      routes: [transferFirstRoute, invalidTransferRoute],
    })

    expect(journeys).toEqual([])
  })

  it('does not count the same route as a transfer route', () => {
    const journeys = findTransferJourneys('stop-origin', 'stop-destination', {
      routes: [duplicateTransferRoute],
    })

    expect(journeys).toEqual([])
  })

  it('returns no transfer when an intermediate connection is missing', () => {
    const journeys = findTransferJourneys('stop-origin', 'stop-destination', {
      routes: [unrelatedRoute, transferSecondRoute],
    })

    expect(journeys).toEqual([])
  })

  it('supports both move-journey and journey combinations represented by route sets', () => {
    const journeys = findJourneys({
      originStopId: 'stop-origin',
      destinationStopId: 'stop-destination',
      routeData: {
        routes: [transferFirstRoute, transferSecondRoute, duplicateTransferRoute],
        stops: testStops,
      },
    })

    // Three transfer combinations plus the direct route contained in the duplicate route.
    expect(journeys).toHaveLength(4)
    expect(journeys.filter((journey) => journey.type === 'transfer')).toHaveLength(3)
  })
})

describe('deduplication, ranking, and estimates', () => {
  it('removes duplicate journeys while keeping distinct transfer stops', () => {
    const duplicated = [
      {
        originStopId: 'stop-origin',
        destinationStopId: 'stop-destination',
        type: 'direct',
        routeIds: ['route-direct'],
        transferStopId: null,
        transferCount: 0,
        estimatedDurationMinutes: 10,
        estimatedFarePhp: null,
      },
      {
        originStopId: 'stop-origin',
        destinationStopId: 'stop-destination',
        type: 'direct',
        routeIds: ['route-direct'],
        transferStopId: null,
        transferCount: 0,
        estimatedDurationMinutes: 12,
        estimatedFarePhp: null,
      },
    ]

    const result = deduplicateJourneys(duplicated)
    expect(result).toHaveLength(1)
    expect(result[0].estimatedDurationMinutes).toBe(10)
  })

  it('orders direct journeys before transfer journeys and shortest estimates first', () => {
    const direct = findDirectJourneys('stop-origin', 'stop-destination', {
      routes: [directRoute],
      stops: testStops,
    })[0]
    const transfer = findTransferJourneys('stop-origin', 'stop-destination', {
      routes: [transferFirstRoute, transferSecondRoute],
      stops: testStops,
    })[0]

    const ranked = rankJourneys([
      { ...transfer, estimatedDurationMinutes: 5 },
      { ...direct, estimatedDurationMinutes: 20 },
    ])

    expect(ranked[0]).toMatchObject({ type: 'direct' })
  })

  it('uses a stable route-ID tie breaker when comparable values are equal', () => {
    const ranked = rankJourneys([
      {
        originStopId: 'a',
        destinationStopId: 'b',
        type: 'direct',
        routeIds: ['route-z'],
        transferStopId: null,
        transferCount: 0,
        estimatedDurationMinutes: 10,
        estimatedFarePhp: null,
      },
      {
        originStopId: 'a',
        destinationStopId: 'b',
        type: 'direct',
        routeIds: ['route-a'],
        transferStopId: null,
        transferCount: 0,
        estimatedDurationMinutes: 10,
        estimatedFarePhp: null,
      },
    ])

    expect(ranked[0].routeIds).toEqual(['route-a'])
    expect(ranked[1].routeIds).toEqual(['route-z'])
  })

  it('keeps journeys with unavailable duration estimates after those with usable estimates', () => {
    const ranked = rankJourneys([
      {
        originStopId: 'a',
        destinationStopId: 'b',
        type: 'direct',
        routeIds: ['route-no-time'],
        transferStopId: null,
        transferCount: 0,
        estimatedDurationMinutes: null,
        estimatedFarePhp: null,
      },
      {
        originStopId: 'a',
        destinationStopId: 'b',
        type: 'direct',
        routeIds: ['route-with-time'],
        transferStopId: null,
        transferCount: 0,
        estimatedDurationMinutes: 12,
        estimatedFarePhp: null,
      },
    ])

    expect(ranked[0].routeIds).toEqual(['route-with-time'])
    expect(ranked[1].routeIds).toEqual(['route-no-time'])
  })

  it('combines deduplication and ranking without reordering equal components', () => {
    const result = rankAndDeduplicateJourneys([
      {
        originStopId: 'a',
        destinationStopId: 'b',
        type: 'direct',
        routeIds: ['route-beta'],
        transferStopId: null,
        transferCount: 0,
        estimatedDurationMinutes: 8,
        estimatedFarePhp: null,
      },
      {
        originStopId: 'a',
        destinationStopId: 'b',
        type: 'direct',
        routeIds: ['route-alpha'],
        transferStopId: null,
        transferCount: 0,
        estimatedDurationMinutes: 8,
        estimatedFarePhp: null,
      },
      {
        originStopId: 'a',
        destinationStopId: 'b',
        type: 'transfer',
        routeIds: ['route-transfer'],
        transferStopId: 'stop-transfer',
        transferCount: 1,
        estimatedDurationMinutes: 4,
        estimatedFarePhp: null,
      },
    ])

    expect(result[0].routeIds).toEqual(['route-alpha'])
    expect(result[1].routeIds).toEqual(['route-beta'])
    expect(result[2]).toMatchObject({ type: 'transfer' })
  })

  it('keeps fare unavailable because the preliminary dataset has no fare data', () => {
    const journey = findDirectJourneys('stop-origin', 'stop-destination', {
      routes: [directRoute],
      stops: testStops,
    })[0]

    expect(journey.estimatedFarePhp).toBeNull()
    expect(journey.estimatedFareRangePhp).toBeNull()
    expect(journey.estimateStatus.fare).toBe('unavailable')
    expect(journey.fareStatusReason).toContain('No fare information')
  })

  it('reports the preliminary dataset status on every journey', () => {
    const journey = findDirectJourneys('stop-origin', 'stop-destination', {
      routes: [directRoute],
      stops: testStops,
    })[0]

    expect(journey.dataVerificationStatus).toBe(ROUTE_DATASET_STATUS)
  })

  it('implements a duration estimate from documented distance assumptions', () => {
    const duration = estimateJourneyDurationMinutes(10000, 0, {
      averageSpeedKilometresPerHour: 10,
    })

    expect(duration).toBe(60)
    expect(estimateJourney({ transferCount: 0 }, null, {})).toMatchObject({
      estimatedFarePhp: null,
    })
  })
})
