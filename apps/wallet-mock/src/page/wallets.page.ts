import type { Page } from '@playwright/test'

const walletsPage = (page: Page) => {
  const locators = {
    home: page.getByTestId('wallet-home'),
    header: page.getByTestId('Wallets-header'),
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
