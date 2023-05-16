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
    <Page name="Transactions">
      <List
        clickable={true}
        empty={
          <p data-testid="transactions-empty" className="pt-4 text-base">
            You have no transactions this session.
          </p>
        }
        items={transactions}
        idProp="id"
        renderItem={(transaction) => (
          <NavLink to={{ pathname: `/transactions/${transaction.id}` }}>
            <div className="text-base" data-testid="transactions-transaction">
              <div className="text-sm">
                <TransactionStatus transaction={transaction} />
              </div>
              <div className="flex justify-between">
                <div data-testid="transactions-type" className="">
                  {TRANSACTION_TITLES[transaction.type]}
                </div>
                <div className="text-sm" data-testid="transactions-hash">
                  {transaction.txHash
                    ? truncateMiddle(transaction.txHash)
                    : null}
                </div>
              </div>
              <div className="flex justify-between text-dark-400 text-sm">
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
      return b.receivedAt.getTime() - a.receivedAt.getTime()
    })
  }, [state.transactions])
  return <TransactionHome transactions={transactions} />
}
