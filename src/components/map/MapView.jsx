import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

import mapData from '../../data/stops.json'
import routesData from '../../data/routes.json'
import { getSupportedGeometryForRoutes, getValidMapStops } from '../../utils/mapData.js'

function createStopIcon(type) {
  const labels = {
    origin: 'O',
    destination: 'D',
    transfer: 'T',
    listed: 'S',
  }

  return L.divIcon({
    html: `<span class="para-map-marker para-map-marker--${type}">${labels[type] ?? 'S'}</span>`,
    className: 'para-map-marker-wrapper',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -16],
  })
}

function getMarkerType(stopId, relevantIds) {
  if (stopId === relevantIds.originId) return 'origin'
  if (stopId === relevantIds.destinationId) return 'destination'
  if (relevantIds.transferIds.includes(stopId)) return 'transfer'
  return 'listed'
}

function ViewportController({ relevantStops, allStops }) {
  const map = useMap()

  useEffect(() => {
    const targetStops = relevantStops.length > 0 ? relevantStops : allStops
    if (targetStops.length === 0) {
      map.setView([10.3, 123.9], 12)
      return
    }

    const bounds = L.latLngBounds(targetStops.map((stop) => [stop.lat, stop.lng]))
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [24, 24], maxZoom: 16, animate: false })
    }
  }, [allStops, map, relevantStops])

  return null
}

export default function MapView({
  originId = null,
  destinationId = null,
  transferId = null,
  routeIds = [],
  title = 'Map',
}) {
  const mapRef = useRef(null)
  const [mapError, setMapError] = useState(null)

  const relevantIds = useMemo(
    () => ({
      originId,
      destinationId,
      transferIds: transferId ? [transferId] : [],
    }),
    [destinationId, originId, transferId],
  )

  const allStops = useMemo(() => getValidMapStops(mapData.stops), [])
  const relevantStops = useMemo(() => {
    const ids = new Set([originId, destinationId, transferId].filter(Boolean))
    return allStops.filter((stop) => ids.has(stop.id))
  }, [allStops, destinationId, originId, transferId])

  const supportedGeometry = useMemo(
    () =>
      getSupportedGeometryForRoutes(
        Array.isArray(routeIds) ? routeIds : [],
        routesData.routes,
      ),
    [routeIds],
  )

  function resetView() {
    const map = mapRef.current
    if (!map) return
    if (relevantStops.length > 0) {
      const bounds = L.latLngBounds(relevantStops.map((stop) => [stop.lat, stop.lng]))
      if (bounds.isValid())
        map.fitBounds(bounds, { padding: [24, 24], maxZoom: 16, animate: false })
    } else if (allStops.length > 0) {
      const bounds = L.latLngBounds(allStops.map((stop) => [stop.lat, stop.lng]))
      if (bounds.isValid())
        map.fitBounds(bounds, { padding: [24, 24], maxZoom: 16, animate: false })
    }
  }

  if (mapError) {
    return (
      <div
        className="rounded-lg border border-border bg-surface p-4 text-sm text-text-secondary"
        role="alert"
      >
        The map could not be loaded. You can still use the route and stop information
        elsewhere.
      </div>
    )
  }

  if (allStops.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-4 text-sm text-text-secondary">
        No valid mapped stop coordinates are available.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
        {title}
      </p>
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <MapContainer
          ref={mapRef}
          center={[10.31, 123.905]}
          zoom={12}
          scrollWheelZoom={false}
          className="h-[420px] w-full sm:h-[520px]"
          aria-label="Interactive map of listed stop locations"
          whenCreated={(map) => {
            map.on('loaderror', () => setMapError(true))
          }}
        >
          <ViewportController allStops={allStops} relevantStops={relevantStops} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {allStops.map((stop) => (
            <Marker
              key={stop.id}
              position={[stop.lat, stop.lng]}
              icon={createStopIcon(getMarkerType(stop.id, relevantIds))}
              alt={`Map marker for ${stop.name}`}
            >
              <Popup>
                <strong>{stop.name}</strong>
                <br />
                Preliminary, unverified stop record
                {stop.id === originId && (
                  <>
                    <br />
                    Origin
                  </>
                )}
                {stop.id === destinationId && (
                  <>
                    <br />
                    Destination
                  </>
                )}
                {stop.id === transferId && (
                  <>
                    <br />
                    Transfer stop
                  </>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={resetView}
          className="min-h-10 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text transition-colors hover:bg-surface-muted"
        >
          Fit selected stops
        </button>
        <p className="text-xs text-text-muted" aria-live="polite">
          {relevantStops.length > 0
            ? `Showing ${relevantStops.length} selected stop${relevantStops.length === 1 ? '' : 's'} plus all listed stop locations.`
            : 'Showing all listed stop locations.'}
        </p>
      </div>

      <div
        className="rounded-lg border border-border bg-surface-muted p-3 text-xs leading-5 text-text-muted"
        role="note"
      >
        <p className="font-medium text-text">Stop data is preliminary and unverified.</p>
        <p className="mt-1">
          {supportedGeometry
            ? 'Route geometry from an explicit supported field is shown separately where available.'
            : 'Route geometry is not available yet. This map shows listed stop locations only.'}
        </p>
        <p className="mt-1">
          Map tiles load from the public OpenStreetMap tile service and require an
          internet connection.
        </p>
      </div>

      <section aria-labelledby="map-legend-title">
        <h3 id="map-legend-title" className="text-sm font-semibold text-text">
          Marker legend
        </h3>
        <ul className="mt-2 grid gap-2 text-sm text-text-secondary sm:grid-cols-2">
          <li className="flex items-center gap-2">
            <span className="para-map-marker para-map-marker--origin" aria-hidden="true">
              O
            </span>
            Origin stop
          </li>
          <li className="flex items-center gap-2">
            <span
              className="para-map-marker para-map-marker--destination"
              aria-hidden="true"
            >
              D
            </span>
            Destination stop
          </li>
          <li className="flex items-center gap-2">
            <span
              className="para-map-marker para-map-marker--transfer"
              aria-hidden="true"
            >
              T
            </span>
            Transfer stop
          </li>
          <li className="flex items-center gap-2">
            <span className="para-map-marker para-map-marker--listed" aria-hidden="true">
              S
            </span>
            Other listed stop
          </li>
        </ul>
      </section>

      <section aria-labelledby="map-stop-list-title">
        <h3 id="map-stop-list-title" className="text-sm font-semibold text-text">
          Listed stop locations
        </h3>
        <ul className="mt-2 space-y-2 text-sm text-text-secondary">
          {relevantStops.length > 0 ? (
            relevantStops.map((stop) => (
              <li
                key={stop.id}
                className="rounded-md border border-border bg-surface p-2"
              >
                {stop.name}
              </li>
            ))
          ) : allStops.length > 0 ? (
            <li className="rounded-md border border-border bg-surface p-2">
              {allStops.length} listed locations available
            </li>
          ) : (
            <li>No listed stop locations are available.</li>
          )}
        </ul>
      </section>
    </div>
  )
}
