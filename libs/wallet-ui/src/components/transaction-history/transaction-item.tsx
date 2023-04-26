import { useExplorerLinks } from '../../hooks/use-explorer-url'
import { formatDate } from '../../lib/date'
import type { Transaction } from '../../lib/transactions'
import { truncateMiddle } from '../../lib/truncate-middle'
import { TRANSACTION_TITLES } from '@vegaprotocol/wallet-types'
import { ButtonUnstyled } from '../button-unstyled'
import { ExternalLink } from '../external-link'
import { ArrowTopRight } from '../icons/arrow-top-right'
import { TransactionStatus } from '../transaction-status'

type TransactionItemProps = {
  transaction: Transaction
  viewDetails: () => void
}

const TransactionId = ({
  transaction,
}: Pick<TransactionItemProps, 'transaction'>) => {
  const { getTxUrl } = useExplorerLinks()

  if (!transaction.txHash) {
    return <span className="invisible">No id</span>
  }

  const txUrl = getTxUrl(transaction.txHash)

  return txUrl ? (
    <ExternalLink href={txUrl as string}>
      {truncateMiddle(transaction.txHash)}
      <ArrowTopRight className="w-[13px] ml-[6px]" />
    </ExternalLink>
  ) : (
    <span>{truncateMiddle(transaction.txHash)}</span>
  )
}

export const TransactionItem = ({
  transaction,
  viewDetails,
}: TransactionItemProps) => {
  return (
    <div className="border-b border-black py-[20px]">
      <div className="flex items-center justify-between">
        <ButtonUnstyled onClick={viewDetails}>
          <TransactionStatus transaction={transaction} />
          {TRANSACTION_TITLES[transaction.type]}
        </ButtonUnstyled>
        <div>
          <TransactionId transaction={transaction} />
          <div className="text-right text-deemphasise text-sm">
            {formatDate(transaction.receivedAt)}
          </div>
        </div>
      </div>
    </div>
  )
}
