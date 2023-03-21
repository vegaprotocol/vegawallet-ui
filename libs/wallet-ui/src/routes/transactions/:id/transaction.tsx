import { ListItem } from '../../../components/list'
import { TransactionStatus } from '../../../components/transaction-status'
import type { Transaction } from '../../../lib/transactions'
import { TRANSACTION_TITLES } from '@vegaprotocol/wallet-types'
import {
  AnchorButton,
  ExternalLink,
  truncateMiddle,
} from '@vegaprotocol/ui-toolkit'
import { formatDate } from '../../../lib/date'
import type { ReactNode } from 'react'
import { useExplorerUrl } from '../../../hooks/use-explorer-url'
import { TransactionLogs } from '../../../components/transaction-logs'
import { CodeWindow } from '../../../components/code-window'

const TransactionDetailsItem = ({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) => (
  <div>
    <div className="text-dark-300 uppercase">{title}</div>
    <div>{children}</div>
  </div>
)

export const TransactionPage = ({
  transaction,
}: {
  transaction: Transaction
}) => {
  const explorerUrl = useExplorerUrl()
  return (
    <section>
      <h1 className="text-2xl mb-2" data-testid="transactions-header">
        {TRANSACTION_TITLES[transaction.type]}
      </h1>
      <TransactionStatus transaction={transaction} />
      <ul>
        <ListItem
          item={transaction}
          renderItem={(transaction) => (
            <TransactionDetailsItem title="Wallet">
              {transaction.wallet}
            </TransactionDetailsItem>
          )}
        />
        <ListItem
          item={transaction}
          renderItem={(transaction) => (
            <TransactionDetailsItem title="Wallet">
              <ExternalLink
                className="uppercase"
                href={`${explorerUrl}/parties/${transaction.publicKey}`}
              >
                {truncateMiddle(transaction.publicKey)}
              </ExternalLink>
            </TransactionDetailsItem>
          )}
        />
        <ListItem
          item={transaction}
          renderItem={(transaction) => (
            <TransactionDetailsItem title="Details">
              <CodeWindow
                content={JSON.stringify(transaction.payload, null, 2)}
                text={JSON.stringify(transaction.payload)}
              />
            </TransactionDetailsItem>
          )}
        />
        <ListItem
          item={transaction}
          renderItem={(transaction) => (
            <TransactionDetailsItem title="Received At">
              {formatDate(transaction.receivedAt)}
            </TransactionDetailsItem>
          )}
        />
        <ListItem
          item={transaction}
          renderItem={(transaction) => (
            <TransactionDetailsItem title="Event logs">
              <TransactionLogs logs={transaction.logs} isVisible={true} />
            </TransactionDetailsItem>
          )}
        />
        {transaction.txHash && (
          <ListItem
            item={transaction}
            renderItem={(transaction) => (
              <TransactionDetailsItem title="Transaction hash">
                <ExternalLink href={`${explorerUrl}/txs/${transaction.txHash}`}>
                  {truncateMiddle(transaction.txHash)}
                </ExternalLink>
              </TransactionDetailsItem>
            )}
          />
        )}
      </ul>
      {/* TODO correct link */}
      <div className="mt-6 flex justify-center">
        <AnchorButton href="explorer.vega.xyz">
          View on block explorer
        </AnchorButton>
      </div>
    </section>
  )
}
