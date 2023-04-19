import type { Page } from '@playwright/test'
import { test, expect } from '@playwright/test'
import serviceMock from '../types/service-mock'
import { mock } from '../support/mock'
import percySnapshot from '@percy/playwright'

const appConfigMock = {
  logLevel: 'debug',
  vegaHome: '',
  defaultNetwork: 'test',
  telemetry: {
    consentAsked: false,
    enabled: true,
  },
}

test.describe('Telemetry dialog elements', () => {
  // 0001-WALL-003 - if the app sends telemetry/analytics: must be prompted to opt into (or stay out of) analytics
  let page: Page
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await mock(page, serviceMock.GetAppConfig, appConfigMock)
    await page.goto('/')
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('should see telemetry dialog', async () => {
    await expect(page.getByTestId('telemetry-option-dialog')).toBeVisible()
  })

  test('should see telemetry dialog title', async () => {
    const dialog = page.getByTestId('telemetry-option-dialog').locator('h2')
    await Promise.all([
      expect(dialog).toBeVisible(),
      expect(dialog).toHaveText('Report bugs and crashes'),
    ])
  })

  test('should see info text', async () => {
    await expect(
      page.getByTestId('telemetry-option-form').locator('p')
    ).toHaveText('Selecting yes will help developers improve the software')
  })

  test('should see form options', async () => {
    const radio = page
      .getByTestId('telemetry-option-form')
      .locator('[role="radio"]')
    await Promise.all([
      expect(await radio.count()).toEqual(2),
      expect(radio.first()).toHaveAttribute('value', 'no'),
      expect(radio.first()).toHaveAttribute('data-state', 'checked'),
      expect(radio.last()).toHaveAttribute('value', 'yes'),
      expect(radio.last()).toHaveAttribute('data-state', 'unchecked'),
    ])
  })

  test('should see form button', async () => {
    await percySnapshot(page, 'onboarding_telemetry')
    await expect(page.getByTestId('telemetry-option-continue')).toHaveText(
      'Continue'
    )
  })
})

test.describe('Telemetry dialog action', () => {
  test.beforeEach(async ({ page }) => {
    await mock(page, serviceMock.GetAppConfig, appConfigMock)
    await page.goto('/')
  })

  test('should be able to submit telemetry form', async ({ page }) => {
    await page.getByTestId('telemetry-option-form').locator('#yes').click()
    await page.getByTestId('telemetry-option-continue').click()
    await expect(page.getByTestId('telemetry-option-dialog')).toBeHidden()
  })
})
