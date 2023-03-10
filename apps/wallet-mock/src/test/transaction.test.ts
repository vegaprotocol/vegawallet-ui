import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import {
  beginInteractionSession,
  endInteractionSession,
  sendBackendInteraction,
} from '../support/event-trigger'

const data = {
  hostname: 'vega.xyz',
  wallet: 'test-wallet',
  publicKey: '3fd42fd5ceb22d99ac45086f1d82d516118a5cb7ad9a2e096cd78ca2c8960c80',
  transaction: JSON.stringify({}),
  receivedAt: new Date().toISOString(),
}

test.describe('Transaction review modal', () => {
  // 0001-WALL-024 - must be prompted to approve, reject or ignore the transaction (if auto approve is not on)
  // 0001-WALL-025 - must see the details of the transaction
  let page: Page
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('/')
    await beginInteractionSession(page, 'TRANSACTION_REVIEW')
    await sendBackendInteraction(
      page,
      'REQUEST_TRANSACTION_REVIEW_FOR_SENDING',
      data
    )
    await endInteractionSession(page)
  })
  test('should see pending transaction', async () => {
    await expect(page.getByTestId('transaction-status')).toHaveText('Pending')
  })

  test('should see valid hostname', async () => {
    await expect(page.getByTestId('transaction-hostname')).toHaveText(
      data.hostname
    )
  })

  test('should see wallet header', async () => {
    await expect(page.getByTestId('wallet-key')).toHaveText('Wallet')
  })
  test('should see wallet value', async () => {
    await expect(page.getByTestId('wallet-value')).toHaveText(data.wallet)
  })

  test('should see public key header', async () => {
    await expect(page.getByTestId('public-key-key')).toHaveText('Public key')
  })
  test('should see public key value', async () => {
    await expect(page.getByTestId('public-key-value')).toHaveText(
      data.publicKey
    )
  })

  test('should see transaction details header', async () => {
    await expect(page.getByTestId('transaction-details-key')).toHaveText(
      'Transaction details'
    )
  })
  test('should see transaction details value', async () => {
    await page.getByTestId('transaction-details-key').locator('button').click()
    await expect(page.getByTestId('transaction-details-value')).toHaveText(
      data.transaction
    )
  })

  test('should see received at header', async () => {
    await expect(page.getByTestId('received-at-key')).toHaveText('Received at')
  })

  test('should see received at value', async () => {
    await expect(page.getByTestId('received-at-value')).toHaveText(
      new Date(data.receivedAt).toLocaleString()
    )
  })

  test('should see approve button', async () => {
    await expect(page.getByTestId('transaction-approve-button')).toBeVisible()
  })

  test('should see reject button', async () => {
    await expect(page.getByTestId('transaction-reject-button')).toBeVisible()
  })
})
