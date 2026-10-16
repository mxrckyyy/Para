import { createElement, createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'para_theme'

const ThemeContext = createContext(null)

function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage can be blocked; fall through to system preference.
  }
  return null
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark')
      ? 'dark'
      : (readStoredTheme() ?? 'light'),
  )

  useEffect(() => {
    const root = document.documentElement
    const apply = (nextTheme) => {
      root.classList.toggle('dark', nextTheme === 'dark')
      try {
        window.localStorage.setItem(STORAGE_KEY, nextTheme)
      } catch {
        // Ignore persistence failures in restricted environments.
      }
    }

    apply(theme)

    if (!readStoredTheme()) {
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (event) => {
        setTheme(event.matches ? 'dark' : 'light')
      }
      media.addEventListener('change', handler)
      return () => media.removeEventListener('change', handler)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return createElement(
    ThemeContext.Provider,
    { value: { theme, setTheme, toggleTheme } },
    children,
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
