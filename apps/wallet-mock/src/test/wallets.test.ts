import { test, expect } from '@playwright/test'
import { mock } from '../support/mock'
import adminMock from '../types/admin-mock'
import walletsPage from '../page/wallets.page'

test.describe('Wallets view', () => {
  let wallets: ReturnType<typeof walletsPage>
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    wallets = walletsPage(page)
  })

  test('should see wallets header', async () => {
    await expect(wallets.home.getByRole('heading')).toHaveText('Wallets')
  })

  test('should see wallets list', async () => {
    await expect(wallets.walletList).toBeVisible()
  })

  test('should see create wallet button', async () => {
    await expect(wallets.createWalletButton).toBeVisible()
  })

  test('should see import wallet button', async () => {
    await expect(wallets.importWalletButton).toBeVisible()
  })
})

test.describe('Wallets list', () => {
  let wallets: ReturnType<typeof walletsPage>

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    wallets = walletsPage(page)
  })

  test('should see empty list', async ({ page }) => {
    await mock(page, adminMock.ListWallets, { wallets: [] })
    await page.goto('/')

    await expect(wallets.walletList).toBeVisible()
    await expect(wallets.walletList.getByRole('button')).toBeHidden()
  })

  test('should see list with few wallets', async ({ page }) => {
    await mock(page, adminMock.ListWallets, {
      wallets: ['wallet-1', 'wallet-2', 'wallet-3'],
    })
    await page.goto('/')

    await expect(wallets.walletList).toBeVisible()
    expect(await wallets.walletList.getByRole('button').all()).toHaveLength(3)
  })

  test('should see list with many wallets', async ({ page }) => {
    await mock(page, adminMock.ListWallets, {
      wallets: new Array(100).fill(0).map((_, i) => `wallet-${i}`),
    })
    await page.goto('/')

    await expect(wallets.walletList).toBeVisible()
    expect(await wallets.walletList.getByRole('button').all()).toHaveLength(100)
    await expect(wallets.wallet('wallet-99')).toBeVisible()
  })
})

test.describe('Wallets actions', () => {
  let wallets: ReturnType<typeof walletsPage>
  test.beforeEach(async ({ page }) => {
    wallets = walletsPage(page)
    await page.goto('/')
  })

  test('should open create wallet form', async ({ page }) => {
    await wallets.createWalletButton.click()
    await expect(page.getByTestId('create-wallet-form')).toBeVisible()
  })

  test('should open import wallet form', async ({ page }) => {
    await wallets.importWalletButton.click()
    await expect(page.getByTestId('import-wallet-form')).toBeVisible()
  })
})

test.describe('Wallet item view', () => {
  let wallets: ReturnType<typeof walletsPage>
  test.beforeEach(async ({ page }) => {
    wallets = walletsPage(page)
    await page.goto('/')
  })

  test('should see wallet name', async () => {
    await expect(wallets.wallet('wallet-1')).toBeVisible()
    await expect(
      wallets.wallet('wallet-1').getByTestId('wallet-name')
    ).toHaveText('wallet-1')
  })

  test('should see wallet locked icon', async () => {
    await expect(wallets.wallet('wallet-1')).toBeVisible()
    await expect(
      wallets.wallet('wallet-1').getByTestId('lock-icon')
    ).toBeVisible()
  })
})

test.describe('Wallet item actions', () => {
  let wallets: ReturnType<typeof walletsPage>
  test.beforeEach(async ({ page }) => {
    wallets = walletsPage(page)
    await page.goto('/')
  })

  test('should open passphrase form', async ({ page }) => {
    await wallets.wallet('wallet-1').click()
    await expect(page.getByTestId('passphrase-form')).toBeVisible()
  })
})
