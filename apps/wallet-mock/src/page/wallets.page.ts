import type { Page } from '@playwright/test'

const walletsPage = (page: Page) => {
  const locators = {
    walletList: page.getByTestId('wallet-list'),
    createWalletButton: page.getByTestId('create-new-wallet'),
    importWalletButton: page.getByTestId('import-wallet'),
    wallet: (name: string) => page.getByTestId(`wallet-${name}`),
  }
  return {
    ...locators,
  }
}
export default walletsPage
