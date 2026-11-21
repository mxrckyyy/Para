import { lazy, Suspense } from 'react'
import { Route, Router, Switch } from 'wouter'

import { ThemeProvider } from './hooks/useTheme.js'
import { AppShell } from './components/layout/AppShell.jsx'
import HomePage from './pages/Home.jsx'
import ResultsPage from './pages/Results.jsx'
import NotFoundPage from './pages/NotFound.jsx'

const MapPage = lazy(() => import('./pages/Map.jsx'))
const RouteDetailPage = lazy(() => import('./pages/RouteDetail.jsx'))
const SavedPage = lazy(() => import('./pages/Saved.jsx'))

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppShell>
          <Suspense fallback={<div>Loading route view...</div>}>
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/results" component={ResultsPage} />
              <Route path="/route" component={RouteDetailPage} />
              <Route path="/map" component={MapPage} />
              <Route path="/saved" component={SavedPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </Suspense>
        </AppShell>
      </Router>
    </ThemeProvider>
  )
}

export default App
