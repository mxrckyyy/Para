import { Link, useLocation } from 'wouter'
import { Bookmark, Home, Map, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme.js'

const NAV_ITEMS = [
  { path: '/', label: 'Search', icon: Home },
  { path: '/map', label: 'Map', icon: Map },
  { path: '/saved', label: 'Saved', icon: Bookmark },
]

function isActive(currentPath, itemPath) {
  if (itemPath === '/') return currentPath === '/'
  return currentPath === itemPath || currentPath.startsWith(itemPath + '/')
}

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const [location] = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-text outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-md"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
          Para
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = isActive(location, item.path)
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={active ? 'page' : undefined}
                className={[
                  'inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                  active ? 'text-primary' : 'text-text-secondary hover:text-text',
                ].join(' ')}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  )
}
