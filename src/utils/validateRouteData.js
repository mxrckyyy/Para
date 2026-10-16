const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value)
}

function formatRecordLabel(kind, record, index) {
  const id = typeof record?.id === 'string' && record.id.trim() ? record.id : null
  return id ? `${kind} "${id}" (index ${index})` : `${kind} at index ${index}`
}

function addError(errors, message) {
  errors.push(message)
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key)
}

function validateDate(value, label, errors) {
  if (value === null) return
  if (typeof value !== 'string' || !ISO_DATE_PATTERN.test(value)) {
    addError(errors, `${label} must be null or an ISO date string in YYYY-MM-DD format.`)
    return
  }

  const parsed = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    addError(errors, `${label} is not a valid calendar date.`)
  }
}

function validateStringField(value, label, errors, required = true) {
  if (value === undefined && !required) return
  if (typeof value !== 'string' || value.trim() === '') {
    addError(errors, `${label} must be a non-empty string.`)
  }
}

function normalizeInputs(stopsInput, routesInput) {
  if (routesInput !== undefined) {
    return { stopsData: stopsInput, routesData: routesInput }
  }

  if (stopsInput && typeof stopsInput === 'object') {
    if (stopsInput.stopsData || stopsInput.routesData) {
      return {
        stopsData: stopsInput.stopsData,
        routesData: stopsInput.routesData,
      }
    }
  }

  return { stopsData: stopsInput, routesData: undefined }
}

export function validateRouteData(stopsInput, routesInput) {
  const errors = []
  const { stopsData, routesData } = normalizeInputs(stopsInput, routesInput)

  if (!stopsData || typeof stopsData !== 'object' || Array.isArray(stopsData)) {
    addError(errors, 'Stops data must be an object.')
  }
  if (
    routesData !== undefined &&
    (!routesData || typeof routesData !== 'object' || Array.isArray(routesData))
  ) {
    addError(errors, 'Routes data must be an object.')
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  const stops = stopsData.stops
  if (!Array.isArray(stops)) {
    addError(errors, 'Stops data must contain a "stops" array.')
  }

  const routes = routesData === undefined ? [] : routesData.routes
  if (routesData !== undefined && !Array.isArray(routes)) {
    addError(errors, 'Routes data must contain a "routes" array.')
  }

  const stopIds = new Set()
  const duplicateStopIds = new Set()

  if (Array.isArray(stops)) {
    stops.forEach((stop, index) => {
      const label = formatRecordLabel('Stop', stop, index)

      if (!stop || typeof stop !== 'object' || Array.isArray(stop)) {
        addError(errors, `${label} must be an object.`)
        return
      }

      validateStringField(stop.id, `${label}: "id"`, errors)
      validateStringField(stop.name, `${label}: "name"`, errors)
      validateStringField(stop.source, `${label}: "source"`, errors)

      if (typeof stop.verified !== 'boolean') {
        addError(errors, `${label}: "verified" must be a boolean.`)
      }

      if (!hasOwn(stop, 'lastReviewed')) {
        addError(errors, `${label}: missing required field "lastReviewed".`)
      } else {
        validateDate(stop.lastReviewed, `${label}: "lastReviewed"`, errors)
      }

      if (typeof stop.aliases !== 'undefined') {
        if (
          !Array.isArray(stop.aliases) ||
          stop.aliases.some((alias) => typeof alias !== 'string')
        ) {
          addError(
            errors,
            `${label}: "aliases" must be an array of strings when provided.`,
          )
        }
      }

      if (!isFiniteNumber(stop.lat) || stop.lat < -90 || stop.lat > 90) {
        addError(errors, `${label}: "lat" must be a finite number between -90 and 90.`)
      }
      if (!isFiniteNumber(stop.lng) || stop.lng < -180 || stop.lng > 180) {
        addError(errors, `${label}: "lng" must be a finite number between -180 and 180.`)
      }

      if (hasOwn(stop, 'notes') && typeof stop.notes !== 'string') {
        addError(errors, `${label}: "notes" must be a string when provided.`)
      }

      if (typeof stop.id === 'string') {
        if (stopIds.has(stop.id)) duplicateStopIds.add(stop.id)
        stopIds.add(stop.id)
      }
    })

    duplicateStopIds.forEach((id) => {
      addError(errors, `Duplicate stop id "${id}" found.`)
    })
  }

  const routeIds = new Set()
  const duplicateRouteIds = new Set()

  if (Array.isArray(routes)) {
    routes.forEach((route, index) => {
      const label = formatRecordLabel('Route', route, index)

      if (!route || typeof route !== 'object' || Array.isArray(route)) {
        addError(errors, `${label} must be an object.`)
        return
      }

      validateStringField(route.id, `${label}: "id"`, errors)
      validateStringField(route.code, `${label}: "code"`, errors)
      validateStringField(route.name, `${label}: "name"`, errors)
      validateStringField(route.source, `${label}: "source"`, errors)

      if (typeof route.verified !== 'boolean') {
        addError(errors, `${label}: "verified" must be a boolean.`)
      }

      if (!hasOwn(route, 'lastReviewed')) {
        addError(errors, `${label}: missing required field "lastReviewed".`)
      } else {
        validateDate(route.lastReviewed, `${label}: "lastReviewed"`, errors)
      }

      if (typeof route.color !== 'string' || !HEX_COLOR_PATTERN.test(route.color)) {
        addError(errors, `${label}: "color" must be a hexadecimal color such as #15803d.`)
      }

      if (!Array.isArray(route.stopIds) || route.stopIds.length < 2) {
        addError(
          errors,
          `${label}: "stopIds" must be an array with at least two stop references.`,
        )
      } else {
        route.stopIds.forEach((stopId) => {
          if (typeof stopId !== 'string' || stopId.trim() === '') {
            addError(
              errors,
              `${label}: every "stopIds" entry must be a non-empty string.`,
            )
          } else if (stopIds.size > 0 && !stopIds.has(stopId)) {
            addError(errors, `${label}: references unknown stop id "${stopId}".`)
          }
        })
      }

      if (route.path !== null && route.path !== undefined) {
        if (!Array.isArray(route.path)) {
          addError(
            errors,
            `${label}: "path" must be null or an array of coordinate pairs.`,
          )
        } else {
          route.path.forEach((point, pointIndex) => {
            if (
              !Array.isArray(point) ||
              point.length !== 2 ||
              !isFiniteNumber(point[0]) ||
              !isFiniteNumber(point[1]) ||
              point[0] < -90 ||
              point[0] > 90 ||
              point[1] < -180 ||
              point[1] > 180
            ) {
              addError(
                errors,
                `${label}: path point ${pointIndex} must be [latitude, longitude] with valid ranges.`,
              )
            }
          })
        }
      }

      if (hasOwn(route, 'direction')) {
        const direction = route.direction
        if (direction !== null && typeof direction !== 'string') {
          addError(errors, `${label}: "direction" must be null or a string.`)
        }
      }

      if (hasOwn(route, 'estimatedFarePhp')) {
        const fare = route.estimatedFarePhp
        if (fare !== null && (!isFiniteNumber(fare) || fare < 0)) {
          addError(
            errors,
            `${label}: "estimatedFarePhp" must be null or a non-negative number.`,
          )
        }
      }

      if (hasOwn(route, 'estimatedTravelTimeMinutes')) {
        const duration = route.estimatedTravelTimeMinutes
        if (duration !== null && (!isFiniteNumber(duration) || duration < 0)) {
          addError(
            errors,
            `${label}: "estimatedTravelTimeMinutes" must be null or a non-negative number.`,
          )
        }
      }

      if (hasOwn(route, 'aliases')) {
        if (
          !Array.isArray(route.aliases) ||
          route.aliases.some((alias) => typeof alias !== 'string')
        ) {
          addError(
            errors,
            `${label}: "aliases" must be an array of strings when provided.`,
          )
        }
      }

      if (hasOwn(route, 'notes') && typeof route.notes !== 'string') {
        addError(errors, `${label}: "notes" must be a string when provided.`)
      }

      if (typeof route.id === 'string') {
        if (routeIds.has(route.id)) duplicateRouteIds.add(route.id)
        routeIds.add(route.id)
      }
    })

    duplicateRouteIds.forEach((id) => {
      addError(errors, `Duplicate route id "${id}" found.`)
    })
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
