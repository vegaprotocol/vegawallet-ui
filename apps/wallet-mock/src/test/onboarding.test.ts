import type { Page } from '@playwright/test'
import { test } from '@playwright/test'
import percySnapshot from '@percy/playwright'
import { mock } from '../support/mock'

test.describe('User Journey -- Onboard', async () => {
  let page: Page
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    await mock(page)
    await page.goto('/#/onboard')
  })

  test('User journey: Onboarding (Use existing)', async () => {
    await percySnapshot(page, 'onboard_existing-wallet_home-1')
    await page.getByTestId('use-existing-wallet').click()
    await percySnapshot(page, 'home-page_keys')
  })

  test('User journey: Onboarding (Recovery phrase)', async () => {
    await percySnapshot(page, 'onboard_recovery-phrase_home-1')
    await page.getByTestId('import-wallet').click()
    await page.getByTestId('wallet-import-form-name').type('Test')
    await page
      .getByTestId('wallet-import-form-recovery-phrase')
      .type('Word '.repeat(24))
    await page.getByTestId('wallet-import-form-passphrase').type('123')
    await page.getByTestId('wallet-import-form-passphrase-confirm').type('123')
    await page.getByTestId('wallet-import-form-submit').click()
    await percySnapshot(page, 'onboard_recovery-wallet_import-2')
  })

  test('User journey: Onboarding (Create wallet)', async () => {
    await percySnapshot(page, 'onboard_create-wallet_home-1')
    await page.getByTestId('create-new-wallet').click()

    await page.getByTestId('create-wallet-form-name').type('Test')
    await page.getByTestId('create-wallet-form-passphrase').type('123')
    await page.getByTestId('create-wallet-form-passphrase-confirm').type('123')

    await percySnapshot(page, 'onboard_create-wallet_form-2')
    await page.getByTestId('create-wallet-form-submit').click()

    await percySnapshot(page, 'onboard_create-wallet_success-3')
    await page.getByTestId('create-wallet-success-cta').click()
  })
})
