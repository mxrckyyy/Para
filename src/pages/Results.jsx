import { useEffect, useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useLocation } from 'wouter'

import { findJourneys } from '../utils/routeEngine.js'
import { readSearchParameters } from '../utils/journeyLinks.js'
import { JourneyCard } from '../components/routes/JourneyCard.jsx'
import stopsData from '../data/stops.json'
import routesData from '../data/routes.json'
import { useSavedRoutes } from '../hooks/useSavedRoutes.js'

const stops = stopsData.stops
const stopsById = new Map(stops.map((stop) => [stop.id, stop]))

export default function Results() {
  const [location] = useLocation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query = useMemo(() => readSearchParameters(window.location.search), [location])

  const originId = query.from
  const destinationId = query.to
  const originStop =
    typeof originId === 'string' ? (stopsById.get(originId) ?? null) : null
  const destinationStop =
    typeof destinationId === 'string' ? (stopsById.get(destinationId) ?? null) : null
  const identicalStops = Boolean(originId && originId === destinationId)
  const hasValidStops = Boolean(originStop && destinationStop && !identicalStops)

  const savedRoutes = useSavedRoutes()

  const journeys = useMemo(() => {
    if (!hasValidStops || !originId || !destinationId) return []
    return findJourneys({
      originStopId: originId,
      destinationStopId: destinationId,
      routeData: routesData,
      stops: stopsData,
    })
  }, [hasValidStops, originId, destinationId])

  useEffect(() => {
    document.title = 'Para — Route results'
  }, [])

  const invalidMessage =
    !originId || !destinationId
      ? 'Both origin and destination are required.'
      : identicalStops
        ? 'Origin and destination must be different.'
        : !originStop || !destinationStop
          ? 'One or both stop IDs are not in the preliminary dataset.'
          : null

  const totalJourneys = journeys.length
  const resultCountLabel =
    totalJourneys === 1 ? '1 journey option' : `${totalJourneys} journey options`

  return (
    <section className="mx-auto max-w-2xl" aria-labelledby="results-title">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to search
      </Link>

      <h1
        id="results-title"
        className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Route results
      </h1>

      {!hasValidStops && (
        <div
          className="mt-6 rounded-lg border border-border bg-surface p-5"
          role="alert"
          aria-live="polite"
        >
          <p className="text-sm font-medium text-error">{invalidMessage}</p>
          <p className="mt-1 text-sm text-text-secondary">
            Return to search and choose two different stops from the suggestions.
          </p>
        </div>
      )}

      {hasValidStops && (
        <>
          <div className="mt-3">
            <Link
              href={`/map?from=${encodeURIComponent(originId)}&to=${encodeURIComponent(destinationId)}`}
              className="text-sm font-medium text-primary"
            >
              View listed stop locations on map
            </Link>
          </div>
          <div
            className="mt-4 flex items-center gap-2 text-sm text-text-secondary"
            aria-live="polite"
          >
            <span className="font-medium text-text">{originStop.name}</span>
            <span aria-hidden="true">→</span>
            <span className="font-medium text-text">{destinationStop.name}</span>
          </div>

          <p className="mt-2 text-sm text-text-muted">
            {resultCountLabel}, sorted by estimated travel time. All route and stop data
            remains preliminary.
          </p>

          <div
            className="mt-4 rounded-lg border border-border bg-surface-muted p-3 text-xs leading-5 text-text-muted"
            role="note"
          >
            <p>
              Duration estimates use straight-line distances between unverified stop
              coordinates and a 15 km/h assumption. They are not road distances,
              schedules, or live transit predictions. Fare information is not available.
            </p>
          </div>

          {journeys.length === 0 && (
            <div className="mt-6 rounded-lg border border-dashed border-border-strong bg-surface p-5">
              <p className="text-sm font-medium text-text">
                No supported route options found
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                The preliminary data does not contain a supported direct or one-transfer
                journey for these stops.
              </p>
              <p className="mt-3 text-sm text-text-muted">
                Try a different origin or destination. Future data improvements may add
                additional routes and transfer points.
              </p>
            </div>
          )}

          {journeys.length > 0 && (
            <ul className="mt-6 space-y-4" aria-label="Journey options">
              {journeys.map((journey, index) => {
                const transferId =
                  typeof journey.transferStopId === 'string'
                    ? journey.transferStopId
                    : null
                const routeIds = Array.isArray(journey.routeIds) ? journey.routeIds : []
                return (
                  <li
                    key={`${journey.type}-${routeIds.join('+')}-${transferId ?? 'none'}-${index}`}
                  >
                    <JourneyCard
                      journey={journey}
                      fromId={originId}
                      toId={destinationId}
                      saved={savedRoutes.isSavedJourney(journey)}
                      onToggleSave={(item) =>
                        savedRoutes.isSavedJourney(item)
                          ? savedRoutes.removeSavedJourney(item)
                          : savedRoutes.saveJourney(item)
                      }
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </>
      )}
    </section>
  )
}
