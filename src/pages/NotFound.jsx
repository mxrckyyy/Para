import { useEffect } from 'react'
import { Link } from 'wouter'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Para — Page not found'
  }, [])

  return (
    <section className="mx-auto max-w-2xl text-center" aria-labelledby="not-found-title">
      <h1 id="not-found-title" className="text-3xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 text-sm leading-6 text-text-secondary">
        The page you requested does not exist or may have moved.
      </p>
      <Link href="/" className="mt-6 inline-block text-sm font-medium text-primary">
        Return to search
      </Link>
    </section>
  )
}
