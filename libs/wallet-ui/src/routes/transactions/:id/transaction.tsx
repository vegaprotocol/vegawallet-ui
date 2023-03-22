import { ListItem } from '../../../components/list'
import { TransactionStatus } from '../../../components/transaction-status'
import type { Transaction } from '../../../lib/transactions'
import { TRANSACTION_TITLES } from '@vegaprotocol/wallet-types'
import {
  AnchorButton,
  CopyWithTooltip,
  ExternalLink,
  truncateMiddle,
} from '@vegaprotocol/ui-toolkit'
import { formatDate } from '../../../lib/date'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useExplorerUrl } from '../../../hooks/use-explorer-url'
import { TransactionLogs } from '../../../components/transaction-logs'
import { CodeWindow } from '../../../components/code-window'
import { DropdownArrow } from '../../../components/icons/dropdown-arrow'
import classnames from 'classnames'
import { Copy } from '../../../components/icons/copy'

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

const CollapsiblePanel = ({
  initialState,
  title,
  panelContent,
}: {
  initialState: boolean
  title: string
  panelContent: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(initialState)
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <span className="text-dark-300 uppercase">{title}</span>
        <DropdownArrow
          className={classnames('w-3 ml-3 mb-1', {
            'rotate-180': isOpen,
          })}
        />
      </button>
      <div className={!isOpen ? 'hidden' : ''}>{panelContent}</div>
    </div>
  )
}

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
            item={transaction}
            renderItem={(transaction) => (
              <TransactionDetailsItem title="Block height">
                <ExternalLink
                  className="uppercase"
                  href={`${explorerUrl}/block/${transaction.publicKey}`}
                >
                  {transaction.blockHeight}
                </ExternalLink>
              </TransactionDetailsItem>
            )}
          />
        )}
        {transaction.signature && (
          <ListItem
            item={transaction}
            renderItem={(transaction) => (
              <TransactionDetailsItem title="Signature">
                <CopyWithTooltip text={transaction.signature}>
                  <span>
                    <span>{truncateMiddle(transaction.signature)}</span>
                    <Copy className="w-3 ml-1" />
                  </span>
                </CopyWithTooltip>
              </TransactionDetailsItem>
            )}
          />
        )}
        <ListItem
          item={transaction}
          renderItem={(transaction) => (
            <CollapsiblePanel
              title="Details"
              initialState={true}
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
                initialState={true}
                panelContent={
                  <TransactionLogs logs={transaction.logs} isVisible={true} />
                }
              />
            )}
          />
        ) : null}
        {transaction.txHash ? (
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
