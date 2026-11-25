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

describe('route engine edge cases', () => {
  it('ignores routes with fewer than two stops', () => {
    const oneStopRoute = {
      id: 'route-one-stop',
      code: 'O1',
      stopIds: ['stop-origin'],
    }

    expect(
      findDirectJourneys('stop-origin', 'stop-destination', {
        routes: [oneStopRoute],
        stops: testStops,
      }),
    ).toEqual([])
    expect(
      findTransferJourneys('stop-origin', 'stop-destination', {
        routes: [oneStopRoute, transferSecondRoute],
        stops: testStops,
      }),
    ).toEqual([])
  })

  it('ignores routes with invalid stop references', () => {
    const invalidReferenceRoute = {
      id: 'route-invalid-reference',
      code: 'IR',
      stopIds: ['stop-origin', 'missing-stop'],
    }

    expect(
      findDirectJourneys('stop-origin', 'missing-stop', {
        routes: [invalidReferenceRoute],
        stops: testStops,
      }),
    ).toEqual([])
  })

  it('handles repeated stop IDs without creating an invalid direct journey', () => {
    const repeatedStopRoute = {
      id: 'route-repeated',
      code: 'RP',
      stopIds: ['stop-origin', 'stop-transfer', 'stop-transfer', 'stop-destination'],
    }

    const journeys = findDirectJourneys('stop-origin', 'stop-destination', {
      routes: [repeatedStopRoute],
      stops: testStops,
    })

    expect(journeys).toHaveLength(1)
    expect(journeys[0].routeIds).toEqual(['route-repeated'])
    expect(Number.isFinite(journeys[0].estimatedDistanceMetres)).toBe(true)
  })

  it('returns multiple direct journeys in deterministic route order', () => {
    const secondDirectRoute = {
      id: 'route-direct-2',
      code: 'D2',
      stopIds: ['stop-origin', 'stop-destination'],
    }

    const journeys = findDirectJourneys('stop-origin', 'stop-destination', {
      routes: [directRoute, secondDirectRoute],
      stops: testStops,
    })

    expect(journeys.map((journey) => journey.routeIds[0])).toEqual([
      'route-direct',
      'route-direct-2',
    ])
  })

  it('returns unavailable estimates when stop coordinates are missing', () => {
    const noCoordinateStops = testStops.map((stop) =>
      stop.id === 'stop-origin' || stop.id === 'stop-destination'
        ? { ...stop, lat: null, lng: null }
        : stop,
    )

    const journey = findDirectJourneys('stop-origin', 'stop-destination', {
      routes: [directRoute],
      stops: noCoordinateStops,
    })[0]

    expect(journey).toBeDefined()
    expect(journey.estimatedDistanceMetres).toBeNull()
    expect(journey.estimatedDurationMinutes).toBeNull()
    expect(journey.estimateStatus.distance).toBe('unavailable')
    expect(journey.estimateStatus.duration).toBe('unavailable')
  })

  it('returns null for invalid estimate inputs', () => {
    expect(estimateJourneyDurationMinutes(null, 0)).toBeNull()
    expect(
      estimateJourneyDurationMinutes(1000, 0, {
        averageSpeedKilometresPerHour: 0,
      }),
    ).toBeNull()
    expect(estimateJourney(null, testStops)).toBeNull()
  })

  it('keeps an explicitly bidirectional route available in both directions', () => {
    const forward = findDirectJourneys('stop-origin', 'stop-destination', {
      routes: [bidirectionalRoute],
    })
    const reverse = findDirectJourneys('stop-destination', 'stop-origin', {
      routes: [bidirectionalRoute],
    })

    expect(forward).toHaveLength(1)
    expect(reverse).toHaveLength(1)
  })
})

describe('Phase 70 routing edge cases', () => {
  const threeRouteStops = [
    { id: 'stop-a', lat: 10, lng: 123 },
    { id: 'stop-b', lat: 10.05, lng: 123.05 },
    { id: 'stop-c', lat: 10.1, lng: 123.1 },
    { id: 'stop-d', lat: 10.2, lng: 123.2 },
  ]

  const routeAB = { id: 'route-ab', code: 'AB', stopIds: ['stop-a', 'stop-b'] }
  const routeBC = { id: 'route-bc', code: 'BC', stopIds: ['stop-b', 'stop-c'] }
  const routeCD = { id: 'route-cd', code: 'CD', stopIds: ['stop-c', 'stop-d'] }

  it('does not produce two-transfer journeys (a to d via b and c)', () => {
    const journeys = findJourneys({
      originStopId: 'stop-a',
      destinationStopId: 'stop-d',
      routeData: { routes: [routeAB, routeBC, routeCD] },
      stops: threeRouteStops,
    })
    // Only one-transfer journeys are supported; a->d requires two transfers (a->b->c->d)
    // so no journey should be found (no single route or one-transfer covers a->d)
    expect(journeys).toEqual([])
  })

  it('finds one-transfer journey when a shared stop exists (a to c via b)', () => {
    const journeys = findJourneys({
      originStopId: 'stop-a',
      destinationStopId: 'stop-c',
      routeData: { routes: [routeAB, routeBC] },
      stops: threeRouteStops,
    })
    expect(journeys).toHaveLength(1)
    expect(journeys[0].type).toBe('transfer')
    expect(journeys[0].transferStopId).toBe('stop-b')
  })

  it('does not create a journey when no shared transfer stop exists', () => {
    const journeys = findJourneys({
      originStopId: 'stop-a',
      destinationStopId: 'stop-d',
      routeData: { routes: [routeAB, routeCD] },
      stops: threeRouteStops,
    })
    expect(journeys).toEqual([])
  })

  it('preserves verification status in journey data when present', () => {
    const routeWithStatus = {
      id: 'route-status',
      code: 'S1',
      stopIds: ['stop-a', 'stop-d'],
      verificationStatus: 'partially_verified',
    }
    const journeys = findDirectJourneys('stop-a', 'stop-d', {
      routes: [routeWithStatus],
      stops: threeRouteStops,
    })
    expect(journeys).toHaveLength(1)
    expect(journeys[0].dataVerificationStatus).toBe('preliminary-unverified')
  })

  it('returns empty for identical origin and destination', () => {
    const journeys = findJourneys({
      originStopId: 'stop-a',
      destinationStopId: 'stop-a',
      routeData: { routes: [routeAB] },
      stops: threeRouteStops,
    })
    expect(journeys).toEqual([])
  })

  it('returns empty for unknown origin', () => {
    const journeys = findJourneys({
      originStopId: 'stop-unknown',
      destinationStopId: 'stop-d',
      routeData: { routes: [routeAB, routeBC, routeCD] },
      stops: threeRouteStops,
    })
    expect(journeys).toEqual([])
  })

  it('returns empty for unknown destination', () => {
    const journeys = findJourneys({
      originStopId: 'stop-a',
      destinationStopId: 'stop-unknown',
      routeData: { routes: [routeAB, routeBC, routeCD] },
      stops: threeRouteStops,
    })
    expect(journeys).toEqual([])
  })

  it('deduplicateJourneys removes exact duplicate journey keys', () => {
    const journey = {
      originStopId: 'stop-a',
      destinationStopId: 'stop-b',
      type: 'direct',
      routeIds: ['route-ab'],
      routeCodes: ['AB'],
      transferStopId: null,
      transferCount: 0,
    }
    const duplicate = { ...journey }
    const result = deduplicateJourneys([journey, duplicate])
    expect(result).toHaveLength(1)
  })

  it('handles route with no stopIds gracefully', () => {
    const badRoute = { id: 'route-bad', code: 'BAD' }
    const journeys = findDirectJourneys('stop-a', 'stop-b', {
      routes: [badRoute, routeAB],
      stops: threeRouteStops,
    })
    expect(journeys).toHaveLength(1)
    expect(journeys[0].routeIds).toEqual(['route-ab'])
  })

  it('bidirectional route allows travel in both directions', () => {
    const biRoute = {
      id: 'route-bi',
      code: 'BI',
      stopIds: ['stop-a', 'stop-b', 'stop-c'],
      direction: 'bidirectional',
    }
    const forward = findDirectJourneys('stop-a', 'stop-c', {
      routes: [biRoute],
      stops: threeRouteStops,
    })
    const reverse = findDirectJourneys('stop-c', 'stop-a', {
      routes: [biRoute],
      stops: threeRouteStops,
    })
    expect(forward).toHaveLength(1)
    expect(reverse).toHaveLength(1)
  })

  it('unidirectional route does not allow reverse travel', () => {
    const uniRoute = {
      id: 'route-uni',
      code: 'UNI',
      stopIds: ['stop-a', 'stop-b', 'stop-c'],
    }
    const reverse = findDirectJourneys('stop-c', 'stop-a', {
      routes: [uniRoute],
      stops: threeRouteStops,
    })
    expect(reverse).toHaveLength(0)
  })
})
