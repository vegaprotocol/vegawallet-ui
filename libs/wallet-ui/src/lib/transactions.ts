import { omit } from 'ramda'

import type {
  LogContent,
  RequestTransactionReview,
  RequestTransactionSuccess,
  RequestTransactionFailure,
} from '../types/interaction'
import { Intent } from '../config/intent'

export enum TransactionStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export enum TransactionKeys {
  UNKNOWN = 'unknown',
  ORDER_SUBMISSION = 'orderSubmission',
  ORDER_CANCELLATION = 'orderCancellation',
  ORDER_AMENDMENT = 'orderAmendment',
  VOTE_SUBMISSION = 'voteSubmission',
  WITHDRAW_SUBMISSION = 'withdrawSubmission',
  LIQUIDTY_PROVISION_SUBMISSION = 'liquidityProvisionSubmission',
  LIQUIDTY_PROVISION_CANCELLATION = 'liquidityProvisionCancellation',
  LIQUIDITY_PROVISION_AMENDMENT = 'liquidityProvisionAmendment',
  PROPOSAL_SUBMISSION = 'proposalSubmission',
  ANNOUNCE_NODE = 'announceNode',
  NODE_VOTE = 'nodeVote',
  NODE_SIGNATURE = 'nodeSignature',
  CHAIN_EVENT = 'chainEvent',
  ORACLE_DATA_SUBMISSION = 'oracleDataSubmission',
  UNDELEGATE_SUBMISSION = 'undelegateSubmission',
  DELEGATE_SUBMISSION = 'delegateSubmission',
  TRANSFER = 'transfer',
  CANCEL_TRANSFER = 'cancelTransfer',
  KEY_ROTATE_SUBMISSION = 'keyRotateSubmission',
  ETHEREUM_KEY_ROTATE_SUBMISSION = 'ethereumKeyRotateSubmission',
}

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

export const TRANSACTION_TITLES: Record<TransactionKeys, string> = {
  [TransactionKeys.UNKNOWN]: 'Unknown transaction',
  [TransactionKeys.ORDER_SUBMISSION]: 'Order submission',
  [TransactionKeys.ORDER_CANCELLATION]: 'Order cancellation',
  [TransactionKeys.ORDER_AMENDMENT]: 'Order amendment',
  [TransactionKeys.VOTE_SUBMISSION]: 'Vote submission',
  [TransactionKeys.WITHDRAW_SUBMISSION]: 'Withdraw submission',
  [TransactionKeys.LIQUIDTY_PROVISION_SUBMISSION]: 'Liquidity provision',
  [TransactionKeys.LIQUIDTY_PROVISION_CANCELLATION]:
    'Liquidity provision cancellation',
  [TransactionKeys.LIQUIDITY_PROVISION_AMENDMENT]:
    'Liquidity provision amendment',
  [TransactionKeys.PROPOSAL_SUBMISSION]: 'Proposal submission',
  [TransactionKeys.ANNOUNCE_NODE]: 'Announce node',
  [TransactionKeys.NODE_VOTE]: 'Node vote',
  [TransactionKeys.NODE_SIGNATURE]: 'Node signature',
  [TransactionKeys.CHAIN_EVENT]: 'Chain event',
  [TransactionKeys.ORACLE_DATA_SUBMISSION]: 'Oracle data submission',
  [TransactionKeys.UNDELEGATE_SUBMISSION]: 'Undelegate submission',
  [TransactionKeys.DELEGATE_SUBMISSION]: 'Delegate submission',
  [TransactionKeys.TRANSFER]: 'Transfer',
  [TransactionKeys.CANCEL_TRANSFER]: 'Cancel transfer',
  [TransactionKeys.KEY_ROTATE_SUBMISSION]: 'Key rotation submission',
  [TransactionKeys.ETHEREUM_KEY_ROTATE_SUBMISSION]:
    'Ethereum key rotation submission',
}

export const TRANSACTION_DESCRIPTIONS: Record<TransactionKeys, string> = {
  [TransactionKeys.UNKNOWN]: 'submit an unknown transaction',
  [TransactionKeys.ORDER_SUBMISSION]: 'submit an order',
  [TransactionKeys.ORDER_CANCELLATION]: 'cancel an order',
  [TransactionKeys.ORDER_AMENDMENT]: 'amend an order',
  [TransactionKeys.VOTE_SUBMISSION]: 'submit a vote for a governance proposal',
  [TransactionKeys.WITHDRAW_SUBMISSION]: 'withdraw funds',
  [TransactionKeys.LIQUIDTY_PROVISION_SUBMISSION]: 'provide liquidity',
  [TransactionKeys.LIQUIDTY_PROVISION_CANCELLATION]:
    'cancel a liquidity provision',
  [TransactionKeys.LIQUIDITY_PROVISION_AMENDMENT]:
    'amend a liquidity provision',
  [TransactionKeys.PROPOSAL_SUBMISSION]: 'submit a governance proposal',
  [TransactionKeys.ANNOUNCE_NODE]: 'announce a node',
  [TransactionKeys.NODE_VOTE]: 'submit a node vote',
  [TransactionKeys.NODE_SIGNATURE]: 'submit a node signature',
  [TransactionKeys.CHAIN_EVENT]: 'submit a chain event',
  [TransactionKeys.ORACLE_DATA_SUBMISSION]: 'submit oracle data',
  [TransactionKeys.UNDELEGATE_SUBMISSION]: 'undelegate stake to a node',
  [TransactionKeys.DELEGATE_SUBMISSION]: 'delegate stake to a node',
  [TransactionKeys.TRANSFER]: 'transfer assets',
  [TransactionKeys.CANCEL_TRANSFER]: 'cancel a recurring transfer',
  [TransactionKeys.KEY_ROTATE_SUBMISSION]: 'submit a key rotation',
  [TransactionKeys.ETHEREUM_KEY_ROTATE_SUBMISSION]:
    'submit an Ethereum key rotation',
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
