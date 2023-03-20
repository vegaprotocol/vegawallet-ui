import classnames from 'classnames'
import type { Transaction } from '../../lib/transactions'
import { TransactionStatus as TransactionStatusTypes } from '@vegaprotocol/wallet-types'

const getTransactionInfo = (status?: TransactionStatusTypes) => {
  switch (status) {
    case TransactionStatusTypes.SUCCESS: {
      return {
        background: 'bg-vega-green-500',
        textColor: 'text-black',
        text: 'Approved',
      }
    }
    case TransactionStatusTypes.FAILURE: {
      return {
        background: 'bg-vega-pink-500',
        textColor: 'text-white',
        text: 'Failed',
      }
    }
    case TransactionStatusTypes.REJECTED: {
      return {
        background: 'bg-vega-pink-500',
        textColor: 'text-white',
        text: 'Rejected',
      }
    }
    case TransactionStatusTypes.PENDING: {
      return {
        background: 'bg-vega-blue-500',
        textColor: 'text-white',
        text: 'Pending',
      }
    }
    default: {
      return {
        background: 'bg-neutral',
        textColor: 'text-white',
        text: 'Unknown',
      }
    }
  }
}

type TransactionStatusProps = {
  transaction: Transaction
}

export const TransactionStatus = ({ transaction }: TransactionStatusProps) => {
  const { background, text, textColor } = getTransactionInfo(transaction.status)

  return (
    <span
      data-testid="transaction-status"
      className={classnames(
        'inline-block py-1 px-2 mb-0 rounded-sm',
        background,
        textColor
      )}
    >
      {text}
    </span>
  )
}
