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

export type TransactionReviewData = {
  traceID: string
  workflow: 'TRANSACTION_REVIEW'
  transaction?: Transaction
  error?: string
}

export type TransactionReviewProps = {
  data: TransactionReviewData
  onUpdate: (q: TransactionReviewData) => void
  onClose: () => void
}

export const TransactionReview = ({
  data,
  onClose,
}: TransactionReviewProps) => {
  const [isLoading, setLoading] = useState<'approve' | 'reject' | false>(false)
  const { service } = useGlobal()

  const handleDecision = async (decision: boolean) => {
    setLoading(decision ? 'approve' : 'reject')
    await service.RespondToInteraction({
      traceID: data.traceID,
      name: 'DECISION',
      data: {
        approved: decision,
      },
    })
  }

  if (!data.transaction) {
    return null
  }

  return (
    <div>
      <Title>
        {data.transaction ? TRANSACTION_TITLES[data.transaction.type] : ''}
      </Title>
      <TransactionDetails transaction={data.transaction} />
      {data.transaction.status === TransactionStatus.PENDING && (
        <ButtonGroup>
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
        <ButtonGroup>
          <Button onClick={() => onClose()}>Close</Button>
        </ButtonGroup>
      )}
    </div>
  )
}
