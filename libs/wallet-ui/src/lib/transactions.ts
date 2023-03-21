import { omit } from 'ramda'
import { TransactionStatus } from '@vegaprotocol/wallet-types'
import type { TransactionKeys } from '@vegaprotocol/wallet-types'

import type {
  LogContent,
  RequestTransactionReview,
  RequestTransactionSuccess,
  RequestTransactionFailure,
} from '../types/interaction'
import { Intent } from '../config/intent'

type TransactionData = object

export type Transaction = {
  id: string
  type: TransactionKeys
  hostname: string
  wallet: string
  publicKey: string
  payload: TransactionData
  status: TransactionStatus
  receivedAt: Date
  logs: LogContent[]
  txHash?: null | string
  blockHeight?: number
  signature?: string
  error?: string
}

const getPayload = (transaction: string): TransactionData => {
  try {
    return JSON.parse(transaction)
  } catch (err) {
    throw new Error('Could not parse transaction payload')
  }
}

const getType = (payload: object) => {
  return Object.keys(
    omit(['blockHeight', 'nonce'], payload)
  )[0] as TransactionKeys
}

type Tx = {
  signature: {
    value: string
  }
}

const parseTx = (tx: string) => {
  try {
    const { signature } = JSON.parse(tx) as Tx
    return { signature: signature.value }
  } catch (err) {
    return {}
  }
}

type InputData = {
  blockHeight: string
}

const deserializeTransaction = (inputData: string) => {
  try {
    const { blockHeight } = JSON.parse(inputData) as InputData
    return { blockHeight: parseInt(blockHeight, 10) }
  } catch (err) {
    return {}
  }
}

const parseEndEvent = (
  event: RequestTransactionSuccess | RequestTransactionFailure
) => {
  const isSuccess = event.name === 'TRANSACTION_SUCCEEDED'
  const txData = parseTx(event.data.tx)
  const inputData = deserializeTransaction(event.data.deserializedInputData)

  return {
    ...txData,
    ...inputData,
    status: isSuccess ? TransactionStatus.SUCCESS : TransactionStatus.FAILURE,
    txHash: event.name === 'TRANSACTION_SUCCEEDED' ? event.data.txHash : null,
    error:
      event.name === 'TRANSACTION_FAILED'
        ? event.data.error.Message
        : undefined,
  }
}

export function parseTransactionInput(
  event: RequestTransactionReview
): Transaction
export function parseTransactionInput(
  event: RequestTransactionSuccess | RequestTransactionFailure,
  t: Transaction
): Transaction
export function parseTransactionInput(
  event:
    | RequestTransactionReview
    | RequestTransactionSuccess
    | RequestTransactionFailure,
  existingTransaction?: Transaction
): Transaction {
  if (event.name === 'REQUEST_TRANSACTION_REVIEW_FOR_SENDING') {
    const payload = getPayload(event.data.transaction)
    const type = getType(payload)

    return {
      id: event.traceID,
      type,
      payload,
      status: TransactionStatus.PENDING,
      hostname: event.data.hostname,
      receivedAt: new Date(event.data.receivedAt),
      wallet: event.data.wallet,
      publicKey: event.data.publicKey,
      logs: [],
      txHash: null,
    }
  } else if (existingTransaction) {
    const transactionPartial = parseEndEvent(event)

    if (event.name === 'TRANSACTION_FAILED') {
      return {
        ...existingTransaction,
        ...transactionPartial,
        logs: [
          ...existingTransaction.logs,
          {
            type: 'Error',
            message: `Error: ${event.data.error.Message}`,
          },
        ],
      }
    }

    return {
      ...existingTransaction,
      ...transactionPartial,
    }
  }
  throw new Error(
    'Invalid data provided. For "RequestTransactionSuccess" and "RequestTransactionFailure" you need to provide an existing transaction.'
  )
}

export const sortTransaction = (a: Transaction, b: Transaction) => {
  if (a.receivedAt < b.receivedAt) return -1
  if (a.receivedAt > b.receivedAt) return 1
  return 0
}

export const getMessageIntent = (type: LogContent['type']) => {
  switch (type) {
    case 'Error': {
      return Intent.DANGER
    }
    case 'Warning': {
      return Intent.WARNING
    }
    case 'Success': {
      return Intent.SUCCESS
    }
    default: {
      return Intent.NONE
    }
  }
}
