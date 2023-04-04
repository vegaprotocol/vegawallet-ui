import { test, expect } from '@playwright/test'
import { mock } from '../support/mock'
import adminMock from '../types/admin-mock'

test.describe('Wallets view', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should see wallets header', async ({ page }) => {
    await expect(
      page.getByTestId('wallet-home').getByRole('heading')
    ).toHaveText('Wallets')
  })

  test('should see wallets list', async ({ page }) => {
    await expect(page.getByTestId('wallet-list')).toBeVisible()
  })

  test('should see create wallet button', async ({ page }) => {
    await expect(page.getByTestId('create-new-wallet')).toBeVisible()
  })

  test('should see import wallet button', async ({ page }) => {
    await expect(page.getByTestId('import-wallet')).toBeVisible()
  })
})

test.describe('Wallets list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should see empty list', async ({ page }) => {
    await mock(page, adminMock.ListWallets, { wallets: [] })
    await page.goto('/')

    await expect(page.getByTestId('wallet-list')).toBeVisible()
    await expect(
      page.getByTestId('wallet-list').getByRole('button')
    ).toBeHidden()
  })

  test('should see list with few wallets', async ({ page }) => {
    await mock(page, adminMock.ListWallets, {
      wallets: ['wallet-1', 'wallet-2', 'wallet-3'],
    })
    await page.goto('/')

    await expect(page.getByTestId('wallet-list')).toBeVisible()
    expect(
      await page.getByTestId('wallet-list').getByRole('button').all()
    ).toHaveLength(3)
  })

  test('should see list with many wallets', async ({ page }) => {
    await mock(page, adminMock.ListWallets, {
      wallets: new Array(100).fill(0).map((_, i) => `wallet-${i}`),
    })
    await page.goto('/')

    await expect(page.getByTestId('wallet-list')).toBeVisible()
    expect(
      await page.getByTestId('wallet-list').getByRole('button').all()
    ).toHaveLength(100)
    await expect(page.getByTestId('wallet-wallet-99')).toBeVisible()
  })
})

test.describe('Wallets actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should open create wallet form', async ({ page }) => {
    await page.getByTestId('create-new-wallet').click()
    await expect(page.getByTestId('create-wallet-form')).toBeVisible()
  })

  test('should open import wallet form', async ({ page }) => {
    await page.getByTestId('import-wallet').click()
    await expect(page.getByTestId('import-wallet-form')).toBeVisible()
  })
})
