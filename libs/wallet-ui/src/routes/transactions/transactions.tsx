import { List } from '../../components/list'
import { TransactionStatus } from '../../components/transaction-status'
import { formatDate } from '../../lib/date'
import type { Transaction } from '../../lib/transactions'
import { TRANSACTION_TITLES } from '@vegaprotocol/wallet-types'
import { truncateMiddle } from '../../lib/truncate-middle'

export const TransactionHome = ({
  transactions,
}: {
  transactions: Transaction[]
}) => {
  return (
    <div>
      <h1 className="text-2xl" data-testid="transactions-header">
        Transactions
      </h1>
      <List
        empty={
          <p data-testid="transactions-empty" className="pt-8">
            You have no transactions this session.
          </p>
        }
        items={transactions}
        idProp="id"
        renderItem={(transaction) => (
          <div data-testid="transactions-transaction">
            <TransactionStatus transaction={transaction} />
            <div className="flex justify-between">
              <div data-testid="transactions-type" className="text-lg">
                {TRANSACTION_TITLES[transaction.type]}
              </div>
              <div data-testid="transactions-hash">
                {transaction.txHash ? truncateMiddle(transaction.txHash) : null}
              </div>
            </div>
            <div className="flex justify-between text-dark-400">
              <div data-testid="transactions-sender">
                {transaction.wallet}, {truncateMiddle(transaction.publicKey)}
              </div>
              <div data-testid="transactions-date">
                {formatDate(transaction.receivedAt)}
              </div>
            </div>
          </div>
        )}
      />
    </div>
  )
}
