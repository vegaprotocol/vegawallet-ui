Cypress.Commands.add('sendBackendInteraction', (interaction, data) => {
  cy.window().then((win) => {
    win.document.body.dispatchEvent(
      new CustomEvent('new_interaction', {
        detail: {
          name: interaction,
          data,
          traceID: '1',
        },
      })
    )
  })
})

Cypress.Commands.add('beginInteractionSession', (type) => {
  cy.sendBackendInteraction('INTERACTION_SESSION_BEGAN', {
    workflow: type,
  })
})

Cypress.Commands.add('endInteractionSession', () => {
  cy.sendBackendInteraction('INTERACTION_SESSION_ENDED')
})

// Below is a scheme of possible wallet worfklows:
// client.connect_wallet:
// INTERACTION_SESSION_BEGAN
//  REQUEST_WALLET_CONNECTION_REVIEW
//  REQUEST_WALLET_SELECTION (optional)
//  REQUEST_PASSPHRASE (optional)
//  REQUEST_SUCCEEDED
// INTERACTION_SESSION_ENDED
//
// For client.list_keys:
// INTERACTION_SESSION_BEGAN
//  REQUEST_PERMISSIONS_REVIEW (if first time for that app)
//  REQUEST_SUCCEEDED
// INTERACTION_SESSION_ENDED
//
// for client.<check|sign|send>_transaction:
// INTERACTION_SESSION_BEGAN
//  REQUEST_TRANSACTION_REVIEW_FOR_<CHECKING|SIGNING|SENDING>
//  LOGS
//  REQUEST_SUCCEEDED
// INTERACTION_SESSION_ENDED
