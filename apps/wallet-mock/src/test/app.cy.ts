import { Identifier } from '@vegaprotocol/wallet-admin'

describe('Wallet', () => {
  before(() => {
    cy.mock(Identifier.ListWallets, { wallets: ['wallet-1'] })
    cy.visit('/')
  })
  it('should open the Wallet UI', () => {
    cy.get('[data-testid="wallet-wallet-1"]').should('be.visible')
  })
})
