import { useMemo } from 'react'
import { TransactionStatus } from '../../components/transaction-status'
import { formatDate } from '../../lib/date'
import type { Transaction } from '../../lib/transactions'
import { TRANSACTION_TITLES } from '../../lib/transactions'
import { truncateMiddle } from '../../lib/truncate-middle'

export const TransactionHome = ({
  transactions,
}: {
  transactions: Transaction[]
}) => {
  const isEmpty = useMemo(() => transactions.length === 0, [transactions])
  return (
    <div>
      <h1 className="text-2xl" data-testid="transactions-header">
        Transactions
      </h1>
      {isEmpty ? (
        <p data-testid="transactions-empty">
          You have no transactions this session.
        </p>
      ) : (
        <ul className="pt-4">
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <div className="border-b border-1 border-dark-200 py-4">
                <TransactionStatus transaction={transaction} />
                <div className="flex justify-between">
                  <div className="text-lg">
                    {TRANSACTION_TITLES[transaction.type]}
                  </div>
                  <div>
                    {transaction.txHash
                      ? truncateMiddle(transaction.txHash)
                      : null}
                  </div>
                </div>
                <div className="flex justify-between text-dark-400">
                  <div>
                    {transaction.wallet},{' '}
                    {truncateMiddle(transaction.publicKey)}
                  </div>
                  <div>{formatDate(transaction.receivedAt)}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
