import { AxeBuilder } from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

async function scan(page) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()
  return results
}

function assertNoViolations(results, label) {
  const violations = results.violations || []
  if (violations.length > 0) {
    const summary = violations
      .map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s) - ${v.help}`)
      .join('\n')
    console.error(`A11Y VIOLATIONS [${label}]:\n${summary}`)
  }
  expect(violations, `accessibility violations on ${label}`).toEqual([])
}

test.describe('accessibility - light theme', () => {
  test('home (light)', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    })
    await page.waitForTimeout(200)
    const results = await scan(page)
    assertNoViolations(results, 'home light')
  })

  test('results (light)', async ({ page }) => {
    await page.goto('/results?from=stop-jy-square-lahug&to=stop-sm-city-cebu')
    await page.waitForTimeout(300)
    const results = await scan(page)
    assertNoViolations(results, 'results light')
  })

  test('journey details (light)', async ({ page }) => {
    await page.goto('/results?from=stop-jy-square-lahug&to=stop-sm-city-cebu')
    await page.waitForTimeout(300)
    await page
      .getByRole('link', { name: /view details/i })
      .first()
      .click()
    await page.waitForTimeout(300)
    const results = await scan(page)
    assertNoViolations(results, 'journey details light')
  })

  test('map (light)', async ({ page }) => {
    await page.goto('/map?from=stop-jy-square-lahug&to=stop-sm-city-cebu')
    await page.waitForTimeout(500)
    const results = await scan(page)
    assertNoViolations(results, 'map light')
  })

  test('saved (light)', async ({ page }) => {
    await page.goto('/saved')
    await page.waitForTimeout(200)
    const results = await scan(page)
    assertNoViolations(results, 'saved light')
  })

  test('not found (light)', async ({ page }) => {
    await page.goto('/no-such-page')
    await page.waitForTimeout(200)
    const results = await scan(page)
    assertNoViolations(results, 'not found light')
  })
})

test.describe('accessibility - dark theme', () => {
  test('home (dark)', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    })
    await page.waitForTimeout(200)
    const results = await scan(page)
    assertNoViolations(results, 'home dark')
  })

  test('results (dark)', async ({ page }) => {
    await page.goto('/results?from=stop-jy-square-lahug&to=stop-sm-city-cebu')
    await page.evaluate(() => {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    })
    await page.waitForTimeout(300)
    const results = await scan(page)
    assertNoViolations(results, 'results dark')
  })
})

test.describe('accessibility - ui states', () => {
  test('home validation errors', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /find routes/i }).click()
    await page.waitForTimeout(200)
    const results = await scan(page)
    assertNoViolations(results, 'home validation errors')
  })

  test('home autocomplete open', async ({ page }) => {
    await page.goto('/')
    const origin = page.getByLabel(/^origin$/i)
    await origin.fill('sm')
    await origin.focus()
    await page.waitForTimeout(300)
    const results = await scan(page)
    assertNoViolations(results, 'home autocomplete open')
  })

  test('empty results', async ({ page }) => {
    await page.goto('/results?from=stop-sm-city-cebu&to=stop-jy-square-lahug')
    await page.waitForTimeout(300)
    const results = await scan(page)
    assertNoViolations(results, 'empty results')
  })
})
