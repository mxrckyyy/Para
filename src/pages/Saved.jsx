import { useEffect } from 'react'
import { ArrowLeft, Bookmark as BookmarkIcon } from 'lucide-react'
import { Link } from 'wouter'

import { JourneyCard } from '../components/routes/JourneyCard.jsx'
import { useSavedRoutes } from '../hooks/useSavedRoutes.js'

export default function Saved() {
  const savedRoutes = useSavedRoutes()

  useEffect(() => {
    document.title = 'Para — Saved routes'
  }, [])

  return (
    <section className="mx-auto max-w-2xl" aria-labelledby="saved-title">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to search
      </Link>

      <h1 id="saved-title" className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
        Saved routes
      </h1>
      <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
        Saved journeys are local, preliminary references. Para reconstructs them from the
        current data before displaying them here.
      </p>

      {!savedRoutes.storageAvailable && (
        <div className="mt-6 rounded-lg border border-border bg-surface p-5" role="alert">
          <p className="text-sm font-medium text-error">
            Saved routes cannot be accessed in this browser.
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            LocalStorage may be unavailable or restricted. Your search results and route
            details will still work.
          </p>
        </div>
      )}

      {savedRoutes.invalidEntryCount > 0 && (
        <div
          className="mt-6 rounded-lg border border-border bg-surface-muted p-4 text-sm text-text-secondary"
          role="note"
        >
          <p className="font-medium text-text">Some saved entries were ignored.</p>
          <p className="mt-1">
            {savedRoutes.invalidEntryCount} saved item
            {savedRoutes.invalidEntryCount === 1 ? '' : 's'} could not be reconstructed
            from the current route data and were not shown.
          </p>
        </div>
      )}

      {savedRoutes.storageAvailable && savedRoutes.savedItems.length === 0 && (
        <div className="mt-6 rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center">
          <BookmarkIcon className="mx-auto h-8 w-8 text-text-muted" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-text">You have no saved routes.</p>
          <p className="mt-1 text-sm text-text-muted">
            Save a supported journey from your results or journey-detail view.
          </p>
          <Link href="/" className="mt-4 inline-block text-sm font-medium text-primary">
            Find a route
          </Link>
        </div>
      )}

      {savedRoutes.storageAvailable && savedRoutes.savedItems.length > 0 && (
        <>
          <p className="mt-4 text-sm text-text-muted" aria-live="polite">
            {savedRoutes.savedRouteCountLabel}, reconstructed from current preliminary
            data.
          </p>
          <ul className="mt-6 space-y-4" aria-label="Saved journeys">
            {savedRoutes.savedItems.map(({ record, journey }) => (
              <li key={record.key}>
                <JourneyCard
                  journey={journey}
                  fromId={record.originStopId}
                  toId={record.destinationStopId}
                  saved
                  onToggleSave={() => savedRoutes.removeSavedJourney(journey)}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
