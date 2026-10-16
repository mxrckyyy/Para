import { useEffect, useMemo, useRef, useState } from 'react'
import { X } from 'lucide-react'

import stopsData from '../../data/stops.json'

const stops = stopsData.stops

const DEBOUNCE_MS = 120

function normaliseText(value) {
  return value.trim().toLowerCase()
}

function stopMatchesQuery(stop, query) {
  if (!query) return false
  const terms = [stop.name, ...(stop.aliases ?? [])]
  return terms.some((term) => normaliseText(term).includes(query))
}

export function StopAutocomplete({
  id,
  label,
  value,
  onChange,
  onSelect,
  onClear,
  excludedStopId,
  error,
  helperText,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState(value)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(value)
    }, DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [value])

  const suggestions = useMemo(() => {
    const query = normaliseText(debouncedQuery)
    if (!query) return []

    return stops
      .filter((stop) => stop.id !== excludedStopId)
      .filter((stop) => stopMatchesQuery(stop, query))
      .slice(0, 8)
  }, [debouncedQuery, excludedStopId])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(suggestions.length > 0 ? 0 : -1)
  }, [suggestions])

  useEffect(() => {
    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [])

  const listboxId = `${id}-listbox`
  const errorId = `${id}-error`
  const helperId = `${id}-helper`
  const activeDescendant =
    isOpen && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined

  function selectStop(stop) {
    setIsOpen(false)
    setActiveIndex(-1)
    onChange(stop.name)
    onSelect(stop)
    requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
  }

  function handleInputChange(event) {
    onChange(event.target.value)
    setIsOpen(true)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((current) => {
        if (suggestions.length === 0) return -1
        return Math.min(current + 1, suggestions.length - 1)
      })
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((current) => {
        if (suggestions.length === 0) return -1
        return Math.max(current - 1, 0)
      })
      return
    }

    if (event.key === 'Enter') {
      if (isOpen && activeIndex >= 0 && suggestions[activeIndex]) {
        event.preventDefault()
        selectStop(suggestions[activeIndex])
      }
      return
    }

    if (event.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  function handleBlur() {
    setTimeout(() => {
      setIsOpen(false)
    }, 100)
  }

  const describedBy =
    [error ? errorId : null, helperText ? helperId : null].filter(Boolean).join(' ') ||
    undefined

  return (
    <div className="space-y-1" ref={rootRef}>
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          autoComplete="off"
          spellCheck={false}
          value={value}
          aria-expanded={isOpen && suggestions.length > 0}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-activedescendant={activeDescendant}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={helperText}
          className={[
            'min-h-11 w-full rounded-md border bg-surface px-3 py-2 text-sm text-text',
            'placeholder:text-text-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
            error ? 'border-error' : 'border-border',
            value ? 'pr-11' : 'pr-3',
          ].join(' ')}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              onClear()
              requestAnimationFrame(() => inputRef.current?.focus())
            }}
            aria-label={`Clear ${label.toLowerCase()}`}
            className="absolute inset-y-0 right-1 flex min-h-11 min-w-11 items-center justify-center rounded-md text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={helperId} className="text-sm text-text-muted">
          {helperText}
        </p>
      )}

      {isOpen && normaliseText(debouncedQuery) && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={`${label} suggestions`}
          className="mt-1 max-h-60 overflow-auto rounded-md border border-border bg-surface shadow-sm"
        >
          {suggestions.length > 0 ? (
            suggestions.map((stop, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={stop.id}
                  id={`${id}-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  tabIndex={-1}
                  onClick={() => selectStop(stop)}
                  className={[
                    'flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                    isActive
                      ? 'bg-primary-soft text-primary'
                      : 'text-text hover:bg-surface-muted',
                  ].join(' ')}
                >
                  <span className="font-medium">{stop.name}</span>
                  {stop.aliases?.length ? (
                    <span className="truncate text-xs text-text-muted">
                      {stop.aliases.join(', ')}
                    </span>
                  ) : null}
                </button>
              )
            })
          ) : (
            <p className="px-3 py-2.5 text-sm text-text-muted">
              No matching stops found.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
