import classnames from 'classnames'
import type { Transaction } from '../../lib/transactions'
import { TransactionStatus as TransactionStatusTypes } from '@vegaprotocol/wallet-types'

const getTransactionInfo = (status?: TransactionStatusTypes) => {
  switch (status) {
    case TransactionStatusTypes.SUCCESS: {
      return {
        background: 'bg-success',
        text: 'Approved',
      }
    }
    case TransactionStatusTypes.FAILURE: {
      return {
        background: 'bg-danger',
        text: 'Failed',
      }
    }
    case TransactionStatusTypes.REJECTED: {
      return {
        background: 'bg-danger',
        text: 'Rejected',
      }
    }
    case TransactionStatusTypes.PENDING: {
      return {
        background: 'bg-neutral',
        text: 'Pending',
      }
    }
    default: {
      return {
        background: 'bg-neutral',
        text: 'Unknown',
      }
    }
  }
}

type TransactionStatusProps = {
  transaction: Transaction
}

export const TransactionStatus = ({ transaction }: TransactionStatusProps) => {
  const { background, text } = getTransactionInfo(transaction.status)

  return (
    <span
      data-testid="transaction-status"
      className={classnames(
        'inline-block text-white py-[4px] px-[8px] m-[8px] mb-0 rounded-sm',
        background
      )}
    >
      {text}
    </span>
  )
}
