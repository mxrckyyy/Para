/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'

describe('app runtime', () => {
  it('renders without throwing', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    expect(() => {
      const root = createRoot(container)
      root.render(<App />)
    }).not.toThrow()
  })
})
