import classnames from 'classnames'
import type { Transaction } from '../../lib/transactions'
import { TransactionStatus as TransactionStatusTypes } from '@vegaprotocol/wallet-types'

const getTransactionInfo = (status?: string) => {
  switch (status) {
    case TransactionStatusTypes.SUCCESS: {
      return {
        background: 'bg-vega-green-500',
        textColor: 'text-black',
        text: 'Successful',
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
        background: 'bg-dark-200',
        textColor: 'text-white',
        text: 'Rejected',
      }
    }
    case TransactionStatusTypes.PENDING: {
      return {
        background: 'bg-vega-blue-500',
        textColor: 'text-white',
        text: 'In Progress',
      }
    }
    default: {
      return {
        background: 'bg-neutral',
        textColor: 'text-black',
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
        'inline-block w-min whitespace-nowrap py-1 px-2 mb-0 rounded-sm',
        background,
        textColor
      )}
    >
      {text}
    </span>
  )
}
