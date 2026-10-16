import { useEffect, useMemo } from 'react'
import { ArrowLeft, Bookmark, MapPin, Route } from 'lucide-react'
import { Link, useLocation } from 'wouter'

import { findJourneys } from '../utils/routeEngine.js'
import { decodeJourneyToken, readSearchParameters } from '../utils/journeyLinks.js'
import { useSavedRoutes } from '../hooks/useSavedRoutes.js'
import stopsData from '../data/stops.json'
import routesData from '../data/routes.json'

const stops = stopsData.stops
const routes = routesData.routes
const stopsById = new Map(stops.map((stop) => [stop.id, stop]))
const routesById = new Map(routes.map((route) => [route.id, route]))

function routeCode(routeId) {
  const route = routesById.get(routeId)
  return typeof route?.code === 'string' ? route.code : routeId
}

function routeName(routeId) {
  const route = routesById.get(routeId)
  return typeof route?.name === 'string' ? route.name : 'Unknown route name'
}

function formatDuration(duration) {
  if (!Number.isFinite(duration) || duration < 0) return 'Duration unavailable'
  return `${Math.round(duration)} min`
}

function formatDistance(distance) {
  if (!Number.isFinite(distance) || distance < 0) return null
  if (distance < 1000) return `${Math.round(distance)} m`
  return `${(distance / 1000).toFixed(1)} km`
}

export default function RouteDetail() {
  const [location] = useLocation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useMemo(() => readSearchParameters(window.location.search), [location])

  useEffect(() => {
    document.title = 'Para — Journey details'
  }, [])

  const { from: originId, to: destinationId, journey: journeyToken } = search
  const decodedToken = useMemo(() => decodeJourneyToken(journeyToken), [journeyToken])

  const originStop = useMemo(
    () => (typeof originId === 'string' ? (stopsById.get(originId) ?? null) : null),
    [originId],
  )
  const destinationStop = useMemo(
    () =>
      typeof destinationId === 'string' ? (stopsById.get(destinationId) ?? null) : null,
    [destinationId],
  )

  const savedRoutes = useSavedRoutes()

  const journeys = useMemo(() => {
    if (!originStop || !destinationStop) return []
    return findJourneys({
      originStopId: originId,
      destinationStopId: destinationId,
      routeData: routesData,
      stops: stopsData,
    })
  }, [originId, destinationId, originStop, destinationStop])

  const journey = useMemo(() => {
    if (!decodedToken) return null
    return (
      journeys.find((candidate) => {
        const candidateToken = JSON.stringify({
          type: candidate.type,
          routes: Array.isArray(candidate.routeIds) ? candidate.routeIds : [],
          transfer:
            typeof candidate.transferStopId === 'string'
              ? candidate.transferStopId
              : null,
        })
        return candidateToken === JSON.stringify(decodedToken)
      }) ?? null
    )
  }, [decodedToken, journeys])

  const isSaved = journey ? savedRoutes.isSavedJourney(journey) : false

  const resultsPath = useMemo(() => {
    if (!originId || !destinationId) return '/'
    const params = new URLSearchParams({ from: originId, to: destinationId })
    return `/results?${params.toString()}`
  }, [originId, destinationId])

  if (!originStop || !destinationStop || !decodedToken) {
    return (
      <section className="mx-auto max-w-2xl" aria-labelledby="detail-unavailable-title">
        <Link
          href={
            typeof originId === 'string' && typeof destinationId === 'string'
              ? resultsPath
              : '/'
          }
          className="inline-flex items-center gap-1 text-sm font-medium text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Link>
        <h1
          id="detail-unavailable-title"
          className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Journey details unavailable
        </h1>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          This link is missing a valid origin, destination, or journey. Return to results
          and choose a journey again.
        </p>
      </section>
    )
  }

  if (!journey) {
    return (
      <section className="mx-auto max-w-2xl" aria-labelledby="detail-unavailable-title">
        <Link
          href={resultsPath}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to results
        </Link>
        <h1
          id="detail-unavailable-title"
          className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Journey unavailable
        </h1>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          Para could not reconstruct this journey from the current preliminary data.
          Return to results and choose another supported route.
        </p>
      </section>
    )
  }

  const isDirect = journey.type === 'direct'
  const routeIds = Array.isArray(journey.routeIds) ? journey.routeIds : []
  const transferStop =
    typeof journey.transferStopId === 'string'
      ? (stopsById.get(journey.transferStopId) ?? null)
      : null
  const distanceLabel = formatDistance(journey.estimatedDistanceMetres)
  const assumptions = Array.isArray(journey.estimateAssumptions)
    ? journey.estimateAssumptions
    : []

  return (
    <section className="mx-auto max-w-2xl" aria-labelledby="detail-title">
      <Link
        href={resultsPath}
        className="inline-flex items-center gap-1 text-sm font-medium text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to results
      </Link>

      <h1
        id="detail-title"
        className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        {isDirect ? 'Direct journey details' : 'Journey with one transfer'}
      </h1>
      <div className="mt-3">
        <Link
          href={`/map?from=${encodeURIComponent(originId)}&to=${encodeURIComponent(destinationId)}`}
          className="text-sm font-medium text-primary"
        >
          View listed stop locations on map
        </Link>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
        <span className="font-medium text-text">{originStop.name}</span>
        <span aria-hidden="true">→</span>
        <span className="font-medium text-text">{destinationStop.name}</span>
      </div>

      <div
        className="mt-4 rounded-lg border border-border bg-surface-muted p-3 text-xs leading-5 text-text-muted"
        role="note"
      >
        <p>
          These are preliminary results from an unverified stop and route dataset. Route
          service, directions, schedules, fares, and availability may differ from what is
          shown.
        </p>
      </div>

      <article className="mt-6 rounded-lg border border-border bg-surface p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              {isDirect ? 'Direct journey' : 'Transfer journey'}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-text">
              {routeIds.length > 0
                ? routeIds.map((routeId) => routeCode(routeId)).join(' + ')
                : journey.type}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              if (isSaved) savedRoutes.removeSavedJourney(journey)
              else savedRoutes.saveJourney(journey)
            }}
            aria-pressed={isSaved}
            aria-label={isSaved ? 'Remove saved journey' : 'Save journey'}
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <Bookmark
              className={`h-5 w-5 ${isSaved ? 'fill-current text-primary' : ''}`}
              aria-hidden="true"
            />
          </button>
          <span
            className={[
              'shrink-0 rounded-md px-2 py-1 text-xs font-semibold',
              isDirect
                ? 'bg-primary-soft text-primary'
                : 'bg-surface-muted text-text-secondary',
            ].join(' ')}
          >
            {journey.transferCount} transfer{journey.transferCount === 1 ? '' : 's'}
          </span>
        </div>

        <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-text-muted">Origin</dt>
            <dd className="font-medium text-text">{originStop.name}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Destination</dt>
            <dd className="font-medium text-text">{destinationStop.name}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Estimated duration</dt>
            <dd className="font-medium text-text">
              {formatDuration(journey.estimatedDurationMinutes)}
            </dd>
          </div>
          <div>
            <dt className="text-text-muted">Straight-line distance</dt>
            <dd className="font-medium text-text">{distanceLabel ?? 'Unavailable'}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Fare</dt>
            <dd className="font-medium text-text">Unavailable</dd>
          </div>
          <div>
            <dt className="text-text-muted">Transfer stop</dt>
            <dd className="font-medium text-text">
              {transferStop ? transferStop.name : 'None'}
            </dd>
          </div>
        </dl>

        <section className="mt-6" aria-labelledby="journey-segments-title">
          <h3 id="journey-segments-title" className="text-base font-semibold text-text">
            Journey steps
          </h3>
          <ol className="mt-3 space-y-3">
            {isDirect ? (
              <li className="rounded-md border border-border bg-surface-muted p-3 text-sm">
                <div className="flex items-start gap-2">
                  <Route
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium text-text">
                      Ride {routeIds.map(routeCode).join(' + ') || 'unknown route'}
                    </p>
                    <p className="mt-1 text-text-secondary">
                      {routeName(routeIds[0])}
                      {' — '}
                      {originStop.name} to {destinationStop.name}
                    </p>
                  </div>
                </div>
              </li>
            ) : (
              <>
                <li className="rounded-md border border-border bg-surface-muted p-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Route
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-text">
                        Ride {routeCode(routeIds[0]) || 'first route'}
                      </p>
                      <p className="mt-1 text-text-secondary">
                        {routeName(routeIds[0])} — {originStop.name} to{' '}
                        {transferStop?.name ?? 'transfer stop'}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="rounded-md border border-border bg-surface-muted p-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-warning"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-text">Transfer</p>
                      <p className="mt-1 text-text-secondary">
                        {transferStop ? transferStop.name : 'Unknown transfer stop'}. The
                        5-minute transfer wait is included only in the total estimate, not
                        as a separate verified transfer measurement.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="rounded-md border border-border bg-surface-muted p-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Route
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-text">
                        Ride {routeCode(routeIds[1]) || 'second route'}
                      </p>
                      <p className="mt-1 text-text-secondary">
                        {routeName(routeIds[1])} — {transferStop?.name ?? 'transfer stop'}{' '}
                        to {destinationStop.name}
                      </p>
                    </div>
                  </div>
                </li>
              </>
            )}
          </ol>
        </section>

        <section className="mt-6" aria-labelledby="estimate-details-title">
          <h3 id="estimate-details-title" className="text-base font-semibold text-text">
            Estimate assumptions
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            {journey.estimatedDurationMinutes === null
              ? 'No usable duration estimate could be calculated for this journey.'
              : `The ${journey.estimatedDurationMinutes}-minute estimate is rough and is based on straight-line
                distances between listed stop coordinates, an average speed of 15 km/h, and a 5-minute transfer wait
                where applicable.`}
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            It is not based on road distance, traffic, schedules, or measured jeepney
            travel times. The actual journey may take longer or shorter.
          </p>
          {Array.isArray(assumptions) && assumptions.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-text-muted">
              {assumptions.map((assumption) => (
                <li key={assumption}>{assumption}</li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-6" aria-labelledby="fare-details-title">
          <h3 id="fare-details-title" className="text-base font-semibold text-text">
            Fare
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Fare information is unavailable because the current preliminary dataset does
            not contain fare data. Para does not invent or estimate an official fare.
          </p>
        </section>
      </article>
    </section>
  )
}
