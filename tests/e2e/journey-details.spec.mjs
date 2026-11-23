import { expect, test } from '@playwright/test'

test('results, route detail, map, and saved journey work', async ({ page }) => {
  await page.goto('/results?from=stop-jy-square-lahug&to=stop-sm-city-cebu')
  await expect(page.getByRole('heading', { name: /route results/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /view details/i }).first()).toBeVisible()
  await page
    .getByRole('link', { name: /view details/i })
    .first()
    .click()
  await expect(page.getByRole('heading', { name: /journey details/i })).toBeVisible()
  await expect(page.getByText(/fare information is unavailable/i)).toBeVisible()
  await expect(page.getByText(/preliminary/i).first()).toBeVisible()

  await page.goto('/map?from=stop-jy-square-lahug&to=stop-sm-city-cebu')
  await expect(page.getByRole('heading', { name: /^map$/i })).toBeVisible()
  await expect(page.locator('.para-map-marker').first()).toBeVisible()
  await expect(page.getByText(/marker legend/i)).toBeVisible()
  await expect(page.getByText(/route geometry is not available/i)).toBeVisible()

  await page.goto('/results?from=stop-jy-square-lahug&to=stop-sm-city-cebu')
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

test('invalid route and detail parameters fail gracefully', async ({ page }) => {
  await page.goto('/results?from=missing&to=stop-sm-city-cebu')
  await expect(
    page.getByText(/one or both stop ids are not in the preliminary dataset/i),
  ).toBeVisible()

  await page.goto(
    '/route?from=missing&to=stop-sm-city-cebu&journey=%7B%22type%22%3A%22direct%22%2C%22routes%22%3A%5B%22missing-route%22%5D%2C%22transfer%22%3Anull%7D',
  )
  await expect(
    page.getByRole('heading', {
      name: /journey details unavailable|journey unavailable/i,
    }),
  ).toBeVisible()
  await page.goto('/missing-test-route')
  await expect(page.getByRole('heading', { name: /page not found/i })).toBeVisible()
})
