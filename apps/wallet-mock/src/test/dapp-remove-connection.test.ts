// `import { test, expect } from '@playwright/test'
// import type { Page } from '@playwright/test'
// import percySnapshot from '@percy/playwright'

// const wallet = 'wallet-1'
// const hostname = 'vega.xyz'

// const removeWalletConnection = async (page: Page) => {
//   await page.getByTestId(`wallet-${wallet}`).click()
//   await page.getByTestId('tab-connections').click()
//   await page
//     .getByTestId(`connection-${hostname}`)
//     .getByTestId('remove-button')
//     .click()
// }

// test.describe('Dapp remove connection validations', () => {
//   let page: Page
//   test.beforeAll(async ({ browser }) => {
//     page = await browser.newPage()
//     await page.goto('/')
//     await removeWalletConnection(page)
//   })

//   test.afterAll(async () => {
//     await page.close()
//   })

//   test('should see remove connection modal', async () => {
//     await expect(page.getByTestId('remove-connection-modal')).toBeVisible()
//     await expect(
//       page.getByTestId('remove-connection-modal').getByRole('heading')
//     ).toHaveText('Remove connection')
//   })

//   test('should see remove connection message', async () => {
//     await expect(page.getByTestId('remove-connection-message')).toBeVisible()
//     await expect(page.getByTestId('remove-connection-message')).toHaveText(
//       `Are you sure you want to remove the connection from your wallet ${wallet} to ${hostname}? You may lose site functionality.`
//     )
//   })

//   test('should see remove connection remove button', async () => {
//     await expect(
//       page.getByTestId('remove-connection-remove-button')
//     ).toBeVisible()
//     await expect(
//       page.getByTestId('remove-connection-remove-button')
//     ).toHaveText('Remove')
//   })

//   test('should see remove connection cancel button', async () => {
//     await expect(
//       page.getByTestId('remove-connection-cancel-button')
//     ).toBeVisible()
//     await expect(
//       page.getByTestId('remove-connection-cancel-button')
//     ).toHaveText('Cancel')
//   })

//   test('percy snapshot', async () => {
//     await percySnapshot(page, 'dapp_remove_connection_modal')
//   })
// })`

// test.describe('Dapp remove connection actions', () => {
//   //  0001-WALL-023 #MOCK - must be able to retrospectively revoke Dapp's access to a Wallet
//   test.beforeEach(async ({ page }) => {
//     await page.goto('/')
//     await removeWalletConnection(page)
//   })

//   test('should close remove connection modal', async ({ page }) => {
//     await page.getByTestId('remove-connection-cancel-button').click()
//     await expect(page.getByTestId('remove-connection-modal')).toBeHidden()
//   })

//   test('should remove connection', async ({ page }) => {
//     await page.getByTestId('remove-connection-remove-button').click()
//     await expect(page.getByTestId('remove-connection-modal')).toBeHidden()
//     await expect(page.getByTestId(`connection-${hostname}`)).toBeHidden()
//     await percySnapshot(page, 'dapp_remove_connection_success')
//   })
// })
