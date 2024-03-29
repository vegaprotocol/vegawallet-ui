import type { Page } from '@playwright/test'
import type { EventFlowType, InteractionType } from '@vegaprotocol/wallet-ui'

export async function sendBackendInteraction(
  page: Page,
  interaction: InteractionType,
  data?: object,
  traceID?: string
) {
  await page.evaluate(
    ({ interaction, data, traceID }) =>
      window.document.body.dispatchEvent(
        new CustomEvent('new_interaction', {
          detail: {
            name: interaction,
            data,
            traceID: traceID ? traceID : '1',
          },
        })
      ),
    { interaction, data, traceID }
  )
}

export async function beginInteractionSession(
  page: Page,
  eventFlowType: EventFlowType,
  traceID?: string
) {
  sendBackendInteraction(
    page,
    'INTERACTION_SESSION_BEGAN',
    {
      workflow: eventFlowType,
    },
    traceID
  )
}

export async function endInteractionSession(page: Page, traceID?: string) {
  sendBackendInteraction(page, 'INTERACTION_SESSION_ENDED', undefined, traceID)
}

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
