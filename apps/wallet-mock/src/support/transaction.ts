import type { Page } from '@playwright/test'
import {
  beginInteractionSession,
  endInteractionSession,
  sendBackendInteraction,
} from './event-trigger'

export async function createTransaction(
  page: Page,
  transaction: object,
  status?: 'success' | 'failure' | 'rejected'
) {
  const traceID = Math.floor(Math.random() * 1000000).toString()
  const txHash = '0x' + Math.floor(Math.random() * 1000000).toString()
  const tx = Math.floor(Math.random() * 1000000).toString()
  const blockHeight = Math.floor(Math.random() * 1000000).toString()

  const transactionData = {
    hostname: 'vega.xyz',
    wallet: 'test-wallet',
    publicKey:
      '3fd42fd5ceb22d99ac45086f1d82d516118a5cb7ad9a2e096cd78ca2c8960c80',
    transaction: JSON.stringify(transaction),
    receivedAt: new Date().toISOString(),
  }

  await beginInteractionSession(page, 'TRANSACTION_REVIEW', traceID)
  await sendBackendInteraction(
    page,
    'REQUEST_TRANSACTION_REVIEW_FOR_SENDING',
    transactionData,
    traceID
  )

  switch (status) {
    case 'success':
      {
        const successObject = {
          txHash,
          tx,
          deserializedInputData: JSON.stringify({ blockHeight }),
          sentAt: new Date().toISOString(),
        }
        await sendBackendInteraction(
          page,
          'LOG',
          {
            type: 'Success',
            message: 'Success',
          },
          traceID
        )
        await sendBackendInteraction(
          page,
          'TRANSACTION_SUCCEEDED',
          successObject,
          traceID
        )
      }
      break
    case 'failure':
      {
        const failureObject = {
          tx,
          deserializedInputData: JSON.stringify({ blockHeight }),
          error: {
            Message: 'Failure',
          },
          sentAt: new Date().toISOString(),
        }
        await sendBackendInteraction(
          page,
          'LOG',
          {
            type: 'Failure',
            message: 'Failure',
          },
          traceID
        )
        await sendBackendInteraction(
          page,
          'TRANSACTION_FAILED',
          failureObject,
          traceID
        )
      }
      break
    case 'rejected':
      await page.getByTestId('transaction-reject-button').click()
      break
    default:
      break
  }
  await endInteractionSession(page, traceID)
  if (status === 'failure' || status === 'success') {
    await page.getByTestId('transaction-close').click()
  }
}
