import { useEffect } from 'react'
import { useLocation } from 'wouter'

import { Header } from './Header.jsx'
import { MobileBottomNav } from './MobileBottomNav.jsx'

export function AppShell({ children }) {
  const [location] = useLocation()

  useEffect(() => {
    const main = document.getElementById('main-content')
    if (main) main.focus()
  }, [location])

  return (
    <div className="min-h-screen bg-bg text-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-text focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl px-4 py-6 outline-none sm:py-8 md:px-6 lg:px-8"
      >
        <div className="w-full">{children}</div>
      </main>
      <MobileBottomNav />
    </div>
  )
}
