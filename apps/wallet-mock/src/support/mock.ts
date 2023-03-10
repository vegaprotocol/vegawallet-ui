import './event-trigger'

Cypress.Commands.add('mock', (mockedFunction, result) => {
  cy.window().then((win) => {
    win.localStorage.setItem(`MOCK.${mockedFunction}`, JSON.stringify(result))
  })
})
