import { useCallback, useMemo, useState } from 'react'

import stopsData from '../data/stops.json'
import routesData from '../data/routes.json'
import {
  buildSavedItems,
  createSavedJourneyKey,
  readSavedEntries,
  removeSavedJourney as removeSavedJourneyEntry,
  saveSavedJourney,
  writeSavedEntries,
} from '../utils/savedJourneys.js'

function readCurrentState() {
  return readSavedEntries(globalThis.localStorage, stopsData, routesData)
}

export function useSavedRoutes() {
  const [state, setState] = useState(() => readCurrentState())

  const savedItems = useMemo(
    () => buildSavedItems(state.records, stopsData, routesData),
    [state.records],
  )

  const isSavedJourney = useCallback(
    (journey) => {
      const key = createSavedJourneyKey(journey)
      return Boolean(key) && state.records.some((record) => record.key === key)
    },
    [state.records],
  )

  const saveJourney = useCallback((journey) => {
    const result = saveSavedJourney(
      globalThis.localStorage,
      stopsData,
      routesData,
      journey,
    )
    if (!result.success) {
      if (result.reason === 'storage-unavailable') {
        setState((current) => ({
          ...current,
          storageAvailable: false,
          error: 'storage-unavailable',
        }))
      }
      return false
    }

    const next = readSavedEntries(globalThis.localStorage, stopsData, routesData)
    setState({
      records: next.records,
      invalidCount: next.invalidCount,
      storageAvailable: next.storageAvailable,
      error: next.error,
    })
    return true
  }, [])

  const removeSavedJourney = useCallback((journeyOrKey) => {
    const success = removeSavedJourneyEntry(
      globalThis.localStorage,
      stopsData,
      routesData,
      journeyOrKey,
    )
    if (success) {
      const nextState = readSavedEntries(globalThis.localStorage, stopsData, routesData)
      setState({
        records: nextState.records,
        invalidCount: nextState.invalidCount,
        storageAvailable: nextState.storageAvailable,
        error: nextState.error,
      })
    }
    return success
  }, [])

  const savedRouteCountLabel = useMemo(() => {
    const count = savedItems.length
    return count === 1 ? '1 saved journey' : `${count} saved journeys`
  }, [savedItems.length])

  return {
    ...state,
    savedItems,
    saveJourney,
    removeSavedJourney,
    isSavedJourney,
    savedRouteCountLabel,
    writeRecordsForTesting: writeSavedEntries,
  }
}
