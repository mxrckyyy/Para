import { expect, test } from '@playwright/test'

async function noHorizontalOverflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
}

test.describe('mobile home', () => {
  test('home renders and search form usable', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(200)
    await expect(
      page.getByRole('heading', { name: /find a jeepney route/i }),
    ).toBeVisible()
    await expect(page.getByLabel(/^origin$/i)).toBeVisible()
    await expect(page.getByLabel(/^destination$/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /find routes/i })).toBeVisible()
    expect(await noHorizontalOverflow(page)).toBe(true)
  })

  test('origin autocomplete opens and selects', async ({ page }) => {
    await page.goto('/')
    const origin = page.getByLabel(/^origin$/i)
    await origin.click()
    await origin.fill('sm')
    await page.waitForTimeout(800)
    await expect(page.getByRole('option', { name: /sm city cebu/i })).toBeVisible()
    await page
      .getByRole('option', { name: /sm city cebu/i })
      .first()
      .click()
    await expect(origin).toHaveValue(/sm city cebu/i)
  })

  test('destination autocomplete works', async ({ page }) => {
    await page.goto('/')
    const destination = page.getByLabel(/^destination$/i)
    await destination.click()
    await destination.fill('Lahug')
    await page.waitForTimeout(600)
    await expect(page.getByRole('option', { name: /jy square/i })).toBeVisible()
    await page
      .getByRole('option', { name: /jy square/i })
      .first()
      .click()
    await expect(destination).toHaveValue(/jy square/i)
  })

  test('theme toggle works on mobile', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /switch to dark mode/i }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)
    await page.getByRole('button', { name: /switch to light mode/i }).click()
    await expect(page.locator('html')).not.toHaveClass(/dark/)
  })
})

test.describe('mobile search flow', () => {
  test('valid supported search navigates to results', async ({ page }) => {
    await page.goto('/')
    const origin = page.getByLabel(/^origin$/i)
    await origin.click()
    await origin.fill('JY Square')
    await page.waitForTimeout(800)
    await page
      .getByRole('option', { name: /jy square/i })
      .first()
      .click()
    await page.waitForTimeout(300)
    await expect(origin).toHaveValue(/jy square/i)

    const destination = page.getByLabel(/^destination$/i)
    await destination.click()
    await destination.fill('SM')
    await page.waitForTimeout(600)
    await page
      .getByRole('option', { name: /sm city cebu/i })
      .first()
      .click()
    await page.waitForTimeout(300)
    await expect(destination).toHaveValue(/sm city cebu/i)

    await page.getByRole('button', { name: /find routes/i }).click()
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(
      /\/results\?from=stop-jy-square-lahug&to=stop-sm-city-cebu/,
    )
    await expect(page.getByRole('heading', { name: /route results/i })).toBeVisible()
    expect(await noHorizontalOverflow(page)).toBe(true)
  })

  test('invalid search shows validation', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /find routes/i }).click()
    await expect(page.getByText(/select an origin stop/i)).toBeVisible()
    await expect(page.getByText(/select a destination stop/i)).toBeVisible()
  })
})

test.describe('mobile results and detail', () => {
  test('results render and open detail', async ({ page }) => {
    await page.goto('/results?from=stop-jy-square-lahug&to=stop-sm-city-cebu')
    await page.waitForTimeout(300)
    await expect(page.getByRole('heading', { name: /route results/i })).toBeVisible()
    const link = page.getByRole('link', { name: /view details/i }).first()
    await link.scrollIntoViewIfNeeded()
    await link.click()
    await expect(page.getByRole('heading', { name: /journey details/i })).toBeVisible()
    await expect(page.getByText(/fare information is unavailable/i)).toBeVisible()
    expect(await noHorizontalOverflow(page)).toBe(true)
  })

  test('map renders on mobile', async ({ page }) => {
    await page.goto('/map?from=stop-jy-square-lahug&to=stop-sm-city-cebu')
    await page.waitForTimeout(500)
    await expect(page.getByRole('heading', { name: /^map$/i })).toBeVisible()
    await expect(page.locator('.para-map-marker').first()).toBeVisible()
    await expect(page.getByText(/route geometry is not available/i)).toBeVisible()
    expect(await noHorizontalOverflow(page)).toBe(true)
  })
})

test.describe('mobile saved journeys', () => {
  test('save, persist, and remove', async ({ page }) => {
    await page.goto('/results?from=stop-jy-square-lahug&to=stop-sm-city-cebu')
    await page.waitForTimeout(300)
    await page
      .getByRole('button', { name: /save journey/i })
      .first()
      .click()
    await page.goto('/saved')
    await expect(page.getByText(/1 saved journey/i)).toBeVisible()
    await page.reload()
    await expect(page.getByText(/1 saved journey/i)).toBeVisible()
    await page.getByRole('button', { name: /remove saved journey/i }).click()
    await expect(page.getByText(/no saved journeys/i)).toBeVisible()
  })
})

test.describe('mobile navigation', () => {
  test('direct route and back/forward', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(200)
    await page.goto('/saved')
    await page.waitForTimeout(200)
    await expect(page.getByRole('heading', { name: /saved routes/i })).toBeVisible()
    await page.goBack()
    await page.waitForTimeout(300)
    await expect(
      page.getByRole('heading', { name: /find a jeepney route/i }),
    ).toBeVisible()
  })
})

test.describe('mobile responsive viewports', () => {
  const widths = [320, 360, 375, 390, 412]
  for (const width of widths) {
    test(`home no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.goto('/')
      await page.waitForTimeout(200)
      expect(await noHorizontalOverflow(page), `${width}px home overflow`).toBe(true)
    })
  }
})
