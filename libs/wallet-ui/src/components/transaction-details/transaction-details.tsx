import classnames from 'classnames'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useExplorerUrl } from '../../hooks/use-explorer-url'
import { formatDate } from '../../lib/date'
import type { Transaction } from '../../lib/transactions'
import { truncateMiddle } from '../../lib/truncate-middle'
import { ButtonUnstyled } from '../button-unstyled'
import { BreakText } from '../break-text'
import { CodeBlock } from '../code-block'
import { CopyWithTooltip } from '../copy-with-tooltip'
import { ArrowTopRight } from '../icons/arrow-top-right'
import { DropdownArrow } from '../icons/dropdown-arrow'
import { Title } from '../title'
import { ExternalLink } from '../external-link'
import { TransactionStatus } from '../transaction-status'

type TransactionDetailsProps = {
  transaction: Transaction
}

type SectionListProps = {
  transaction: Transaction
  explorerUrl?: string
  isLogSectionVisible: boolean
  isDetailSectionVisible: boolean
  onViewLogs: () => void
  onViewDetails: () => void
}

const compileSectionList = ({
  transaction,
  explorerUrl,
  isLogSectionVisible,
  isDetailSectionVisible,
  onViewLogs,
  onViewDetails,
}: SectionListProps) => {
  const rows: Array<{ key?: string | ReactNode; value: ReactNode }> = [
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

  if (transaction.logs.length) {
    rows.push({
      key: (
        <>
          <span>Event log</span>
          <ButtonUnstyled className="ml-[10px]" onClick={onViewLogs}>
            <DropdownArrow
              className={classnames('w-[10px]', {
                'rotate-180': isLogSectionVisible,
              })}
            />
          </ButtonUnstyled>
        </>
      ),
      value: (
        <CodeBlock
          className={classnames('text-xs mb-0', {
            hidden: !isLogSectionVisible,
          })}
          onClick={onViewLogs}
        >
          {transaction.logs.map((entry, i) => (
            <p
              key={i}
              className={classnames({
                'text-success-light': entry.type === 'Success',
                'text-warning-light': entry.type === 'Warning',
                'text-danger-light': entry.type === 'Error',
                'text-neutral-light': entry.type === 'Info',
              })}
            >
              {entry.message}
            </p>
          ))}
        </CodeBlock>
      ),
    })
  }

  rows.push({
    key: (
      <>
        <span>Transaction details</span>
        <ButtonUnstyled className="ml-[10px]" onClick={onViewDetails}>
          <DropdownArrow
            className={classnames('w-[10px]', {
              'rotate-180': isDetailSectionVisible,
            })}
          />
        </ButtonUnstyled>
      </>
    ),
    value: (
      <CodeBlock
        className={classnames('text-xs mb-0', {
          hidden: !isDetailSectionVisible,
        })}
      >
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

  if (transaction.txHash) {
    rows.push({
      key: 'Transaction hash',
      value: explorerUrl ? (
        <ExternalLink href={`${explorerUrl}/txs/${transaction.txHash}`}>
          {truncateMiddle(transaction.txHash)}
          <ArrowTopRight className="w-[13px] ml-[6px]" />
        </ExternalLink>
      ) : (
        <CopyWithTooltip text={transaction.txHash}>
          {truncateMiddle(transaction.txHash)}
        </CopyWithTooltip>
      ),
    })
  }

  return rows
}

export const TransactionDetails = ({
  transaction,
}: TransactionDetailsProps) => {
  const [isDetailSectionVisible, setDetailSectionVisible] = useState(false)
  const [isLogSectionVisible, setLogSectionVisible] = useState(false)
  const explorerUrl = useExplorerUrl()
  const sectionList = compileSectionList({
    transaction,
    explorerUrl,
    isLogSectionVisible,
    isDetailSectionVisible,
    onViewLogs: () => setLogSectionVisible(!isLogSectionVisible),
    onViewDetails: () => setDetailSectionVisible(!isDetailSectionVisible),
  })

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
