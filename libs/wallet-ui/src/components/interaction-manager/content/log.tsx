import { useEffect, useCallback } from 'react'
import { once } from 'ramda'

import { AppToaster } from '../../toaster'
import type { InteractionContentProps, Log } from '../../../types/interaction'
import { useGlobal } from '../../../contexts/global/global-context'
import { getMessageIntent } from '../../../lib/transactions'

export const LogComponent = ({
  flow,
  event,
  isResolved,
  setResolved,
}: InteractionContentProps<Log>) => {
  const { dispatch } = useGlobal()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMessage = useCallback(
    once((event: Log) => {
      if (flow !== 'TRANSACTION_REVIEW') {
        AppToaster.show({
          message: event.data.message,
          intent: getMessageIntent(event.data.type),
        })
      } else {
        dispatch({
          type: 'ADD_TRANSACTION_LOG',
          id: event.traceID,
          log: event.data,
        })
      }
    }),
    [flow, dispatch]
  )

  useEffect(() => {
    if (!isResolved) {
      handleMessage(event)
      setResolved(true)
    }
  }, [event, isResolved, setResolved, handleMessage])

  return null
}
