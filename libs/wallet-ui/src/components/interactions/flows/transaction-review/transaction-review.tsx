import { useState, useRef, useEffect } from 'react'

import type { Transaction } from '../../../../lib/transactions'
import { TransactionDetails } from '../../../transaction-details'
import { Title } from '../../../title'
import { Button } from '../../../button'
import { ButtonGroup } from '../../../button-group'
import { useGlobal } from '../../../../contexts/global/global-context'
import {
  TransactionStatus,
  TRANSACTION_TITLES,
} from '@vegaprotocol/wallet-types'
import { TransactionStatus as TransactionStatusDisplay } from '../../../transaction-status'
import { Loader } from '../../../loader'
import { TransactionLogs } from '../../../transaction-logs'
import { Tick } from '../../../icons/tick'
import { Warning } from '../../../icons/warning'
import type { InteractionErrorType } from '../../views/error'
import { InteractionError } from '../../views/error'
import { useExplorerLinks } from '../../../../hooks/use-explorer-url'
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
        <div className="flex border border-neutral rounded p-[16px] mb-5">
          <Loader size="small" />
          <p className="ml-[10px]">Processing your transaction</p>
        </div>
      )
    }
    case TransactionStatus.FAILURE: {
      return (
        <div className="flex border border-neutral rounded p-[16px] mb-5">
          <Warning className="w-[12px] text-danger-light" />
          <p className="ml-[10px]">The transaction failed</p>
        </div>
      )
    }
    case TransactionStatus.SUCCESS: {
      return (
        <div className="flex border border-neutral rounded p-[16px] mb-5">
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
  const logsRef = useRef<HTMLDivElement>(null)
  const { getTxUrl } = useExplorerLinks()
  const [isLoading, setLoading] = useState<'approve' | 'reject' | false>(false)
  const { service, dispatch } = useGlobal()
  const isProcessing = data.transaction && data.transaction.logs.length > 0

  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTo({ top: logsRef.current.scrollHeight })
    }
  }, [data.transaction?.logs.length])

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
      if (data.transaction && !decision) {
        // eagerly mark the current tx as rejected
        dispatch({
          type: 'UPDATE_TRANSACTION',
          transaction: {
            id: data.transaction?.id,
            status: TransactionStatus.REJECTED,
          },
        })
      }
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
    } else {
      setLoading(false)
    }
  }

  if (!data.transaction) {
    return null
  }

  if (data.error) {
    return (
      <InteractionError
        title="Failed to send transaction"
        type={data.error.type}
        message={data.error.error}
        onClose={() => {
          if (data.transaction) {
            // this usually happens when there's a traceID mismatch
            // eagerly mark the current tx as failure
            dispatch({
              type: 'UPDATE_TRANSACTION',
              transaction: {
                id: data.transaction?.id,
                status: TransactionStatus.FAILURE,
                error: data.error?.error,
              },
            })
          }
          onClose()
        }}
      />
    )
  }

  const txUrl = getTxUrl(data.transaction.txHash)

  return (
    <div className="p-5">
      <div className="text-center mt-[32px] mb-[32px]">
        <TransactionStatusDisplay transaction={data.transaction} />
        <Title data-testid="transaction-type" className="mb-[5px] mt-5">
          {data.transaction ? TRANSACTION_TITLES[data.transaction.type] : ''}
        </Title>
        <p data-testid="transaction-hostname" className="text-neutral-light">
          {data.transaction.hostname}
        </p>
      </div>
      {isProcessing && (
        <div className="mb-5">
          <InfoBox transaction={data.transaction} />
          <TransactionLogs ref={logsRef} logs={data.transaction.logs} />
          {data.transaction.txHash && (
            <Title data-testid="transaction-header">Transaction ID</Title>
          )}
          <div className="flex gap-5 justify-between mt-5">
            {data.transaction.txHash && (
              <CopyWithTooltip text={data.transaction.txHash}>
                <span
                  data-testid="transaction-id"
                  className="text-neutral-light"
                >
                  {truncateMiddle(data.transaction.txHash)}
                </span>
              </CopyWithTooltip>
            )}
            {txUrl && (
              <ExternalLink href={txUrl as string}>
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
      {!isProcessing && data.transaction.status === TransactionStatus.PENDING && (
        <ButtonGroup inline>
          <Button
            data-testid="transaction-reject-button"
            loading={isLoading === 'reject'}
            disabled={!!isLoading && !!isProcessing}
            onClick={() => handleDecision(false)}
          >
            Reject
          </Button>
          <Button
            data-testid="transaction-approve-button"
            loading={isLoading === 'approve'}
            disabled={!!isLoading && !!isProcessing}
            onClick={() => handleDecision(true)}
          >
            Approve
          </Button>
        </ButtonGroup>
      )}
      {data.transaction.status !== TransactionStatus.PENDING && (
        <ButtonGroup inline>
          <Button data-testid="transaction-close" onClick={() => onClose()}>
            Close
          </Button>
        </ButtonGroup>
      )}
    </div>
  )
}
