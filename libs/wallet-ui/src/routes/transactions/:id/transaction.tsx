import { ListItem } from '../../../components/list'
import { TransactionStatus } from '../../../components/transaction-status'
import type { Transaction } from '../../../lib/transactions'
import { TransactionKeys, TRANSACTION_TITLES } from '@vegaprotocol/wallet-types'
import {
  CopyWithTooltip,
  ExternalLink,
  Notification,
  truncateMiddle,
  Intent,
} from '@vegaprotocol/ui-toolkit'
import { formatDate } from '../../../lib/date'
import type { ReactNode } from 'react'
import { useExplorerLinks } from '../../../hooks/use-explorer-url'
import { TransactionLogs } from '../../../components/transaction-logs'
import { CodeWindow } from '../../../components/code-window'
import { Copy } from '../../../components/icons/copy'
import { CollapsiblePanel } from '../../../components/collapsible-panel'
import { useParams } from 'react-router-dom'
import { useGlobal } from '../../../contexts/global/global-context'
import { TransactionNotFound } from './transaction-not-found'
import { useFullscreenRoute } from '../../../contexts/fullscreen/hooks'
import { Page } from '../../../components/page'
import { Paths } from '../..'

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
  const { getTxUrl, getPartyUrl, getBlockUrl } = useExplorerLinks()
  const { signature, txHash, publicKey, blockHeight } = transaction

  const partyUrl = getPartyUrl(publicKey)
  const blockUrl = getBlockUrl(blockHeight?.toString())
  const txUrl = getTxUrl(txHash)

  const partyLink = partyUrl ? (
    <ExternalLink className="uppercase" href={partyUrl}>
      {truncateMiddle(transaction.publicKey)}
    </ExternalLink>
  ) : (
    truncateMiddle(transaction.publicKey)
  )

  const blockLink = blockUrl ? (
    <ExternalLink className="underline" href={blockUrl}>
      {transaction.blockHeight?.toString()}
    </ExternalLink>
  ) : (
    blockHeight?.toString()
  )

  const txLink = txUrl ? (
    <ExternalLink href={txUrl}>{truncateMiddle(txHash as string)}</ExternalLink>
  ) : (
    truncateMiddle(txHash || '')
  )

  return (
    <Page
      name={
        TRANSACTION_TITLES[transaction.type] ||
        TRANSACTION_TITLES[TransactionKeys.UNKNOWN]
      }
      back={Paths.Transactions.Home}
    >
      <>
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
            renderItem={() => (
              <TransactionDetailsItem title="Public Key">
                {partyLink}
              </TransactionDetailsItem>
            )}
          />
          {transaction.blockHeight && (
            <ListItem
              item={transaction}
              renderItem={(transaction) => (
                <TransactionDetailsItem title="Block height">
                  {blockLink}
                </TransactionDetailsItem>
              )}
            />
          )}
          {signature ? (
            <ListItem
              item={transaction}
              renderItem={() => (
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
              <div>
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
              </div>
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
                  panelContent={<TransactionLogs logs={transaction.logs} />}
                />
              )}
            />
          ) : null}
          {txHash ? (
            <ListItem
              item={transaction}
              renderItem={() => (
                <TransactionDetailsItem title="Transaction hash">
                  {txLink}
                </TransactionDetailsItem>
              )}
            />
          ) : null}
        </ul>
        {txUrl && (
          <div className="mt-6 flex justify-center">
            <ExternalLink
              className="border rounded p-4 w-full justify-center"
              href={txUrl}
            >
              <span>View in block explorer</span>
            </ExternalLink>
          </div>
        )}
      </>
    </Page>
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
