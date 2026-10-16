import { useCallback, useState } from 'react'

function getUnsupportedError() {
  return {
    code: 'unsupported',
    message: 'This browser does not support location services.',
  }
}

function mapGeolocationError(error) {
  if (!error) {
    return {
      code: 'unknown',
      message: 'Your location could not be determined.',
    }
  }

  switch (error.code) {
    case error.PERMISSION_DENIED:
      return {
        code: 'permission-denied',
        message:
          'Location permission was denied. You can still search by choosing stops manually.',
      }
    case error.POSITION_UNAVAILABLE:
      return {
        code: 'position-unavailable',
        message: 'Your location is currently unavailable.',
      }
    case error.TIMEOUT:
      return {
        code: 'timeout',
        message: 'The location request timed out. Please try again.',
      }
    default:
      return {
        code: 'unknown',
        message: 'Your location could not be determined.',
      }
  }
}

export function useGeolocation() {
  const [status, setStatus] = useState('idle')
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)

  const requestLocation = useCallback(() => {
    setError(null)
    setPosition(null)
    setStatus('loading')

    if (!('geolocation' in navigator)) {
      setError(getUnsupportedError())
      setStatus('error')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (result) => {
        setPosition({
          lat: result.coords.latitude,
          lng: result.coords.longitude,
          accuracy: result.coords.accuracy,
        })
        setStatus('success')
      },
      (result) => {
        setError(mapGeolocationError(result))
        setStatus('error')
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setPosition(null)
    setError(null)
  }, [])

  return {
    status,
    position,
    error,
    requestLocation,
    reset,
  }
}
