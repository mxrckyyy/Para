import { afterEach, describe, expect, it } from 'vitest'

import stopsData from '../data/stops.json'
import routesData from '../data/routes.json'
import { findJourneys } from './routeEngine.js'
import {
  SAVED_ROUTES_SCHEMA_VERSION,
  SAVED_ROUTES_STORAGE_KEY,
  createSavedJourneyKey,
  createSavedJourneyRecord,
  readSavedEntries,
  removeSavedJourney,
  resolveSavedJourneys,
  saveSavedJourney,
  writeSavedEntries,
} from './savedJourneys.js'

function createStorage() {
  let store = {}
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null
    },
    setItem(key, value) {
      store[key] = String(value)
    },
    removeItem(key) {
      delete store[key]
    },
  }
}

let storage = createStorage()

const directJourney = findJourneys({
  originStopId: 'stop-jy-square-lahug',
  destinationStopId: 'stop-sm-city-cebu',
  routeData: routesData,
  stops: stopsData,
})[0]

const transferJourneys = findJourneys({
  originStopId: 'stop-jy-square-lahug',
  destinationStopId: 'stop-north-bus-terminal',
  routeData: routesData,
  stops: stopsData,
})
const transferJourney = transferJourneys[0]

afterEach(() => {
  storage = createStorage()
})

describe('saved journey persistence', () => {
  it('returns an empty list when storage is empty', () => {
    const result = readSavedEntries(storage, stopsData, routesData)
    expect(result.records).toEqual([])
    expect(result.invalidCount).toBe(0)
    expect(result.storageAvailable).toBe(true)
    expect(result.error).toBeNull()
  })

  it('saves a valid direct journey', () => {
    const result = saveSavedJourney(storage, stopsData, routesData, directJourney)
    expect(result.success).toBe(true)

    const read = readSavedEntries(storage, stopsData, routesData)
    expect(read.records).toHaveLength(1)
    expect(read.records[0].originStopId).toBe('stop-jy-square-lahug')
    expect(read.records[0].destinationStopId).toBe('stop-sm-city-cebu')
    expect(resolveSavedJourneys(read.records, stopsData, routesData)).toHaveLength(1)
  })

  it('saves a valid transfer journey', () => {
    expect(transferJourney).toBeTruthy()
    const result = saveSavedJourney(storage, stopsData, routesData, transferJourney)
    expect(result.success).toBe(true)

    const read = readSavedEntries(storage, stopsData, routesData)
    expect(read.records).toHaveLength(1)
    expect(read.records[0].transferStopId).toBeTruthy()
    expect(
      resolveSavedJourneys(read.records, stopsData, routesData)[0].journey.transferStopId,
    ).toBeTruthy()
  })

  it('does not save duplicate journeys', () => {
    saveSavedJourney(storage, stopsData, routesData, directJourney)
    const duplicateResult = saveSavedJourney(
      storage,
      stopsData,
      routesData,
      directJourney,
    )
    expect(duplicateResult.success).toBe(true)
    expect(duplicateResult.duplicate).toBe(true)

    const read = readSavedEntries(storage, stopsData, routesData)
    expect(read.records).toHaveLength(1)
  })

  it('preserves distinct transfer journeys separately', () => {
    saveSavedJourney(storage, stopsData, routesData, transferJourney)
    saveSavedJourney(storage, stopsData, routesData, directJourney)

    const read = readSavedEntries(storage, stopsData, routesData)
    expect(read.records).toHaveLength(2)
    const items = resolveSavedJourneys(read.records, stopsData, routesData)
    expect(items.map((item) => item.journey.transferStopId)).toContain(
      transferJourney.transferStopId,
    )
  })

  it('removes a saved journey', () => {
    saveSavedJourney(storage, stopsData, routesData, directJourney)
    expect(removeSavedJourney(storage, stopsData, routesData, directJourney)).toBe(true)

    const read = readSavedEntries(storage, stopsData, routesData)
    expect(read.records).toHaveLength(0)
  })

  it('recovers from invalid JSON', () => {
    storage.setItem(SAVED_ROUTES_STORAGE_KEY, '{not valid json')
    const result = readSavedEntries(storage, stopsData, routesData)
    expect(result.records).toEqual([])
    expect(result.invalidCount).toBe(1)
    expect(result.storageAvailable).toBe(true)
    expect(result.error).toBe('invalid-json')
  })

  it('recovers from an unsupported schema version', () => {
    storage.setItem(
      SAVED_ROUTES_STORAGE_KEY,
      JSON.stringify({
        version: SAVED_ROUTES_SCHEMA_VERSION + 1,
        items: [{ schemaVersion: SAVED_ROUTES_SCHEMA_VERSION + 1 }],
      }),
    )

    const result = readSavedEntries(storage, stopsData, routesData)
    expect(result.records).toEqual([])
    expect(result.invalidCount).toBe(1)
    expect(result.error).toBe('unsupported-version')
  })

  it('ignores malformed and no-longer-valid records', () => {
    const invalidRouteRecord = {
      schemaVersion: SAVED_ROUTES_SCHEMA_VERSION,
      originStopId: 'stop-jy-square-lahug',
      destinationStopId: 'stop-sm-city-cebu',
      routeIds: ['route-does-not-exist'],
      transferStopId: null,
      key: 'invalid-route-key',
      savedAt: new Date().toISOString(),
    }
    storage.setItem(
      SAVED_ROUTES_STORAGE_KEY,
      JSON.stringify({
        version: SAVED_ROUTES_SCHEMA_VERSION,
        items: [{ not: 'a saved record' }, invalidRouteRecord],
      }),
    )

    const result = readSavedEntries(storage, stopsData, routesData)
    expect(result.records).toHaveLength(0)
    expect(result.invalidCount).toBe(2)
    expect(result.error).toBeNull()
  })

  it('does not mutate source route or stop data', () => {
    const stopsBefore = JSON.stringify(stopsData)
    const routesBefore = JSON.stringify(routesData)
    saveSavedJourney(storage, stopsData, routesData, directJourney)
    readSavedEntries(storage, stopsData, routesData)
    resolveSavedJourneys(
      JSON.parse(storage.getItem(SAVED_ROUTES_STORAGE_KEY)).items,
      stopsData,
      routesData,
    )

    expect(JSON.stringify(stopsData)).toBe(stopsBefore)
    expect(JSON.stringify(routesData)).toBe(routesBefore)
  })

  it('does not use unavailable storage', () => {
    const unavailableStorage = {
      getItem() {
        throw new Error('storage denied')
      },
    }

    const result = readSavedEntries(unavailableStorage, stopsData, routesData)
    expect(result.storageAvailable).toBe(false)
    expect(result.records).toEqual([])
    expect(result.invalidCount).toBe(0)

    expect(
      saveSavedJourney(unavailableStorage, stopsData, routesData, directJourney).success,
    ).toBe(false)
    expect(
      removeSavedJourney(unavailableStorage, stopsData, routesData, directJourney),
    ).toBe(false)
  })

  it('creates a stable key from journey IDs', () => {
    const key = createSavedJourneyKey(directJourney)
    expect(key).toBeTruthy()
    expect(key).toContain('stop-jy-square-lahug')
  })

  it('writes storage in the versioned schema', () => {
    writeSavedEntries(storage, [createSavedJourneyRecord(directJourney)])
    const parsed = JSON.parse(storage.getItem(SAVED_ROUTES_STORAGE_KEY))
    expect(parsed.version).toBe(SAVED_ROUTES_SCHEMA_VERSION)
    expect(parsed.items).toHaveLength(1)
  })
})
