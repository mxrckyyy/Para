import { describe, expect, it } from 'vitest'

import stopsData from '../data/stops.json'
import { normaliseSearchText } from './searchNormalization.js'

const stops = stopsData.stops

function findStopsByQuery(query) {
  const normalizedQuery = normaliseSearchText(query)
  if (!normalizedQuery) return []
  return stops.filter((stop) => {
    const terms = [stop.name, ...(stop.aliases ?? [])]
    return terms.some((term) => normaliseSearchText(term).includes(normalizedQuery))
  })
}

describe('searchNormalization', () => {
  it('lowercases text', () => {
    expect(normaliseSearchText('SM City Cebu')).toBe('sm city cebu')
  })

  it('trims leading and trailing whitespace', () => {
    expect(normaliseSearchText('  SM City  ')).toBe('sm city')
  })

  it('collapses repeated whitespace', () => {
    expect(normaliseSearchText('SM   City   Cebu')).toBe('sm city cebu')
  })

  it('replaces punctuation with spaces', () => {
    expect(normaliseSearchText('JY Square (Lahug)')).toBe('jy square lahug')
  })

  it('handles empty string', () => {
    expect(normaliseSearchText('')).toBe('')
  })

  it('handles non-string input', () => {
    expect(normaliseSearchText(null)).toBe('')
    expect(normaliseSearchText(undefined)).toBe('')
    expect(normaliseSearchText(123)).toBe('')
  })

  it('normalizes unicode (NFKC)', () => {
    expect(normaliseSearchText('\uFF21')).toBe('a')
  })
})

describe('alias resolution', () => {
  it('canonical name matches', () => {
    const results = findStopsByQuery('SM City Cebu')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('stop-sm-city-cebu')
  })

  it('alias "SM" resolves to SM City Cebu', () => {
    const results = findStopsByQuery('SM')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('stop-sm-city-cebu')
  })

  it('alias "Ayala" resolves to Ayala Center Cebu', () => {
    const results = findStopsByQuery('Ayala')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('stop-ayala-center-cebu')
  })

  it('existing alias "Lahug" resolves to JY Square', () => {
    const results = findStopsByQuery('Lahug')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('stop-jy-square-lahug')
  })

  it('existing alias "NBT" resolves to North Bus Terminal', () => {
    const results = findStopsByQuery('NBT')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('stop-north-bus-terminal')
  })

  it('case-insensitive matching works', () => {
    const results = findStopsByQuery('sm city cebu')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('stop-sm-city-cebu')
  })

  it('whitespace variations match', () => {
    const results = findStopsByQuery('  SM   City  Cebu  ')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('stop-sm-city-cebu')
  })

  it('partial canonical name matches', () => {
    const results = findStopsByQuery('SM City')
    expect(results.length).toBeGreaterThanOrEqual(1)
    expect(results.some((s) => s.id === 'stop-sm-city-cebu')).toBe(true)
  })

  it('unknown name returns no results', () => {
    const results = findStopsByQuery('zzzznonexistent')
    expect(results).toHaveLength(0)
  })

  it('empty input returns no results', () => {
    const results = findStopsByQuery('')
    expect(results).toHaveLength(0)
  })

  it('every alias maps to exactly one stop', () => {
    const allAliases = stops.flatMap((s) => s.aliases ?? [])
    for (const alias of allAliases) {
      const matches = stops.filter((s) => (s.aliases ?? []).includes(alias))
      expect(matches.length, `alias "${alias}" maps to ${matches.length} stops`).toBe(1)
    }
  })

  it('canonical names are unique', () => {
    const names = stops.map((s) => s.name)
    const unique = new Set(names)
    expect(unique.size).toBe(names.length)
  })
})
