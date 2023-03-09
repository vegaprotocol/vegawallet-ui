describe('User Journey -- Onboard', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should render the nav bar', () => {
    cy.getByTestId('nav-bar').should('exist')
    cy.getByTestId('nav-button').should('exist', 2)
    cy.getByTestId('nav-button').eq(0).should('contain', 'Wallets')
    cy.getByTestId('nav-button').eq(0).should('contain', 'Settings')
  })
})
