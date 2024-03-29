import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import {
  beginInteractionSession,
  endInteractionSession,
  sendBackendInteraction,
} from '../support/event-trigger'
import percySnapshot from '@percy/playwright'

const transaction = {
  orderSubmission: {
    marketId:
      '10c7d40afd910eeac0c2cad186d79cb194090d5d5f13bd31e14c49fd1bded7e2',
    price: '0',
    size: '64',
    side: 'SIDE_SELL',
    timeInForce: 'TIME_IN_FORCE_GTT',
    expiresAt: '1678959957494396062',
    type: 'TYPE_LIMIT',
    reference: 'traderbot',
    peggedOrder: {
      reference: 'PEGGED_REFERENCE_BEST_ASK',
      offset: '15',
    },
  },
}

const data = {
  hostname: 'vega.xyz',
  wallet: 'test-wallet',
  publicKey: '3fd42fd5ceb22d99ac45086f1d82d516118a5cb7ad9a2e096cd78ca2c8960c80',
  transaction: JSON.stringify(transaction),
  receivedAt: new Date().toISOString(),
}

test.describe('Transaction review modal -- Approve + Success', () => {
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
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('should see pending transaction', async () => {
    await percySnapshot(page, 'interaction_transaction_review')
    await expect(page.getByTestId('transaction-status')).toHaveText(
      'In Progress'
    )
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
    await expect(page.getByTestId('transaction-details-value')).toHaveText(
      JSON.stringify(transaction, null, 2)
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

  test('should show the transaction logs for all levels', async () => {
    await page.getByTestId('transaction-approve-button').click()
    await sendBackendInteraction(page, 'LOG', {
      type: 'Success',
      message: 'Success',
    })
    await sendBackendInteraction(page, 'LOG', {
      type: 'Warning',
      message: 'Warning',
    })
    await sendBackendInteraction(page, 'LOG', {
      type: 'Error',
      message: 'Error',
    })
    await sendBackendInteraction(page, 'LOG', {
      type: 'Info',
      message: 'Info',
    })
    await percySnapshot(page, 'interaction_transaction_logs')
    await expect(page.getByTestId('code-window')).toBeVisible()
    await expect(
      page.getByTestId('code-window').locator('.text-success-light')
    ).toHaveText('Success')
    await expect(
      page.getByTestId('code-window').locator('.text-warning-light')
    ).toHaveText('Warning')
    await expect(
      page.getByTestId('code-window').locator('.text-danger-light')
    ).toHaveText('Error')
    await expect(
      page.getByTestId('code-window').locator('.text-neutral-light')
    ).toHaveText('Info')
  })

  test('should when a transaction has been successfully sent', async () => {
    await sendBackendInteraction(page, 'TRANSACTION_SUCCEEDED', {
      txHash:
        'a3aac02a3f7788a7261512530a5b6ca22cbd81313081df93f3d44f3aa526445d',
      transaction:
        'CnwI2dvuvK2c1rXlARCU2QfKPmoKQDEwYzdkNDBhZmQ5MTBlZWFjMGMyY2FkMTg2ZDc5Y2IxOTQwOTBkNWQ1ZjEzYmQzMWUxNGM0OWZkMWJkZWQ3ZTISATAYQCACKAIwnum7lPmlt6YXOAFCCXRyYWRlcmJvdEoGCAMSAjE1EpMBCoABNThiYmFlOWY0MzI5OTUzYmJlNTVmNWY3OWMxOWFjN2QwZmY1MzE4ZGM4ODUwMjI3NDMwYWE5MTg4NDZjMjhlNjg5YzZkNzc0ZmU2MThmODczMjdlYTljMjE0MDQxOWFjY2UwYjI4ZmIzNTU5MzdhNTUxNWJlZThmMDNhYjU5MDUSDHZlZ2EvZWQyNTUxORgBgH0DwrsBRgpAMDFEQkY0RDMyQzRDNzlBN0NEMzUxNzg1MzQ1MDE1OEY1RjdFRUM4MDAzREFCNDEyNEVBNUY0RjlEMUUxMzlBMhCmuQLSPkBlOGYwYWVkZGM0MDU2OGM4OTQxOTE1NjI2ODY3MGNkODA3MzhiYWUzNWE0ZjJmMDQ0YzNjNTI4OTc4Y2E2NzNj',
      deserializedInputData: JSON.stringify(transaction),
      sentAt: new Date().toISOString(),
    })
    await expect(page.getByTestId('transaction-status')).toHaveText(
      'Successful'
    )
    await expect(page.getByTestId('transaction-type')).toHaveText(
      'Order submission'
    )

    await expect(page.getByTestId('code-window')).toBeVisible()
    await expect(
      page.getByTestId('code-window').locator('.text-success-light')
    ).toHaveText('Success')
    await expect(
      page.getByTestId('code-window').locator('.text-warning-light')
    ).toHaveText('Warning')
    await expect(
      page.getByTestId('code-window').locator('.text-danger-light')
    ).toHaveText('Error')
    await expect(
      page.getByTestId('code-window').locator('.text-neutral-light')
    ).toHaveText('Info')
    await expect(page.getByTestId('transaction-header')).toHaveText(
      'Transaction ID'
    )
    await expect(page.getByTestId('transaction-id')).toHaveText('a3aac0…445d')
    await percySnapshot(page, 'interaction_transaction_success')
    await expect(page.getByTestId('transaction-close')).toHaveText('Close')
    await expect(page.getByTestId('wallet-home')).toBeVisible()
    await page.getByTestId('transaction-close').click()
  })

  test.afterAll(async () => {
    await page.close()
  })
})

test.describe('Transaction review modal -- Approve + Error', () => {
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
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('should show the transaction logs for all levels and error message', async () => {
    await page.getByTestId('transaction-approve-button').click()
    await sendBackendInteraction(page, 'LOG', {
      type: 'Info',
      message: 'Info',
    })
    await sendBackendInteraction(page, 'ERROR_OCCURRED', {
      type: 'Network error',
      error: 'Error message',
    })
    await expect(page.getByTestId('interaction-error-description')).toHaveText(
      "We couldn't fulfill your request due to network issues. Make sure your connection is stable, and give it another go."
    )
    await expect(page.getByTestId('interaction-error-message')).toHaveText(
      'Error message'
    )

    await percySnapshot(page, 'interaction_transaction_failed')
  })
})

test.describe('Transaction review modal -- Reject', () => {
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
  })

  test('should show home page', async () => {
    await page.getByTestId('transaction-reject-button').click()
    await endInteractionSession(page)
    await expect(page.getByTestId('wallet-home')).toBeVisible()
    await percySnapshot(page, 'interaction_transaction_rejected')
  })

  test.afterAll(async () => {
    await page.close()
  })
})
