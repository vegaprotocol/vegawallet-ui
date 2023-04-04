import { ListItem } from '../../../components/list'
import { TransactionStatus } from '../../../components/transaction-status'
import type { Transaction } from '../../../lib/transactions'
import { TRANSACTION_TITLES } from '@vegaprotocol/wallet-types'
import {
  AnchorButton,
  CopyWithTooltip,
  ExternalLink,
  Notification,
  truncateMiddle,
  Intent,
} from '@vegaprotocol/ui-toolkit'
import { formatDate } from '../../../lib/date'
import type { ReactNode } from 'react'
import { useExplorerUrl } from '../../../hooks/use-explorer-url'
import { TransactionLogs } from '../../../components/transaction-logs'
import { CodeWindow } from '../../../components/code-window'
import { Copy } from '../../../components/icons/copy'
import { CollapsiblePanel } from '../../../components/collapsible-panel'
import { useNavigate, useParams } from 'react-router-dom'
import { useGlobal } from '../../../contexts/global/global-context'
import { TransactionNotFound } from './transaction-not-found'
import { useFullscreenRoute } from '../../../contexts/fullscreen/hooks'
import { Cross } from '../../../components/icons/cross'

const TransactionDetailsItem = ({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) => {
  useFullscreenRoute()
  return (
    <div>
      <div className="text-dark-300 uppercase">{title}</div>
      <div>{children}</div>
    </div>
  )
}

export const TransactionDetails = ({
  transaction,
}: {
  transaction: Transaction
}) => {
  const explorerUrl = useExplorerUrl()
  const { signature, txHash } = transaction
  const navigate = useNavigate()
  return (
    <section className="p-4">
      <div className="flex justify-between">
        <h1
          className="flex flex-col justify-center text-2xl mb-2"
          data-testid="transactions-header"
        >
          {TRANSACTION_TITLES[transaction.type]}
        </h1>
        <button onClick={() => navigate('/transactions')}>
          <Cross className="h-10" />
        </button>
      </div>
      <TransactionStatus transaction={transaction} />
      <ul>
        <ListItem
          data-testid="transaction-wallet-name"
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
        {transaction.blockHeight && (
          <ListItem
            data-testid="transaction-wallet-name"
            item={transaction}
            renderItem={(transaction) => (
              <TransactionDetailsItem title="Wallet">
                {transaction.wallet}
              </TransactionDetailsItem>
            )}
          />
        )}
        {transaction.blockHeight && (
          <ListItem
            item={transaction}
            renderItem={(transaction) => (
              <TransactionDetailsItem title="Block height">
                <ExternalLink
                  className="underline"
                  href={`${explorerUrl}/block/${transaction.blockHeight}`}
                >
                  {transaction.blockHeight?.toString()}
                </ExternalLink>
              </TransactionDetailsItem>
            )}
          />
        )}
        {signature ? (
          <ListItem
            item={transaction}
            renderItem={(transaction) => (
              <TransactionDetailsItem title="Signature">
                <CopyWithTooltip text={signature}>
                  <span>
                    <span>{truncateMiddle(signature)}</span>
                    <Copy className="w-3 ml-1" />
                  </span>
                </CopyWithTooltip>
              </TransactionDetailsItem>
            )}
          />
        ) : null}
        {transaction.error && (
          <ListItem
            item={transaction}
            renderItem={(transaction) => (
              <TransactionDetailsItem title="Error">
                <div className="mt-2">
                  <Notification
                    intent={Intent.Danger}
                    message={transaction.error}
                  />
                </div>
              </TransactionDetailsItem>
            )}
          />
        )}
        <ListItem
          item={transaction}
          renderItem={(transaction) => (
            <CollapsiblePanel
              title="Details"
              initiallyOpen={true}
              panelContent={
                <CodeWindow
                  content={JSON.stringify(transaction.payload, null, 2)}
                  text={JSON.stringify(transaction.payload)}
                />
              }
            />
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
        {transaction.logs.length ? (
          <ListItem
            item={transaction}
            renderItem={(transaction) => (
              <CollapsiblePanel
                title="Event logs"
                initiallyOpen={false}
                panelContent={
                  <TransactionLogs logs={transaction.logs} isVisible={true} />
                }
              />
            )}
          />
        ) : null}
        {txHash ? (
          <ListItem
            item={transaction}
            renderItem={(transaction) => (
              <TransactionDetailsItem title="Transaction hash">
                <ExternalLink href={`${explorerUrl}/txs/${txHash}`}>
                  {truncateMiddle(txHash)}
                </ExternalLink>
              </TransactionDetailsItem>
            )}
          />
        ) : null}
      </ul>
      {transaction.txHash && (
        <div className="mt-6 flex justify-center">
          <AnchorButton href={`${explorerUrl}/txs/${transaction.txHash}`}>
            View on block explorer
          </AnchorButton>
        </div>
      )}
    </section>
  )
}

export const TransactionPage = () => {
  const { id } = useParams<{ id: string }>()
  const { state } = useGlobal()
  if (!id) {
    return <TransactionNotFound />
  }
  const transaction = state.transactions[id]
  if (!transaction) {
    return <TransactionNotFound />
  }
  return <TransactionDetails transaction={transaction} />
}
