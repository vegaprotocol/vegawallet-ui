import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import {
  beginInteractionSession,
  sendBackendInteraction,
} from '../support/event-trigger'
import type {
  RequestPassphraseContent,
  RequestSucceededContent,
  RequestWalletConnectionContent,
  RequestWalletSelectionContent,
} from '@vegaprotocol/wallet-ui'
import percySnapshot from '@percy/playwright'

const connectionContent: RequestWalletConnectionContent = {
  hostname: 'vega.xyz',
}

const selectionContent: RequestWalletSelectionContent = {
  hostname: 'vega.xyz',
  availableWallets: ['Wallet 1', 'Wallet 2', 'Wallet 3'],
}

const passphraseContent: RequestPassphraseContent = {
  wallet: 'Wallet 1',
}

const requestSucceededContent: RequestSucceededContent = {
  message: 'Yippee Ki Yay! Request succeeded.',
}

test.describe('Connect to Dapp modal validations', () => {
  //0001-WALL-017 - must be prompted to either select a wallet or dismiss the prompt
  let page: Page
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('/')
    await beginInteractionSession(page, 'WALLET_CONNECTION')
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_CONNECTION_REVIEW',
      connectionContent
    )
  })
  // THIS IS JUST TEST COMMENT
  // THIS ONE AS WELL
  test.afterAll(async () => {
    await page.close()
  })

  test('should see connect to website modal', async () => {
    await expect(page.getByTestId('dapp-connect-modal')).toBeVisible()
    await expect(
      page.getByTestId('dapp-connect-modal').getByRole('heading')
    ).toHaveText('Connect to website')
  })

  test('should see hostname', async () => {
    await expect(page.getByTestId('dapp-hostname')).toBeVisible()
    await expect(page.getByTestId('dapp-hostname')).toHaveText(
      connectionContent.hostname
    )
  })

  test('should see request access list', async () => {
    await Promise.all([
      expect(page.getByTestId('dapp-connect-access-list-title')).toBeVisible(),
      expect(page.getByTestId('dapp-connect-access-list-access')).toBeVisible(),
      expect(page.getByTestId('dapp-connect-access-list-title')).toContainText(
        'Allow this site to:'
      ),
      expect(page.getByTestId('dapp-connect-access-list-access')).toContainText(
        'Request access to your key(s)'
      ),
    ])
  })

  test('should see approve button', async () => {
    await expect(page.getByTestId('dapp-connect-approve-button')).toBeVisible()
    await expect(page.getByTestId('dapp-connect-approve-button')).toHaveText(
      'Approve'
    )
  })

  test('should see deny button', async () => {
    await expect(page.getByTestId('dapp-connect-deny-button')).toBeVisible()
    await expect(page.getByTestId('dapp-connect-deny-button')).toHaveText(
      'Deny'
    )
  })

  test('percy snapshot', async () => {
    await percySnapshot(page, 'dapp_connect_modal')
  })
})

test.describe('Connect to Dapp modal actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await beginInteractionSession(page, 'WALLET_CONNECTION')
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_CONNECTION_REVIEW',
      connectionContent
    )
  })

  test('should close modal on deny', async ({ page }) => {
    await page.getByTestId('dapp-connect-deny-button').click()
    await expect(page.getByTestId('dapp-connect-modal')).toBeHidden()
  })

  test.fixme('should close modal on approve', async () => {
    //TODO: add approve action logic, add test for approve action
  })
})

test.describe('Connect to Dapp - wallet selection validations', () => {
  // 0001-WALL-019 - must be able to select whole wallet (so that new keys are automatically shared
  let page: Page
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('/')
    await beginInteractionSession(page, 'WALLET_CONNECTION')
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_CONNECTION_REVIEW',
      connectionContent
    )
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_SELECTION',
      selectionContent
    )
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('should see wallet selection modal', async () => {
    await expect(page.getByTestId('dapp-select-wallet-modal')).toBeVisible()
    await expect(page.getByTestId('dapp-select-wallet-modal')).toContainText(
      'Connect to website'
    )
  })

  test('should see hostname', async () => {
    await expect(page.getByTestId('dapp-hostname')).toBeVisible()
    await expect(page.getByTestId('dapp-hostname')).toHaveText(
      connectionContent.hostname
    )
  })

  test('should see wallet to connect form', async () => {
    await expect(page.getByTestId('dapp-select-wallet-form')).toBeVisible()
    await expect(page.getByTestId('dapp-select-wallet-form')).toContainText(
      'Select a wallet to connect to'
    )
  })

  test('should see wallets list', async () => {
    await Promise.all(
      selectionContent.availableWallets.map((wallet) =>
        expect(
          page.getByTestId('dapp-select-wallet-form').getByLabel(wallet)
        ).toBeVisible()
      )
    )
  })

  test('should see approve button', async () => {
    await expect(page.getByTestId('dapp-select-approve-button')).toBeVisible()
    await expect(page.getByTestId('dapp-select-approve-button')).toHaveText(
      'Approve'
    )
  })

  test('should see approve button disabled', async () => {
    await expect(page.getByTestId('dapp-select-approve-button')).toBeDisabled()
  })

  test('should see deny button', async () => {
    await expect(page.getByTestId('dapp-select-deny-button')).toBeVisible()
    await expect(page.getByTestId('dapp-select-deny-button')).toHaveText('Deny')
  })

  test('percy snapshot', async () => {
    await percySnapshot(page, 'connect_dapp_wallet_selection')
  })
})

test.describe('Connect to Dapp - wallet selection actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await beginInteractionSession(page, 'WALLET_CONNECTION')
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_CONNECTION_REVIEW',
      connectionContent
    )
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_SELECTION',
      selectionContent
    )
  })

  test('should close modal on deny', async ({ page }) => {
    await page.getByTestId('dapp-select-deny-button').click()
    await expect(page.getByTestId('dapp-select-wallet')).toBeHidden()
  })

  test('should enable approve button when wallet chosen', async ({ page }) => {
    await page
      .getByTestId('dapp-select-wallet-form')
      .getByRole('radio')
      .first()
      .click()
    await expect(page.getByTestId('dapp-select-approve-button')).toBeEnabled()
  })

  test.fixme('should close modal on approve', async () => {
    //TODO: add approve action logic, add test for approve action
  })
})

test.describe('Connect to Dapp - passphrase request validations', () => {
  // 0001-WALL-022 #MOCK must enter wallet passphrase before wallet details are shared (assuming a password has not recently been entered)
  let page: Page
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()

    await page.goto('/')
    await beginInteractionSession(page, 'WALLET_CONNECTION')
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_CONNECTION_REVIEW',
      connectionContent
    )
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_SELECTION',
      selectionContent
    )
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_SELECTION',
      selectionContent
    )
    await sendBackendInteraction(page, 'REQUEST_PASSPHRASE', passphraseContent)
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('should see passphrase modal', async () => {
    await expect(page.getByTestId('dapp-passphrase-modal')).toBeVisible()
    await expect(
      page.getByTestId('dapp-passphrase-modal').getByRole('heading')
    ).toHaveText('Connect to website')
  })

  test('should see hostname', async () => {
    await expect(page.getByTestId('dapp-hostname')).toBeVisible()
    await expect(page.getByTestId('dapp-hostname')).toHaveText(
      connectionContent.hostname
    )
  })

  test('should see passphrase form', async () => {
    await Promise.all([
      expect(page.getByTestId('dapp-passphrase-form')).toBeVisible(),
      expect(
        page.getByTestId('dapp-passphrase-form').locator('label')
      ).toContainText('Unlock with your passphrase to complete connection'),
      expect(page.getByTestId('input-passphrase')).toBeVisible(),
      expect(page.getByTestId('input-passphrase')).toBeEmpty(),
    ])
  })

  test('should see approve button', async () => {
    await expect(
      page.getByTestId('dapp-passphrase-approve-button')
    ).toBeVisible()
    await expect(page.getByTestId('dapp-passphrase-approve-button')).toHaveText(
      'Approve'
    )
  })

  test('should see cancel button', async () => {
    await expect(
      page.getByTestId('dapp-passphrase-cancel-button')
    ).toBeVisible()
    await expect(page.getByTestId('dapp-passphrase-cancel-button')).toHaveText(
      'Cancel'
    )
  })

  test('percy snapshot', async () => {
    await percySnapshot(page, 'connect_dapp_passphrase_request')
  })
})

test.describe('Connect to Dapp - passphrase request actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await beginInteractionSession(page, 'WALLET_CONNECTION')
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_CONNECTION_REVIEW',
      connectionContent
    )
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_SELECTION',
      selectionContent
    )
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_SELECTION',
      selectionContent
    )
    await sendBackendInteraction(page, 'REQUEST_PASSPHRASE', passphraseContent)
  })

  test('should close modal on cancel', async ({ page }) => {
    await page.getByTestId('dapp-passphrase-cancel-button').click()
    await expect(page.getByTestId('dapp-passphrase-modal')).toBeHidden()
  })

  test('should not allow to proceed with empty password', async ({ page }) => {
    await page.getByTestId('dapp-passphrase-approve-button').click()
    await expect(
      page.getByTestId('dapp-passphrase-approve-button')
    ).toBeDisabled()
    await expect(page.getByTestId('helper-text')).toBeVisible()
    await expect(page.getByTestId('helper-text')).toHaveText('Required')
  })

  test.fixme(
    'should not allow to proceed with invalid password',
    async ({ page }) => {
      //Just suggestion how the test could look like (created by Github Copilot)
      await page.getByTestId('input-passphrase').type('invalid')
      await page.getByTestId('dapp-passphrase-approve-button').click()
      await expect(
        page.getByTestId('dapp-passphrase-approve-button')
      ).toBeDisabled()
      await expect(page.getByTestId('helper-text')).toBeVisible()
      await expect(page.getByTestId('helper-text')).toHaveText(
        'Invalid passphrase'
      )
    }
  )

  test.fixme('should close modal on approve', async ({ page }) => {
    await page.getByTestId('input-passphrase').type('passphrase')
    await page.getByTestId('dapp-passphrase-approve-button').click()
    //TODO: add approve action logic, add test for approve action
  })
})

test.describe('Connect to Dapp - request succeeded validations', () => {
  let page: Page
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()

    await page.goto('/')
    await beginInteractionSession(page, 'WALLET_CONNECTION')
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_CONNECTION_REVIEW',
      connectionContent
    )
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_SELECTION',
      selectionContent
    )
    await sendBackendInteraction(
      page,
      'REQUEST_WALLET_SELECTION',
      selectionContent
    )
    await sendBackendInteraction(page, 'REQUEST_PASSPHRASE', passphraseContent)
    await sendBackendInteraction(
      page,
      'REQUEST_SUCCEEDED',
      requestSucceededContent
    )
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('should see request succeeded modal', async () => {
    await expect(page.getByTestId('interaction-success')).toBeVisible()
    await expect(
      page.getByTestId('interaction-success').getByRole('heading')
    ).toHaveText('Connected')
  })

  test('percy snapshot', async () => {
    await percySnapshot(page, 'connect_dapp_request_succeeded')
  })
})
