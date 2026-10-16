import { describe, expect, it } from 'vitest'

import {
  getJourneyStopIds,
  getMapDefaultCenter,
  getMarkerType,
  getSupportedGeometryForRoutes,
  getValidMapStops,
  hasValidRouteGeometry,
  isFiniteLatitude,
  isFiniteLongitude,
  isValidMapStop,
} from './mapData.js'

describe('map data helpers', () => {
  const validStops = [
    { id: 'origin', lat: 10.3, lng: 123.9 },
    { id: 'destination', lat: 10.31, lng: 123.91 },
    { id: 'transfer', lat: 10.32, lng: 123.92 },
    { id: 'duplicate', lat: 10.33, lng: 123.93 },
    { id: 'duplicate', lat: 10.34, lng: 123.94 },
    { id: 'invalid', lat: 200, lng: 123.9 },
    { id: 'missing', lat: null, lng: 123.9 },
    { lat: 10.3, lng: 123.9 },
  ]

  it('accepts valid coordinates and rejects invalid or missing values', () => {
    expect(isFiniteLatitude(10.3)).toBe(true)
    expect(isFiniteLatitude(100)).toBe(false)
    expect(isFiniteLatitude(Number.NaN)).toBe(false)
    expect(isFiniteLongitude(123.9)).toBe(true)
    expect(isFiniteLongitude(300)).toBe(false)
    expect(isFiniteLongitude(Number.NaN)).toBe(false)
  })

  it('excludes invalid, duplicate, and ID-less stops', () => {
    const valid = getValidMapStops(validStops)
    expect(valid.map((stop) => stop.id)).toEqual([
      'origin',
      'destination',
      'transfer',
      'duplicate',
    ])
  })

  it('accepts valid stop records and rejects invalid stop records', () => {
    expect(isValidMapStop(validStops[0])).toBe(true)
    expect(isValidMapStop(validStops[5])).toBe(false)
    expect(isValidMapStop(validStops[6])).toBe(false)
    expect(isValidMapStop(validStops[7])).toBe(false)
  })

  it('collects origin, destination, and transfer stop IDs without duplicates', () => {
    expect(getJourneyStopIds(null, 'origin', 'origin')).toEqual(new Set(['origin']))
    expect(
      getJourneyStopIds({ transferStopId: 'transfer' }, 'origin', 'destination'),
    ).toEqual(new Set(['origin', 'destination', 'transfer']))
  })

  it('treats missing geometry as unsupported rather than drawing it', () => {
    expect(hasValidRouteGeometry(null)).toBe(false)
    expect(hasValidRouteGeometry([])).toBe(false)
    expect(hasValidRouteGeometry({ path: [[10, 123], 'invalid'] })).toBe(false)
    expect(
      hasValidRouteGeometry({
        path: [
          [10, 123],
          [10.1, 123.1],
        ],
      }),
    ).toBe(true)
    expect(
      hasValidRouteGeometry([
        [10, 123],
        [10.1, 123.1],
      ]),
    ).toBe(true)
  })

  it('does not invent geometry for routes whose path field is empty', () => {
    const routes = [
      { id: 'route-a', path: null },
      {
        id: 'route-b',
        path: [
          [10, 123],
          [10.1, 123.1],
        ],
      },
    ]
    expect(getSupportedGeometryForRoutes(['route-a'], routes)).toBeNull()
    expect(getSupportedGeometryForRoutes(['route-a', 'route-b'], routes)).toEqual([
      [
        [10, 123],
        [10.1, 123.1],
      ],
    ])
  })

  it('maps stop types to marker categories', () => {
    const relevant = {
      originId: 'origin',
      destinationId: 'destination',
      transferIds: ['transfer'],
    }
    expect(getMarkerType('origin', relevant)).toBe('origin')
    expect(getMarkerType('destination', relevant)).toBe('destination')
    expect(getMarkerType('transfer', relevant)).toBe('transfer')
    expect(getMarkerType('listed', relevant)).toBe('listed')
  })

  it('creates a fallback centre when no valid stops are provided', () => {
    expect(getMapDefaultCenter([])).toBeNull()
    expect(getMapDefaultCenter([{ id: 'valid', lat: 10, lng: 120 }])).toEqual({
      lat: 10,
      lng: 120,
    })
  })
})
