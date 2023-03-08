import './mock'
import '@percy/cypress'

Cypress.Commands.add('getByTestId', (selector, options) =>
  cy.get(`[data-testid="${selector}"]`, options)
)

before(() => {
  cy.clearLocalStorage()
})
