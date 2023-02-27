import { useEffect, useMemo } from 'react'
import { omit } from 'ramda'

import { useGlobal } from '../../../contexts/global/global-context'
import type { Transaction } from '../../../lib/transactions'
import {
  TransactionStatus,
  TRANSACTION_TITLES,
} from '../../../lib/transactions'
import type {
  Interaction,
  InteractionContentProps,
  RequestTransactionFailure,
  RequestTransactionReview,
  RequestTransactionSuccess,
} from '../../../types/interaction'
import { Intent } from '../../../config/intent'
import { AppToaster } from '../../toaster'

type TransactionEndProps =
  | InteractionContentProps<RequestTransactionSuccess>
  | InteractionContentProps<RequestTransactionFailure>

type TransactionEvent = RequestTransactionSuccess | RequestTransactionFailure

type InputData = {
  blockHeight: string
}

const parseInputData = (inputData: string) => {
  try {
    const { blockHeight } = JSON.parse(inputData) as InputData
    return { blockHeight: parseInt(blockHeight, 10) }
  } catch (err) {
    return {}
  }
}

type Tx = {
  signature: {
    value: string
  }
}

const parseTx = (tx: string) => {
  try {
    const { signature } = JSON.parse(tx) as Tx
    return { signature: signature.value }
  } catch (err) {
    return {}
  }
}

const parseEvent = (event: TransactionEvent) => {
  const isSuccess = event.name === 'TRANSACTION_SUCCEEDED'
  const txData = parseTx(event.data.tx)
  const inputData = parseInputData(event.data.deserializedInputData)

  return {
    ...txData,
    ...inputData,
    status: isSuccess ? TransactionStatus.SUCCESS : TransactionStatus.FAILURE,
    txHash: event.name === 'TRANSACTION_SUCCEEDED' ? event.data.txHash : null,
    error:
      event.name === 'TRANSACTION_FAILED'
        ? event.data.error.Message
        : undefined,
  }
}

const getToastContent = (
  event: RequestTransactionSuccess | RequestTransactionFailure,
  transaction: Transaction
) => {
  switch (event.name) {
    case 'TRANSACTION_SUCCEEDED': {
      return {
        message: `${TRANSACTION_TITLES[transaction.type]} successfully sent.`,
        intent: Intent.SUCCESS,
      }
    }
    case 'TRANSACTION_FAILED': {
      return {
        message: event.data.error.Message,
        intent: Intent.DANGER,
      }
    }
  }
}

export const TransactionEnd = ({
  event,
  history,
  isResolved,
  setResolved,
}: TransactionEndProps) => {
  const { dispatch, state } = useGlobal()
  const source = useMemo(
    () =>
      history.find(
        ({ event }) => event.name === 'REQUEST_TRANSACTION_REVIEW_FOR_SENDING'
      ) as Interaction<RequestTransactionReview> | null,
    [history]
  )

  useEffect(() => {
    const transaction = state.transactions[event.traceID]

    if (!isResolved && transaction) {
      dispatch({
        type: 'UPDATE_TRANSACTION',
        transaction: {
          ...transaction,
          ...omit(['logs'], parseEvent(event)),
        },
      })

      AppToaster.show(getToastContent(event, transaction))

      setResolved(true)
    }
  }, [source, state, dispatch, event, isResolved, setResolved])

  return null
}
