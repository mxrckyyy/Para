import { describe, expect, it } from 'vitest'

import {
  createJourneyToken,
  decodeJourneyToken,
  formatDistanceMetres,
  journeyMatchesToken,
  readSearchParameters,
} from './journeyLinks.js'

describe('journey links', () => {
  it('reads valid URL parameters', () => {
    expect(readSearchParameters('?from=stop-a&to=stop-b&journey=encoded')).toEqual({
      from: 'stop-a',
      to: 'stop-b',
      journey: 'encoded',
      route: null,
      transfer: null,
    })
  })

  it('returns null values for missing parameters', () => {
    expect(readSearchParameters('?from=stop-a')).toEqual({
      from: 'stop-a',
      to: null,
      journey: null,
      route: null,
      transfer: null,
    })
  })

  it('decodes encoded parameters', () => {
    expect(readSearchParameters(`?from=${encodeURIComponent('a b')}`).from).toBe('a b')
  })

  it('round-trips a valid journey token', () => {
    const token = {
      type: 'transfer',
      routes: ['route-a', 'route-b'],
      transfer: 'transfer-stop',
    }
    expect(decodeJourneyToken(encodeURIComponent(JSON.stringify(token)))).toEqual(token)
  })

  it('rejects malformed journey tokens', () => {
    expect(decodeJourneyToken('not-a-token')).toBeNull()
    expect(
      decodeJourneyToken(encodeURIComponent(JSON.stringify({ type: 'bad' }))),
    ).toBeNull()
    expect(
      decodeJourneyToken(
        encodeURIComponent(JSON.stringify({ type: 'direct', routes: [] })),
      ),
    ).toBeNull()
  })

  it('matches journey identities by token', () => {
    const journey = { type: 'direct', routeIds: ['route-a'], transferStopId: null }
    const token = createJourneyToken(journey)
    expect(journeyMatchesToken(journey, JSON.parse(token))).toBe(true)
    expect(
      journeyMatchesToken(journey, {
        type: 'direct',
        routes: ['route-b'],
        transfer: null,
      }),
    ).toBe(false)
  })

  it('formats distances without inventing missing values', () => {
    expect(formatDistanceMetres(null)).toBeNull()
    expect(formatDistanceMetres(250)).toBe('250 m')
    expect(formatDistanceMetres(1200)).toBe('1.2 km')
  })
})
