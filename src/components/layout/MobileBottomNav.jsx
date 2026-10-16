import { Link, useLocation } from 'wouter'
import { Bookmark, Home, Map } from 'lucide-react'

const NAV_ITEMS = [
  { path: '/', label: 'Search', icon: Home },
  { path: '/map', label: 'Map', icon: Map },
  { path: '/saved', label: 'Saved', icon: Bookmark },
]

function isActive(currentPath, itemPath) {
  if (itemPath === '/') return currentPath === '/'
  return currentPath === itemPath || currentPath.startsWith(itemPath + '/')
}

export function MobileBottomNav() {
  const [location] = useLocation()

  return (
    <nav
      aria-label="Mobile primary navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface md:hidden"
    >
      <div className="mx-auto flex max-w-6xl items-stretch gap-1 px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(location, item.path)
          return (
            <Link
              key={item.path}
              href={item.path}
              aria-current={active ? 'page' : undefined}
              className={[
                'flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                active ? 'text-primary' : 'text-text-muted hover:text-text',
              ].join(' ')}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
