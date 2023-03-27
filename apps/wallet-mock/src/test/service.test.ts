import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import { mock } from '../support/mock'

test.describe('Service status', () => {
  let page: Page
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    await mock(page)
    await page.goto('/')
  })
  test('should display unhealthy status', async () => {
    await page.evaluate(() => {
      window.document.body.dispatchEvent(
        new CustomEvent('service_is_unhealthy')
      )
    })

    await expect(page.getByTestId('service-status-unhealthy')).toHaveText(
      'Wallet Service: Unhealthy Restart'
    )
  })

  test('should display healthy status', async () => {
    await page.evaluate(() => {
      window.document.body.dispatchEvent(new CustomEvent('service_is_healthy'))
    })
    await expect(page.getByTestId('service-status')).toHaveText(
      'Wallet Service: test on http://localhost:1789'
    )
  })

  test('should display unreachable status', async () => {
    await page.evaluate(() => {
      window.document.body.dispatchEvent(new CustomEvent('service_unreachable'))
    })
    await expect(page.getByTestId('service-status-unreachable')).toHaveText(
      'Wallet Service: Not reachable, retrying'
    )
  })

  test('should display service stopped with error status', async () => {
    await page.evaluate(() => {
      window.document.body.dispatchEvent(
        new CustomEvent('service_stopped_with_error')
      )
    })
    await expect(page.getByTestId('service-status-error')).toHaveText(
      'Wallet Service: Failed to start. Try to restart'
    )
  })

  test('should display service stopped status', async () => {
    await page.evaluate(() => {
      window.document.body.dispatchEvent(new CustomEvent('service_stopped'))
    })
    await expect(page.getByTestId('service-status-stopped')).toHaveText(
      'Wallet Service: Not running. Start service'
    )
  })
})
