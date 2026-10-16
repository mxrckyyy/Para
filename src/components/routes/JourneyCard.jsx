import { Bookmark } from 'lucide-react'
import { Link } from 'wouter'

import { encodeJourneyToken } from '../../utils/journeyLinks.js'
import routesData from '../../data/routes.json'
import stopsData from '../../data/stops.json'

const routes = routesData.routes
const stops = stopsData.stops
const routesById = new Map(routes.map((route) => [route.id, route]))
const stopsById = new Map(stops.map((stop) => [stop.id, stop]))

function hasFiniteDuration(value) {
  return Number.isFinite(value) && value >= 0
}

function formatDuration(value) {
  return hasFiniteDuration(value) ? `${Math.round(value)} min` : 'Unavailable'
}

function formatDistance(value) {
  if (!Number.isFinite(value) || value < 0) return null
  return value < 1000 ? `${Math.round(value)} m` : `${(value / 1000).toFixed(1)} km`
}

export function JourneyCard({ journey, fromId, toId, saved = false, onToggleSave }) {
  const routeIds = Array.isArray(journey?.routeIds) ? journey.routeIds : []
  const routeCodes = Array.isArray(journey?.routeCodes) ? journey.routeCodes : []
  const isDirect = journey?.type === 'direct'
  const transferStop = journey?.transferStopId
    ? stopsById.get(journey.transferStopId)
    : null
  const detailPath = `/route?from=${encodeURIComponent(fromId)}&to=${encodeURIComponent(toId)}&journey=${encodeJourneyToken(journey)}`
  const originName = stopsById.get(fromId)?.name ?? fromId
  const destinationName = stopsById.get(toId)?.name ?? toId
  const distanceLabel = formatDistance(journey?.estimatedDistanceMetres)

  return (
    <article className="rounded-lg border border-border bg-surface p-4 shadow-sm transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            {isDirect ? 'Direct journey' : '1-transfer journey'}
          </p>
          <h3 className="mt-1 text-base font-semibold text-text">
            {routeCodes.length > 0
              ? routeCodes.join(' + ')
              : (journey?.type ?? 'Journey')}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleSave?.(journey)}
            aria-pressed={saved}
            aria-label={
              saved
                ? `Remove saved journey from ${originName} to ${destinationName}`
                : `Save journey from ${originName} to ${destinationName}`
            }
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <Bookmark
              className={`h-5 w-5 ${saved ? 'fill-current text-primary' : ''}`}
              aria-hidden="true"
            />
          </button>
          <span
            className={[
              'rounded-md px-2 py-1 text-xs font-semibold',
              isDirect
                ? 'bg-primary-soft text-primary'
                : 'bg-surface-muted text-text-secondary',
            ].join(' ')}
          >
            {isDirect ? 'Direct' : 'Transfer'}
          </span>
        </div>
      </div>

      <p className="mt-3 text-sm text-text-secondary">
        {routeIds.map((routeId, index) => (
          <span key={routeId}>
            {index > 0 && <span aria-hidden="true"> → </span>}
            {routesById.get(routeId)?.name ?? routesById.get(routeId)?.code ?? routeId}
          </span>
        ))}
      </p>

      {!isDirect && transferStop && (
        <p className="mt-2 text-sm text-text">
          Transfer at <span className="font-medium">{transferStop.name}</span>
        </p>
      )}

      <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-text-muted">Estimated duration</dt>
          <dd className="font-medium text-text">
            {formatDuration(journey?.estimatedDurationMinutes)}
          </dd>
        </div>
        {distanceLabel && (
          <div>
            <dt className="text-text-muted">Straight-line distance</dt>
            <dd className="font-medium text-text">{distanceLabel}</dd>
          </div>
        )}
        <div>
          <dt className="text-text-muted">Fare</dt>
          <dd className="font-medium text-text">Unavailable</dd>
        </div>
        <div>
          <dt className="text-text-muted">Transfers</dt>
          <dd className="font-medium text-text">{journey?.transferCount ?? 0}</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-text-muted">
        Duration is an estimate. Fare is unavailable because no fare data is present.
      </p>

      {fromId && toId && (
        <Link
          href={detailPath}
          className="mt-4 inline-flex min-h-11 items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          View details
        </Link>
      )}
    </article>
  )
}
