import { useCallback, useEffect, useMemo, useState } from 'react'

import { useGlobal } from '../../../contexts/global/global-context'
import {
  parseTransactionInput,
  TransactionStatus,
  TRANSACTION_TITLES,
  TRANSACTION_DESCRIPTIONS,
} from '../../../lib/transactions'
import { Button } from '../../button'
import { ButtonGroup } from '../../button-group'
import { Dialog } from '../../dialog'
import { TransactionDetails } from '../../transaction-details'
import type {
  InteractionContentProps,
  RequestTransactionReview,
} from '../../../types/interaction'

export const Transaction = ({
  event,
}: InteractionContentProps<RequestTransactionReview>) => {
  const [status, setStatus] = useState<null | 'approving' | 'rejecting'>(null)
  const { service, dispatch } = useGlobal()
  const transaction = useMemo(() => parseTransactionInput(event), [event])
  const title = TRANSACTION_TITLES[transaction.type]
  const description = TRANSACTION_DESCRIPTIONS[transaction.type]

  useEffect(() => {
    dispatch({
      type: 'ADD_TRANSACTION',
      transaction,
    })
  }, [dispatch, transaction])

  const onReponse = useCallback(
    async (decision: boolean) => {
      setStatus(decision ? 'approving' : 'rejecting')

      await service.RespondToInteraction({
        traceID: event.traceID,
        name: 'DECISION',
        data: {
          approved: decision,
        },
      })

      if (!decision) {
        dispatch({
          type: 'UPDATE_TRANSACTION',
          transaction: {
            ...transaction,
            status: TransactionStatus.REJECTED,
          },
        })
      } else {
        dispatch({
          type: 'SHOW_TRANSACTION_DETAILS',
          id: event.traceID,
        })
      }
    },
    [service, dispatch, event, transaction]
  )

  return (
    <Dialog open={true} size="lg" title={title}>
      <div className="px-[20px] pb-[20px]">
        <p>
          <code>{transaction.hostname}</code> requested to use your key to{' '}
          {description} from <code>{transaction.wallet}</code>.
        </p>
      </div>
      <TransactionDetails transaction={transaction} />
      <div className="p-[20px]">
        <ButtonGroup>
          <Button
            data-testid="transaction-request-approve"
            onClick={() => onReponse(true)}
            disabled={status === 'rejecting'}
            loading={status === 'approving'}
          >
            Approve
          </Button>
          <Button
            data-testid="transaction-request-reject"
            onClick={() => onReponse(false)}
            disabled={status === 'approving'}
            loading={status === 'rejecting'}
          >
            Reject
          </Button>
        </ButtonGroup>
      </div>
    </Dialog>
  )
}
