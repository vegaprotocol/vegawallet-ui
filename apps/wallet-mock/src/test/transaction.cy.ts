const data = {
  hostname: 'vega.xyz',
  wallet: 'test-wallet',
  publicKey: '3fd42fd5ceb22d99ac45086f1d82d516118a5cb7ad9a2e096cd78ca2c8960c80',
  transaction: JSON.stringify({}),
  receivedAt: new Date().toISOString(),
}

describe('Transaction review modal', () => {
  // 0001-WALL-024 - must be prompted to approve, reject or ignore the transaction (if auto approve is not on)
  // 0001-WALL-025 - must see the details of the transaction
  before(() => {
    cy.visit('/')
    cy.triggerTransactionEvent('REQUEST_TRANSACTION_REVIEW_FOR_SENDING', data)
  })
  it('should see pending transaction', () => {
    cy.getByTestId('transaction-status').should('contain', 'Pending')
  })

  it('should see valid hostname', () => {
    cy.getByTestId('transaction-hostname').should('have.text', data.hostname)
  })

  it('should see wallet header', () => {
    cy.getByTestId('wallet-key').should('have.text', 'Wallet')
  })
  it('should see wallet value', () => {
    cy.getByTestId('wallet-value').should('have.text', data.wallet)
  })

  it('should see public key header', () => {
    cy.getByTestId('public-key-key').should('have.text', 'Public key')
  })
  it('should see public key value', () => {
    cy.getByTestId('public-key-value').should('have.text', data.publicKey)
  })

  it('should see transaction details header', () => {
    cy.getByTestId('transaction-details-key').should(
      'have.text',
      'Transaction details'
    )
  })
  it('should see transaction details value', () => {
    cy.getByTestId('transaction-details-key').find('button').click()
    cy.getByTestId('transaction-details-value').should(
      'have.text',
      data.transaction
    )
  })

  it('should see received at header', () => {
    cy.getByTestId('received-at-key').should('have.text', 'Received at')
  })

  it('should see received at value', () => {
    cy.getByTestId('received-at-value').should(
      'have.text',
      new Date(data.receivedAt).toLocaleString()
    )
  })

  it('should see approve button', () => {
    cy.getByTestId('transaction-approve-button').should('be.visible')
  })

  it('should see reject button', () => {
    cy.getByTestId('transaction-reject-button').should('be.visible')
  })
})
