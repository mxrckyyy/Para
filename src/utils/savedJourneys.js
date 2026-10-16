import { findJourneys } from './routeEngine.js'

export const SAVED_ROUTES_STORAGE_KEY = 'para_saved_routes'
export const SAVED_ROUTES_SCHEMA_VERSION = 1

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function deepEqualValue(left, right) {
  return JSON.stringify(left) === JSON.stringify(right)
}

export function createSavedJourneyKey(journey) {
  if (!journey || typeof journey !== 'object') return null

  const originStopId = isNonEmptyString(journey.originStopId)
    ? journey.originStopId
    : null
  const destinationStopId = isNonEmptyString(journey.destinationStopId)
    ? journey.destinationStopId
    : null
  const routeIds = Array.isArray(journey.routeIds)
    ? journey.routeIds.filter((routeId) => typeof routeId === 'string')
    : []

  if (!originStopId || !destinationStopId || routeIds.length === 0) return null

  const transferStopId =
    typeof journey.transferStopId === 'string' ? journey.transferStopId : null
  return `${originStopId}|${destinationStopId}|${routeIds.join('->')}|${transferStopId ?? ''}`
}

export function createSavedJourneyRecord(journey, now = new Date()) {
  const key = createSavedJourneyKey(journey)
  if (!key) return null

  return {
    schemaVersion: SAVED_ROUTES_SCHEMA_VERSION,
    originStopId: journey.originStopId,
    destinationStopId: journey.destinationStopId,
    routeIds: [...journey.routeIds],
    transferStopId: journey.transferStopId ?? null,
    key,
    savedAt: now.toISOString(),
  }
}

function hasValidStopId(stopId, stopsData) {
  return (
    isNonEmptyString(stopId) &&
    Array.isArray(stopsData?.stops) &&
    stopsData.stops.some((stop) => stop?.id === stopId)
  )
}

function hasValidRouteId(routeId, routesData) {
  return (
    typeof routeId === 'string' &&
    Array.isArray(routesData?.routes) &&
    routesData.routes.some((route) => route?.id === routeId)
  )
}

export function isPersistedSavedRecord(record, stopsData, routesData) {
  if (!record || typeof record !== 'object') return false
  if (record.schemaVersion !== SAVED_ROUTES_SCHEMA_VERSION) return false
  if (!hasValidStopId(record.originStopId, stopsData)) return false
  if (!hasValidStopId(record.destinationStopId, stopsData)) return false
  if (!Array.isArray(record.routeIds) || record.routeIds.length === 0) return false
  if (!record.routeIds.every((routeId) => hasValidRouteId(routeId, routesData)))
    return false
  if (
    record.transferStopId !== null &&
    !hasValidStopId(record.transferStopId, stopsData)
  ) {
    return false
  }
  if (!isNonEmptyString(record.key)) return false
  if (
    record.savedAt !== null &&
    record.savedAt !== undefined &&
    typeof record.savedAt !== 'string'
  ) {
    return false
  }
  return true
}

export function resolveSavedJourney(record, stopsData, routesData) {
  if (!isPersistedSavedRecord(record, stopsData, routesData)) return null

  const journeys = findJourneys({
    originStopId: record.originStopId,
    destinationStopId: record.destinationStopId,
    routeData: routesData,
    stops: stopsData,
  })

  const expectedKey = createSavedJourneyKey({
    originStopId: record.originStopId,
    destinationStopId: record.destinationStopId,
    routeIds: record.routeIds,
    transferStopId: record.transferStopId,
  })

  if (!expectedKey) return null

  return (
    journeys.find((journey) => {
      return (
        createSavedJourneyKey(journey) === expectedKey &&
        deepEqualValue(journey.routeIds, record.routeIds)
      )
    }) ?? null
  )
}

export function buildSavedItems(records, stopsData, routesData) {
  if (!Array.isArray(records)) return []
  return records
    .map((record) => {
      const journey = resolveSavedJourney(record, stopsData, routesData)
      return journey ? { record, journey } : null
    })
    .filter(Boolean)
}

function storageIsAvailable(storage) {
  if (!storage || typeof storage.getItem !== 'function') return false
  try {
    const testKey = `${SAVED_ROUTES_STORAGE_KEY}__availability`
    storage.setItem(testKey, '1')
    storage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

export function readSavedEntries(storage, stopsData, routesData) {
  if (!storageIsAvailable(storage)) {
    return {
      records: [],
      invalidCount: 0,
      storageAvailable: false,
      error: 'storage-unavailable',
    }
  }

  let raw
  try {
    raw = storage.getItem(SAVED_ROUTES_STORAGE_KEY)
  } catch {
    return {
      records: [],
      invalidCount: 1,
      storageAvailable: false,
      error: 'storage-unavailable',
    }
  }

  if (raw === null) {
    return {
      records: [],
      invalidCount: 0,
      storageAvailable: true,
      error: null,
    }
  }

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    return {
      records: [],
      invalidCount: 1,
      storageAvailable: true,
      error: 'invalid-json',
    }
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return {
      records: [],
      invalidCount: 1,
      storageAvailable: true,
      error: 'invalid-schema',
    }
  }

  if (parsed.version !== SAVED_ROUTES_SCHEMA_VERSION || !Array.isArray(parsed.items)) {
    return {
      records: [],
      invalidCount: Array.isArray(parsed.items) ? parsed.items.length : 1,
      storageAvailable: true,
      error: 'unsupported-version',
    }
  }

  const uniqueKeys = new Set()
  let invalidCount = 0
  const validRecords = []

  for (const rawRecord of parsed.items) {
    if (!rawRecord || typeof rawRecord !== 'object') {
      invalidCount += 1
      continue
    }
    if (!isPersistedSavedRecord(rawRecord, stopsData, routesData)) {
      invalidCount += 1
      continue
    }
    if (uniqueKeys.has(rawRecord.key)) {
      invalidCount += 1
      continue
    }
    if (!resolveSavedJourney(rawRecord, stopsData, routesData)) {
      invalidCount += 1
      continue
    }

    uniqueKeys.add(rawRecord.key)
    validRecords.push({
      schemaVersion: SAVED_ROUTES_SCHEMA_VERSION,
      originStopId: rawRecord.originStopId,
      destinationStopId: rawRecord.destinationStopId,
      routeIds: [...rawRecord.routeIds],
      transferStopId: rawRecord.transferStopId ?? null,
      key: rawRecord.key,
      savedAt: typeof rawRecord.savedAt === 'string' ? rawRecord.savedAt : null,
    })
  }

  return {
    records: validRecords,
    invalidCount,
    storageAvailable: true,
    error: null,
  }
}

export function writeSavedEntries(storage, records) {
  if (!Array.isArray(records)) return false
  if (typeof storage?.setItem !== 'function') return false

  const payload = {
    version: SAVED_ROUTES_SCHEMA_VERSION,
    items: records.map((record) => ({
      schemaVersion: SAVED_ROUTES_SCHEMA_VERSION,
      originStopId: record.originStopId,
      destinationStopId: record.destinationStopId,
      routeIds: [...record.routeIds],
      transferStopId: record.transferStopId ?? null,
      key: record.key,
      savedAt: record.savedAt ?? null,
    })),
  }

  try {
    storage.setItem(SAVED_ROUTES_STORAGE_KEY, JSON.stringify(payload))
    return true
  } catch {
    return false
  }
}

export function saveSavedJourney(storage, stopsData, routesData, journey) {
  const record = createSavedJourneyRecord(journey)
  if (!record) return { success: false, reason: 'invalid-journey' }

  const initial = readSavedEntries(storage, stopsData, routesData)
  if (!initial.storageAvailable) {
    return { success: false, reason: 'storage-unavailable', readResult: initial }
  }

  if (!resolveSavedJourney(record, stopsData, routesData)) {
    return { success: false, reason: 'unreconstructable', readResult: initial }
  }

  const existingByKey = new Map(
    initial.records.map((existing) => [existing.key, existing]),
  )
  if (existingByKey.has(record.key)) {
    return { success: true, record: existingByKey.get(record.key), duplicate: true }
  }

  const nextRecords = [...initial.records, record]
  if (!writeSavedEntries(storage, nextRecords)) {
    return { success: false, reason: 'write-failed', readResult: initial }
  }

  return { success: true, record, readResult: initial }
}

export function removeSavedJourney(storage, stopsData, routesData, journeyOrKey) {
  const targetKey =
    typeof journeyOrKey === 'string' ? journeyOrKey : createSavedJourneyKey(journeyOrKey)

  if (!targetKey) return false

  const initial = readSavedEntries(storage, stopsData, routesData)
  if (!initial.storageAvailable) return false

  const nextRecords = initial.records.filter((record) => record.key !== targetKey)
  if (nextRecords.length === initial.records.length) return false
  return writeSavedEntries(storage, nextRecords)
}

export function isSavedJourney(records, journey) {
  const key = createSavedJourneyKey(journey)
  if (!key || !Array.isArray(records)) return false
  return records.some((record) => record?.key === key)
}

export function resolveSavedJourneys(records, stopsData, routesData) {
  if (!Array.isArray(records)) return []
  return buildSavedItems(records, stopsData, routesData)
}
