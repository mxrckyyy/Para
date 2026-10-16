import { lazy, Suspense, useEffect, useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'wouter'

import { findJourneys } from '../utils/routeEngine.js'
import { readSearchParameters } from '../utils/journeyLinks.js'
import stopsData from '../data/stops.json'
import routesData from '../data/routes.json'

const stops = stopsData.stops
const stopsById = new Map(stops.map((stop) => [stop.id, stop]))
const MapView = lazy(() => import('../components/map/MapView.jsx'))

export default function MapPage() {
  const query = useMemo(() => readSearchParameters(window.location.search), [])

  const originStop = useMemo(
    () => (typeof query.from === 'string' ? (stopsById.get(query.from) ?? null) : null),
    [query.from],
  )
  const destinationStop = useMemo(
    () => (typeof query.to === 'string' ? (stopsById.get(query.to) ?? null) : null),
    [query.to],
  )

  const journey = useMemo(() => {
    if (!originStop || !destinationStop) return null
    const journeys = findJourneys({
      originStopId: query.from,
      destinationStopId: query.to,
      routeData: routesData,
      stops: stopsData,
    })
    if (journeys.length === 0) return null
    return journeys[0]
  }, [originStop, destinationStop, query.from, query.to])

  useEffect(() => {
    document.title = 'Para — Map'
  }, [])

  const routeIds = journey?.routeIds ?? []
  const transferId =
    typeof journey?.transferStopId === 'string' ? journey.transferStopId : null

  return (
    <section aria-labelledby="map-page-title">
      <Link
        href="/results"
        className="inline-flex items-center gap-1 text-sm font-medium text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to results
      </Link>

      <h1
        id="map-page-title"
        className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Map
      </h1>
      <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
        Listed stop locations and the preliminary route engine's result for this search.
        Route geometry is shown only when the data explicitly contains supported geometry.
      </p>

      {originStop && destinationStop && (
        <p className="mt-3 text-sm text-text-secondary">
          {originStop.name} <span aria-hidden="true">→</span> {destinationStop.name}
        </p>
      )}

      <div className="mt-6">
        <Suspense
          fallback={
            <div className="flex h-[420px] items-center justify-center rounded-lg border border-border bg-surface-muted text-sm text-text-muted">
              Loading map...
            </div>
          }
        >
          <MapView
            title="Selected stop locations"
            originId={originStop?.id ?? null}
            destinationId={destinationStop?.id ?? null}
            transferId={transferId}
            routeIds={routeIds}
          />
        </Suspense>
      </div>
    </section>
  )
}
