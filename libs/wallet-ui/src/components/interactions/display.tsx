import type {
  WalletConnectionProps,
  TransactionReviewProps,
  PermissionRequestProps} from './flows';
import {
  WalletConnection,
  TransactionReview,
  PermissionRequest
} from './flows'

export type InteractionDisplayProps =
  | WalletConnectionProps
  | TransactionReviewProps
  | PermissionRequestProps

export const InteractionDisplay = (p: InteractionDisplayProps) => {
  switch (p.data.workflow) {
    case 'WALLET_CONNECTION': {
      return <WalletConnection {...(p as WalletConnectionProps)} />
    }
    case 'TRANSACTION_REVIEW': {
      return <TransactionReview {...(p as TransactionReviewProps)} />
    }
    case 'PERMISSION_REQUEST': {
      return <PermissionRequest {...(p as PermissionRequestProps)} />
    }
    default: {
      return null
    }
  }
}
