import { expect, test } from '@playwright/test'

test('theme toggle and direct route refresh work', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /switch to dark mode/i }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.getByRole('button', { name: /switch to light mode/i }).click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)

  await page.goto('/saved')
  await page.reload()
  await expect(page.getByRole('heading', { name: /saved routes/i })).toBeVisible()
  await page.goBack()
  await expect(page.getByRole('heading', { name: /find a jeepney route/i })).toBeVisible()
})

test('responsive pages do not overflow horizontally', async ({ page }) => {
  const widths = [320, 375, 390, 768, 1024, 1280, 1440]
  for (const width of widths) {
    await page.setViewportSize({ width, height: 800 })
    await page.goto('/')
    const homeOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(homeOverflow, `${width}px home overflow`).toBe(false)
  }

  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto('/map?from=stop-jy-square-lahug&to=stop-sm-city-cebu')
  const mapOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  )
  expect(mapOverflow).toBe(false)
})
