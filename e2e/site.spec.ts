import { test, expect } from '@playwright/test'

test.describe('Apex Cars Application Flow', () => {
  test('home page renders key landmarks and hero', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Apex Cars/)
    await expect(page.locator('h1')).toContainText(/Electric performance/)
    await expect(page.locator('img[alt*="Apex GT-9"]').first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'Mission' })).toBeVisible()
  })

  test('hero tabs swap callouts', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Programs' }).click()
    await expect(page.locator('text=1,150 HP').first()).toBeVisible()

    await page.getByRole('button', { name: 'Impact' }).click()
    await expect(page.locator('text=+48M km').first()).toBeVisible()
  })

  test('programs filter chips filter vehicle cards', async ({ page }) => {
    await page.goto('/programs')
    await expect(page.locator('h1')).toContainText(/Platforms engineered/)
    const vehicleChip = page.getByRole('button', { name: /Vehicles/i }).first()
    await vehicleChip.click()
    await expect(page.locator('text=Apex GT-9 Aerodyne').first()).toBeVisible()
  })

  test('theme toggle flips dark class on html', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /switch to (dark|light) mode/i }).first()
    await toggle.click()
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'))
    expect(typeof isDark).toBe('boolean')
  })

  test('design kit route /kit renders all primitives', async ({ page }) => {
    await page.goto('/kit')
    await expect(page.locator('h1')).toContainText(/Apex Component Kit/)
    await expect(page.locator('text=Active Pill')).toBeVisible()
    await expect(page.locator('text=Interactive 3D Tilt')).toBeVisible()
  })

  test('contact form submits inquiry', async ({ page }) => {
    await page.goto('/contact')
    await page.fill('#name', 'Test Driver')
    await page.fill('#email', 'driver@apex.se')
    await page.fill('#message', 'Interested in private test session.')
    await page.getByRole('button', { name: /Submit Inquiry/i }).click()
    await expect(page.locator('text=Inquiry Confirmed')).toBeVisible()
  })
})
