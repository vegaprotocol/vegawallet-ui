import { List } from '../../../components/list'
import { TransactionStatus } from '../../../components/transaction-status'
import { formatDate } from '../../../lib/date'
import type { Transaction } from '../../../lib/transactions'
import { TRANSACTION_TITLES } from '@vegaprotocol/wallet-types'
import { truncateMiddle } from '../../../lib/truncate-middle'
import { useGlobal } from '../../../contexts/global/global-context'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { Page } from '../../../components/page'

export const TransactionHome = ({
  transactions,
}: {
  transactions: Transaction[]
}) => {
  return (
    <Page name="Transaction">
      <List
        clickable={true}
        empty={
          <p data-testid="transactions-empty" className="pt-8">
            You have no transactions this session.
          </p>
        }
        items={transactions}
        idProp="id"
        renderItem={(transaction) => (
          <NavLink to={{ pathname: `/transactions/${transaction.id}` }}>
            <div data-testid="transactions-transaction">
              <TransactionStatus transaction={transaction} />
              <div className="flex justify-between">
                <div data-testid="transactions-type" className="text-lg">
                  {TRANSACTION_TITLES[transaction.type]}
                </div>
                <div data-testid="transactions-hash">
                  {transaction.txHash
                    ? truncateMiddle(transaction.txHash)
                    : null}
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
          </NavLink>
        )}
      />
    </Page>
  )
}

export const TransactionHomePage = () => {
  const { state } = useGlobal()
  const transactions = useMemo(() => {
    return Object.values(state.transactions).sort((a, b) => {
      return a.receivedAt.getTime() - b.receivedAt.getTime()
    })
  }, [state.transactions])
  return <TransactionHome transactions={transactions} />
}
