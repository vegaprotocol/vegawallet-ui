import type { Dispatch, SetStateAction } from 'react'

export type EventFlowType =
  | 'WALLET_CONNECTION'
  | 'TRANSACTION_REVIEW'
  | 'PERMISSION_REQUEST'

export const EVENT_FLOW_TYPE: Record<EventFlowType, EventFlowType> = {
  WALLET_CONNECTION: 'WALLET_CONNECTION',
  TRANSACTION_REVIEW: 'TRANSACTION_REVIEW',
  PERMISSION_REQUEST: 'PERMISSION_REQUEST',
}

export type InteractionContentProps<T extends RawInteraction> = {
  event: T
  history: Interaction[]
  flow?: EventFlowType
  isResolved: boolean
  setResolved: Dispatch<SetStateAction<boolean>>
  onFinish: () => void
}

// Received interaction content

export interface ErrorOccurredContent {
  name: string
  error: string
}

export interface SessionStartedData {
  workflow: EventFlowType
}

export interface LogContent {
  type: 'Info' | 'Warning' | 'Error' | 'Success'
  message: string
}

export interface RequestWalletConnectionContent {
  hostname: string
}

export interface RequestWalletSelectionContent {
  hostname: string
  availableWallets: string[]
}

export interface RequestPassphraseContent {
  wallet: string
}

export type PermissionTargetType = 'public_keys'

export const PermissionTarget: Record<'PUBLIC_KEYS', PermissionTargetType> = {
  PUBLIC_KEYS: 'public_keys',
}

export type PermissionTypes = 'read'

export const PermissionType: Record<'READ', PermissionTypes> = {
  READ: 'read',
}

export interface RequestPermissionsContent {
  hostname: string
  wallet: string
  permissions: Record<PermissionTargetType, PermissionTypes>
}

export interface RequestTransactionReviewContent {
  hostname: string
  wallet: string
  publicKey: string
  transaction: string
  receivedAt: string
}

export interface RequestTransactionSuccessContent {
  txHash: string
  tx: string
  deserializedInputData: string
  sentAt: string
}

export interface RequestTransactionFailureContent {
  tx: string
  deserializedInputData: string
  error: {
    Message: string
  }
  sentAt: string
}

export interface RequestTransactionSigningContent {
  hostname: string
  wallet: string
  publicKey: string
  transaction: string
  receivedAt: string
}

export interface RequestSucceededContent {
  message: string
}

// Received interaction events

export type InteractionType =
  | 'INTERACTION_SESSION_BEGAN'
  | 'INTERACTION_SESSION_ENDED'
  | 'REQUEST_WALLET_CONNECTION_REVIEW'
  | 'REQUEST_WALLET_SELECTION'
  | 'REQUEST_PERMISSIONS_REVIEW'
  | 'REQUEST_TRANSACTION_REVIEW_FOR_SENDING'
  | 'TRANSACTION_SUCCEEDED'
  | 'TRANSACTION_FAILED'
  | 'REQUEST_PASSPHRASE'
  | 'REQUEST_SUCCEEDED'
  | 'ERROR_OCCURRED'
  | 'LOG'

export const INTERACTION_TYPE: Record<InteractionType, InteractionType> = {
  INTERACTION_SESSION_BEGAN: 'INTERACTION_SESSION_BEGAN',
  INTERACTION_SESSION_ENDED: 'INTERACTION_SESSION_ENDED',
  REQUEST_WALLET_CONNECTION_REVIEW: 'REQUEST_WALLET_CONNECTION_REVIEW',
  REQUEST_WALLET_SELECTION: 'REQUEST_WALLET_SELECTION',
  REQUEST_PERMISSIONS_REVIEW: 'REQUEST_PERMISSIONS_REVIEW',
  REQUEST_TRANSACTION_REVIEW_FOR_SENDING:
    'REQUEST_TRANSACTION_REVIEW_FOR_SENDING',
  TRANSACTION_SUCCEEDED: 'TRANSACTION_SUCCEEDED',
  TRANSACTION_FAILED: 'TRANSACTION_FAILED',
  REQUEST_PASSPHRASE: 'REQUEST_PASSPHRASE',
  REQUEST_SUCCEEDED: 'REQUEST_SUCCEEDED',
  ERROR_OCCURRED: 'ERROR_OCCURRED',
  LOG: 'LOG',
}

export type RequestWalletConnection = {
  traceID: string
  name: 'REQUEST_WALLET_CONNECTION_REVIEW'
  data: RequestWalletConnectionContent
}

export type RequestWalletSelection = {
  traceID: string
  name: 'REQUEST_WALLET_SELECTION'
  data: RequestWalletSelectionContent
}

export type RequestPermissions = {
  traceID: string
  name: 'REQUEST_PERMISSIONS_REVIEW'
  data: RequestPermissionsContent
}

export type RequestTransactionReview = {
  traceID: string
  name: 'REQUEST_TRANSACTION_REVIEW_FOR_SENDING'
  data: RequestTransactionReviewContent
}

export type RequestTransactionSuccess = {
  traceID: string
  name: 'TRANSACTION_SUCCEEDED'
  data: RequestTransactionSuccessContent
}

export type RequestTransactionFailure = {
  traceID: string
  name: 'TRANSACTION_FAILED'
  data: RequestTransactionFailureContent
}

export type RequestPassphrase = {
  traceID: string
  name: 'REQUEST_PASSPHRASE'
  data: RequestPassphraseContent
}

export type RequestSucceeded = {
  traceID: string
  name: 'REQUEST_SUCCEEDED'
  data: RequestSucceededContent
}

export type ErrorOccurred = {
  traceID: string
  name: 'ERROR_OCCURRED'
  data: ErrorOccurredContent
}

export type Log = {
  traceID: string
  name: 'LOG'
  data: LogContent
}

export type SessionStarted = {
  traceID: string
  name: 'INTERACTION_SESSION_BEGAN'
  data: SessionStartedData
}

export type SessionEnded = {
  traceID: string
  name: 'INTERACTION_SESSION_ENDED'
}

export type RawInteraction =
  | RequestWalletConnection
  | RequestWalletSelection
  | RequestPermissions
  | RequestTransactionReview
  | RequestTransactionSuccess
  | RequestTransactionFailure
  | RequestPassphrase
  | RequestSucceeded
  | ErrorOccurred
  | Log
  | SessionStarted
  | SessionEnded

export type Interaction<T extends RawInteraction = RawInteraction> = {
  meta: {
    id: string
  }
  event: T
}

// Responses

export type InteractionResponseType =
  | 'CANCEL_REQUEST'
  | 'DECISION'
  | 'ENTERED_PASSPHRASE'
  | 'WALLET_CONNECTION_DECISION'
  | 'SELECTED_WALLET'

export const INTERACTION_RESPONSE_TYPE: Record<
  InteractionResponseType,
  InteractionResponseType
> = {
  CANCEL_REQUEST: 'CANCEL_REQUEST',
  DECISION: 'DECISION',
  ENTERED_PASSPHRASE: 'ENTERED_PASSPHRASE',
  WALLET_CONNECTION_DECISION: 'WALLET_CONNECTION_DECISION',
  SELECTED_WALLET: 'SELECTED_WALLET',
}

// response data types

export interface EnteredPassphrase {
  passphrase: string
}

export type ConnectionResponseKeyType = 'APPROVED_ONCE' | 'REJECTED_ONCE'

export type ConnectionResponseType =
  | 'APPROVED_ONLY_THIS_TIME'
  | 'REJECTED_ONLY_THIS_TIME'

export const CONNECTION_RESPONSE: Record<
  ConnectionResponseKeyType,
  ConnectionResponseType
> = {
  APPROVED_ONCE: 'APPROVED_ONLY_THIS_TIME',
  REJECTED_ONCE: 'REJECTED_ONLY_THIS_TIME',
}
export interface WalletConnectionDecision {
  connectionApproval: ConnectionResponseType
}

export interface SelectedWallet {
  wallet: string
}

export interface Decision {
  approved: boolean
}

// response types

export type InteractionResponseEnteredPassphrase = {
  traceID: string
  name: 'ENTERED_PASSPHRASE'
  data: EnteredPassphrase
}

export type InteractionResponseWalletConnectionDecision = {
  traceID: string
  name: 'WALLET_CONNECTION_DECISION'
  data: WalletConnectionDecision
}

export type InteractionResponseSelectedWallet = {
  traceID: string
  name: 'SELECTED_WALLET'
  data: SelectedWallet
}

export type InteractionResponseDecision = {
  traceID: string
  name: 'DECISION'
  data: Decision
}

export type InteractionResponseCancelEvent = {
  traceID: string
  name: 'CANCEL_REQUEST'
}

export type InteractionResponse =
  | InteractionResponseEnteredPassphrase
  | InteractionResponseWalletConnectionDecision
  | InteractionResponseSelectedWallet
  | InteractionResponseDecision
  | InteractionResponseCancelEvent
