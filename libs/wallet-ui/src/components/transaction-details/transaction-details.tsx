import type { ReactNode } from 'react'
import { useExplorerUrl } from '../../hooks/use-explorer-url'
import { formatDate } from '../../lib/date'
import type { Transaction } from '../../lib/transactions'
import { truncateMiddle } from '../../lib/truncate-middle'
import { BreakText } from '../break-text'
import { CodeBlock } from '../code-block'
import { CopyWithTooltip } from '../copy-with-tooltip'
import { ArrowTopRight } from '../icons/arrow-top-right'
import { Title } from '../title'
import { ExternalLink } from '../external-link'
import { TransactionStatus } from '../transaction-status'

type TransactionDetailsProps = {
  transaction: Transaction
}

const compileSectionList = (transaction: Transaction, explorerUrl?: string) => {
  const rows: Array<{ key?: string; value: ReactNode }> = [
    {
      value: <TransactionStatus transaction={transaction} />,
    },
    {
      key: 'Wallet',
      value: <p>{transaction.wallet}</p>,
    },
    {
      key: 'Public key',
      value: (
        <CopyWithTooltip text={transaction.publicKey}>
          <BreakText>{transaction.publicKey}</BreakText>
        </CopyWithTooltip>
      ),
    },
  ]

  if (transaction.blockHeight) {
    rows.push({
      key: 'Block height',
      value: explorerUrl ? (
        <ExternalLink href={`${explorerUrl}/blocks/${transaction.blockHeight}`}>
          {transaction.blockHeight}
          <ArrowTopRight className="w-[13px] ml-[6px]" />
        </ExternalLink>
      ) : (
        transaction.blockHeight
      ),
    })
  }

  if (transaction.signature) {
    rows.push({
      key: 'Signature',
      value: (
        <CopyWithTooltip text={transaction.signature}>
          {truncateMiddle(transaction.signature)}
        </CopyWithTooltip>
      ),
    })
  }

  if (transaction.error) {
    rows.push({
      key: 'Error',
      value: <p>{transaction.error}</p>,
    })
  }

  rows.push({
    key: 'Transaction details',
    value: (
      <CodeBlock className="text-xs mb-0">
        <pre data-testid="transaction-payload">
          {JSON.stringify(transaction.payload, null, 2)}
        </pre>
      </CodeBlock>
    ),
  })

  rows.push({
    key: 'Received at',
    value: <p>{formatDate(new Date(transaction.receivedAt))}</p>,
  })

  return rows
}

export const TransactionDetails = ({
  transaction,
}: TransactionDetailsProps) => {
  const explorerUrl = useExplorerUrl()
  const sectionList = compileSectionList(transaction, explorerUrl)

  return (
    <div>
      {sectionList.map(({ key, value }, index) => (
        <div key={index} className="px-[20px] pb-[20px]">
          {key && <Title className="m-0 mb-[12px]">{key}</Title>}
          {value}
        </div>
      ))}
    </div>
  )
}
