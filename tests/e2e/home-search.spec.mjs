import { expect, test } from '@playwright/test'

test('home renders and validates incomplete search', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /find a jeepney route/i })).toBeVisible()
  await expect(page.getByLabel(/^origin$/i)).toBeVisible()
  await expect(page.getByLabel(/^destination$/i)).toBeVisible()
  await page.getByRole('button', { name: /find routes/i }).click()
  await expect(page.getByText(/select an origin stop/i)).toBeVisible()
  await expect(page.getByText(/select a destination stop/i)).toBeVisible()
})

test('autocomplete and swap work', async ({ page }) => {
  await page.goto('/')
  const origin = page.getByLabel(/^origin$/i)
  await origin.fill('sm')
  await origin.focus()
  await page.waitForTimeout(400)
  await expect(page.getByRole('option', { name: /sm city cebu/i })).toBeVisible()
  await page
    .getByRole('option', { name: /sm city cebu/i })
    .first()
    .click()
  await expect(origin).toHaveValue(/sm city cebu/i)

  const destination = page.getByLabel(/^destination$/i)
  await destination.fill('Lahug')
  await destination.focus()
  await page.waitForTimeout(400)
  await page
    .getByRole('option', { name: /jy square/i })
    .first()
    .click()
  await expect(destination).toHaveValue(/jy square/i)

  await page.getByRole('button', { name: /swap origin and destination/i }).click()
  await expect(origin).toHaveValue(/jy square/i)
  await expect(destination).toHaveValue(/sm city cebu/i)
})

test('valid supported search navigates to results', async ({ page }) => {
  await page.goto('/')
  const origin = page.getByLabel(/^origin$/i)
  await origin.fill('JY Square')
  await origin.focus()
  await page.waitForTimeout(600)
  await page
    .getByRole('option', { name: /jy square/i })
    .first()
    .click()
  await page.waitForTimeout(600)
  const destination = page.getByLabel(/^destination$/i)
  await destination.fill('SM')
  await destination.focus()
  await page.waitForTimeout(600)
  await page
    .getByRole('option', { name: /sm city cebu/i })
    .first()
    .click()
  await page.waitForTimeout(600)
  await page.getByRole('button', { name: /find routes/i }).click()
  await page.waitForTimeout(1000)
  await expect(page).toHaveURL(
    /\/results\?from=stop-jy-square-lahug&to=stop-sm-city-cebu/,
  )
  await expect(page.getByRole('heading', { name: /route results/i })).toBeVisible()
})
