import classnames from 'classnames'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useExplorerLinks } from '../../hooks/use-explorer-url'
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
import { TransactionLogs } from '../transaction-logs'
import { Warning } from '../icons/warning'

type TransactionDetailsProps = {
  transaction: Transaction
  showStatus?: boolean
}

type SectionListProps = {
  transaction: Transaction
  showStatus: boolean
  blockUrl: string | undefined
  txUrl: string | undefined
  isLogSectionVisible: boolean
  isDetailSectionVisible: boolean
  onViewLogs: () => void
  onViewDetails: () => void
}

const compileSectionList = ({
  transaction,
  showStatus,
  blockUrl,
  txUrl,
  isLogSectionVisible,
  isDetailSectionVisible,
  onViewLogs,
  onViewDetails,
}: SectionListProps) => {
  const rows: Array<{ key?: string | ReactNode; value: ReactNode }> = []

  if (showStatus) {
    rows.push({
      value: <TransactionStatus transaction={transaction} />,
    })
  }

  if (transaction.error) {
    rows.push({
      key: (
        <div className="flex">
          <Warning className="w-[12px] mr-[10px] text-danger-light" />
          <span>Error</span>
        </div>
      ),
      value: <p className="text-neutral-light">{transaction.error}</p>,
    })
  }

  rows.push({
    key: 'Wallet',
    value: <p className="text-neutral-light">{transaction.wallet}</p>,
  })

  rows.push({
    key: 'Public key',
    value: (
      <CopyWithTooltip text={transaction.publicKey}>
        <BreakText className="text-neutral-light">
          {transaction.publicKey}
        </BreakText>
      </CopyWithTooltip>
    ),
  })

  if (transaction.blockHeight) {
    rows.push({
      key: 'Block height',
      value: blockUrl ? (
        <ExternalLink className="text-neutral-light" href={blockUrl as string}>
          {transaction.blockHeight}
          <ArrowTopRight className="w-[13px] ml-[6px]" />
        </ExternalLink>
      ) : (
        <p className="text-neutral-light">{transaction.blockHeight}</p>
      ),
    })
  }

  if (transaction.signature) {
    rows.push({
      key: 'Signature',
      value: (
        <CopyWithTooltip text={transaction.signature}>
          <span className="text-neutral-light">
            {truncateMiddle(transaction.signature)}
          </span>
        </CopyWithTooltip>
      ),
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
      value: <TransactionLogs logs={transaction.logs} />,
    })
  }

  rows.push({
    key: (
      <div data-testid="transaction-details-key">
        <span>Transaction details</span>
        <ButtonUnstyled className="ml-[10px]" onClick={onViewDetails}>
          <DropdownArrow
            className={classnames('w-[10px]', {
              'rotate-180': isDetailSectionVisible,
            })}
          />
        </ButtonUnstyled>
      </div>
    ),
    value: (
      <div data-testid="transaction-details-value">
        <CodeBlock
          className={classnames('text-xs mb-0', {
            hidden: !isDetailSectionVisible,
          })}
        >
          <pre data-testid="transaction-payload">
            {JSON.stringify(transaction.payload, null, 2)}
          </pre>
        </CodeBlock>
      </div>
    ),
  })

  rows.push({
    key: 'Received at',
    value: (
      <p className="text-neutral-light">
        {formatDate(new Date(transaction.receivedAt))}
      </p>
    ),
  })

  if (transaction.txHash) {
    rows.push({
      key: 'Transaction hash',
      value: txUrl ? (
        <ExternalLink className="text-neutral-light" href={txUrl as string}>
          {truncateMiddle(transaction.txHash)}
          <ArrowTopRight className="w-[13px] ml-[6px]" />
        </ExternalLink>
      ) : (
        <CopyWithTooltip text={transaction.txHash}>
          <span className="text-neutral-light">
            {truncateMiddle(transaction.txHash)}
          </span>
        </CopyWithTooltip>
      ),
    })
  }

  return rows
}

export const TransactionDetails = ({
  transaction,
  showStatus = true,
}: TransactionDetailsProps) => {
  const [isDetailSectionVisible, setDetailSectionVisible] = useState(true)
  const [isLogSectionVisible, setLogSectionVisible] = useState(false)
  const { getBlockUrl, getTxUrl } = useExplorerLinks()

  const blockUrl = getBlockUrl(transaction.blockHeight?.toString())
  const txUrl = getTxUrl(transaction.txHash)

  const sectionList = compileSectionList({
    transaction,
    showStatus,
    blockUrl,
    txUrl,
    isLogSectionVisible,
    isDetailSectionVisible,
    onViewLogs: () => setLogSectionVisible(!isLogSectionVisible),
    onViewDetails: () => setDetailSectionVisible(!isDetailSectionVisible),
  })

  return (
    <div>
      {sectionList.map(({ key, value }, index) => (
        <div key={index} className="pb-[20px]">
          {typeof key === 'string' ? (
            <>
              <Title
                data-testid={`${String(key)
                  .toLowerCase()
                  .replace(' ', '-')}-key`}
                className="m-0 mb-[12px]"
              >
                {key}
              </Title>
              <div
                data-testid={`${String(key)
                  .toLowerCase()
                  .replace(' ', '-')}-value`}
              >
                {value}
              </div>
            </>
          ) : (
            <>
              <Title className="m-0 mb-[12px]">{key}</Title>
              {value}
            </>
          )}
        </div>
      ))}
    </div>
  )
}
