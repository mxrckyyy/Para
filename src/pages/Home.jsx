import { useEffect, useMemo, useState } from 'react'
import { ArrowUpDown, Info, Navigation } from 'lucide-react'
import { useLocation } from 'wouter'

import { StopAutocomplete } from '../components/search/StopAutocomplete.jsx'
import { useGeolocation } from '../hooks/useGeolocation.js'
import { formatDistanceMeters, haversineDistanceMeters } from '../utils/geoDistance.js'
import stopsData from '../data/stops.json'

const stops = stopsData.stops
const NEARBY_STOP_THRESHOLD_METRES = 2000

function findStop(id) {
  return stops.find((stop) => stop.id === id) ?? null
}

export default function Home() {
  const [, navigate] = useLocation()
  const geo = useGeolocation()

  const [originId, setOriginId] = useState(null)
  const [destinationId, setDestinationId] = useState(null)
  const [originQuery, setOriginQuery] = useState('')
  const [destinationQuery, setDestinationQuery] = useState('')
  const [originError, setOriginError] = useState(null)
  const [destinationError, setDestinationError] = useState(null)
  const [formError, setFormError] = useState(null)
  const [locationSuggestion, setLocationSuggestion] = useState(null)
  const [locationNotice, setLocationNotice] = useState(null)

  const originStop = useMemo(() => findStop(originId), [originId])
  const destinationStop = useMemo(() => findStop(destinationId), [destinationId])

  useEffect(() => {
    document.title = 'Para — Find a jeepney route'
  }, [])

  useEffect(() => {
    if (geo.status !== 'success' || !geo.position) return

    const nearest = stops
      .map((stop) => ({
        stop,
        distance: haversineDistanceMeters(
          geo.position.lat,
          geo.position.lng,
          stop.lat,
          stop.lng,
        ),
      }))
      .sort((first, second) => first.distance - second.distance)[0]

    if (nearest && nearest.distance <= NEARBY_STOP_THRESHOLD_METRES) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocationSuggestion(nearest)
      setLocationNotice(null)
    } else {
      setLocationSuggestion(null)
      setLocationNotice('No listed stop was found within 2 km of your location.')
    }
  }, [geo.status, geo.position])

  function handleOriginQueryChange(value) {
    setOriginQuery(value)
    setFormError(null)
  }

  function handleDestinationQueryChange(value) {
    setDestinationQuery(value)
    setFormError(null)
  }

  function handleOriginSelect(stop) {
    if (!stop) {
      setOriginId(null)
      return
    }
    setOriginId(stop.id)
    setOriginQuery(stop.name)
    setOriginError(null)
    setFormError(null)
  }

  function handleDestinationSelect(stop) {
    if (!stop) {
      setDestinationId(null)
      return
    }
    setDestinationId(stop.id)
    setDestinationQuery(stop.name)
    setDestinationError(null)
    setFormError(null)
  }

  function handleClearOrigin() {
    setOriginId(null)
    setOriginQuery('')
    setOriginError(null)
    setFormError(null)
  }

  function handleClearDestination() {
    setDestinationId(null)
    setDestinationQuery('')
    setDestinationError(null)
    setFormError(null)
  }

  function handleSwap() {
    const previousOriginId = originId
    const previousOriginQuery = originQuery
    setOriginId(destinationId)
    setOriginQuery(destinationQuery)
    setDestinationId(previousOriginId)
    setDestinationQuery(previousOriginQuery)
    setOriginError(null)
    setDestinationError(null)
    setFormError(null)
  }

  function handleRequestLocation() {
    setLocationSuggestion(null)
    setLocationNotice(null)
    geo.requestLocation()
  }

  function handleApplySuggestedStop() {
    if (!locationSuggestion) return
    setOriginId(locationSuggestion.stop.id)
    setOriginQuery(locationSuggestion.stop.name)
    setOriginError(null)
    setFormError(null)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setOriginError(null)
    setDestinationError(null)
    setFormError(null)

    const originIsValid = Boolean(
      originId &&
      originStop &&
      originQuery.trim().toLowerCase() === originStop.name.trim().toLowerCase(),
    )
    const destinationIsValid = Boolean(
      destinationId &&
      destinationStop &&
      destinationQuery.trim().toLowerCase() === destinationStop.name.trim().toLowerCase(),
    )

    const errors = {}
    if (!originIsValid) {
      errors.origin = 'Select an origin stop from the suggestions.'
    }
    if (!destinationIsValid) {
      errors.destination = 'Select a destination stop from the suggestions.'
    }
    if (originIsValid && destinationIsValid && originId === destinationId) {
      errors.destination = 'Origin and destination must be different.'
    }

    if (Object.keys(errors).length > 0) {
      if (errors.origin) setOriginError(errors.origin)
      if (errors.destination) setDestinationError(errors.destination)
      setFormError('Please correct the highlighted fields before searching.')
      return
    }

    const params = new URLSearchParams({
      from: originId,
      to: destinationId,
    })
    navigate(`/results?${params.toString()}`)
  }

  const locationMessage =
    geo.status === 'loading' ? 'Getting your location...' : (geo.error?.message ?? null)

  return (
    <section className="mx-auto max-w-2xl" aria-labelledby="home-title">
      <p className="text-sm font-medium text-primary">Route discovery</p>
      <h1 id="home-title" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        Find a jeepney route
      </h1>
      <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
        Choose where you are and where you are going. Para will prepare your origin and
        destination for a future route search.
      </p>

      <form className="mt-6" onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <StopAutocomplete
            id="origin"
            label="Origin"
            value={originQuery}
            onChange={handleOriginQueryChange}
            onSelect={handleOriginSelect}
            onClear={handleClearOrigin}
            excludedStopId={destinationId}
            error={originError}
            helperText="Where are you starting?"
          />

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap origin and destination"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-surface text-text-secondary transition-colors hover:bg-surface-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <ArrowUpDown className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <StopAutocomplete
            id="destination"
            label="Destination"
            value={destinationQuery}
            onChange={handleDestinationQueryChange}
            onSelect={handleDestinationSelect}
            onClear={handleClearDestination}
            excludedStopId={originId}
            error={destinationError}
            helperText="Where are you going?"
          />
        </div>

        <div className="mt-5 space-y-3">
          <button
            type="submit"
            className="min-h-11 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Find routes
          </button>

          <button
            type="button"
            onClick={handleRequestLocation}
            disabled={geo.status === 'loading'}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Use my location
          </button>
        </div>

        {formError && (
          <p className="mt-3 text-sm text-error" role="alert">
            {formError}
          </p>
        )}

        {(locationMessage || locationSuggestion || locationNotice) && (
          <div
            className="mt-4 rounded-md border border-border bg-surface-muted p-3"
            aria-live="polite"
          >
            {locationMessage && (
              <p className="text-sm text-text-secondary">{locationMessage}</p>
            )}
            {locationSuggestion && (
              <div className="space-y-2">
                <p className="text-sm text-text">
                  Nearest listed stop:{' '}
                  <span className="font-semibold">{locationSuggestion.stop.name}</span> (
                  {formatDistanceMeters(locationSuggestion.distance)} away)
                </p>
                <p className="text-xs text-text-muted">
                  This is a suggestion based on listed landmark coordinates, not
                  confirmation of an operating jeepney stop.
                </p>
                <button
                  type="button"
                  onClick={handleApplySuggestedStop}
                  className="min-h-10 rounded-md bg-primary-soft px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  Use as origin
                </button>
              </div>
            )}
            {locationNotice && (
              <p className="text-sm text-text-secondary">{locationNotice}</p>
            )}
          </div>
        )}
      </form>

      <div className="mt-8 rounded-lg border border-border bg-surface p-4">
        <div className="flex gap-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
          <div className="space-y-1 text-xs leading-5 text-text-muted">
            <p>Stop records are preliminary and unverified.</p>
            <p>
              Location suggestions use listed landmark coordinates and may not match an
              actual pickup point.
            </p>
            <p>
              No journey calculation, fare estimate, or live transit information is
              available yet.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-8 space-y-3" aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="text-base font-semibold">
          How Para works
        </h2>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>1. Choose an origin and destination stop.</li>
          <li>2. Compare direct and one-transfer journeys in a later phase.</li>
          <li>
            3. Review journey steps, stops, and route geometry on the map in a later
            phase.
          </li>
        </ul>
      </section>
    </section>
  )
}
