import { useState } from 'react'

import type { Transaction } from '../../../../lib/transactions'
import { TransactionDetails } from '../../../transaction-details'
import { Title } from '../../../title'
import { Button } from '../../../button'
import { ButtonGroup } from '../../../button-group'
import { useGlobal } from '../../../../contexts/global/global-context'
import {
  TransactionStatus,
  TRANSACTION_TITLES,
} from '../../../../lib/transactions'
import { TransactionStatus as TransactionStatusDisplay } from '../../../transaction-status'
import { Loader } from '../../../loader'
import { TransactionLogs } from '../../../transaction-logs'
import { Tick } from '../../../icons/tick'
import { Warning } from '../../../icons/warning'
import type { InteractionErrorType } from '../../views/error'
import { useExplorerUrl } from '../../../../hooks/use-explorer-url'
import { CopyWithTooltip } from '../../../copy-with-tooltip'
import { ExternalLink } from '../../../external-link'
import { ArrowTopRight } from '../../../icons/arrow-top-right'
import { truncateMiddle } from '../../../../lib/truncate-middle'

export type TransactionReviewData = {
  traceID: string
  workflow: 'TRANSACTION_REVIEW'
  transaction?: Transaction
  error?: InteractionErrorType
}

export type TransactionReviewProps = {
  data: TransactionReviewData
  onUpdate: (q: TransactionReviewData) => void
  onClose: () => void
}

const InfoBox = ({ transaction }: { transaction: Transaction }) => {
  switch (transaction.status) {
    case TransactionStatus.PENDING: {
      return (
        <div className="flex border border-neutral rounded p-[16px] mb-[20px]">
          <Loader size="small" />
          <p className="ml-[10px]">Processing your transaction</p>
        </div>
      )
    }
    case TransactionStatus.FAILURE: {
      return (
        <div className="flex border border-neutral rounded p-[16px] mb-[20px]">
          <Warning className="w-[12px] text-danger-light" />
          <p className="ml-[10px]">The transaction failed</p>
        </div>
      )
    }
    case TransactionStatus.SUCCESS: {
      return (
        <div className="flex border border-neutral rounded p-[16px] mb-[20px]">
          <Tick className="w-[12px] text-success-light" />
          <p className="ml-[10px]">
            The transaction has been sent to the network
          </p>
        </div>
      )
    }
    default:
      return null
  }
}

export const TransactionReview = ({
  data,
  onClose,
  onUpdate,
}: TransactionReviewProps) => {
  const explorerUrl = useExplorerUrl()
  const [isLoading, setLoading] = useState<'approve' | 'reject' | false>(false)
  const { service } = useGlobal()
  const isProcessing = data.transaction && data.transaction.logs.length > 0

  const handleDecision = async (decision: boolean) => {
    setLoading(decision ? 'approve' : 'reject')
    try {
      await service.RespondToInteraction({
        traceID: data.traceID,
        name: 'DECISION',
        data: {
          approved: decision,
        },
      })
    } catch (err) {
      onUpdate({
        ...data,
        error: {
          type: 'Backend error',
          error: `${err}`,
        },
      })
    }

    if (!decision) {
      onClose()
    }
  }

  if (!data.transaction) {
    return null
  }

  return (
    <div className="p-[20px]">
      <div className="text-center mt-[32px] mb-[32px]">
        <TransactionStatusDisplay transaction={data.transaction} />
        <Title className="mb-[5px] mt-[20px]">
          {data.transaction ? TRANSACTION_TITLES[data.transaction.type] : ''}
        </Title>
        <p className="text-neutral-light">{data.transaction.hostname}</p>
      </div>
      {isProcessing && (
        <div className="mb-[20px]">
          <InfoBox transaction={data.transaction} />
          <TransactionLogs
            isVisible={true}
            className="min-h-[150px]"
            logs={data.transaction.logs}
          />
          {data.transaction.txHash && <Title>Transaction ID</Title>}
          <div className="flex gap-[20px] justify-between mt-[20px]">
            {data.transaction.txHash && (
              <CopyWithTooltip text={data.transaction.txHash}>
                <span className="text-neutral-light">
                  {truncateMiddle(data.transaction.txHash)}
                </span>
              </CopyWithTooltip>
            )}
            {data.transaction.txHash && explorerUrl && (
              <ExternalLink
                href={`${explorerUrl}/txs/${data.transaction.txHash}`}
              >
                View in block explorer
                <ArrowTopRight className="w-[13px] ml-[6px]" />
              </ExternalLink>
            )}
          </div>
        </div>
      )}
      {!isProcessing && (
        <TransactionDetails transaction={data.transaction} showStatus={false} />
      )}
      {data.transaction.status === TransactionStatus.PENDING && (
        <ButtonGroup inline>
          <Button
            loading={isLoading === 'approve'}
            disabled={!!isLoading}
            onClick={() => handleDecision(true)}
          >
            Approve
          </Button>
          <Button
            loading={isLoading === 'reject'}
            disabled={!!isLoading}
            onClick={() => handleDecision(false)}
          >
            Reject
          </Button>
        </ButtonGroup>
      )}
      {data.transaction.status !== TransactionStatus.PENDING && (
        <ButtonGroup inline>
          <Button onClick={() => onClose()}>Close</Button>
        </ButtonGroup>
      )}
    </div>
  )
}
