import type { QueueItem } from './provider'
import { WalletConnection, TransactionReview, PermissionRequest } from './flows'

type InteractionDisplayProps = QueueItem

export const InteractionDisplay = (p: InteractionDisplayProps) => {
  switch (p.workflow) {
    case 'WALLET_CONNECTION': {
      return <WalletConnection {...p} />
    }
    case 'TRANSACTION_REVIEW': {
      return <TransactionReview {...p} />
    }
    case 'PERMISSION_REQUEST': {
      return <PermissionRequest {...p} />
    }
    default: {
      return null
    }
  }
}
