import { useEffect, useCallback } from 'react'
import { once } from 'ramda'

import { Intent } from '../../../config/intent'
import { AppToaster } from '../../toaster'
import type {
  InteractionContentProps,
  RequestSucceeded,
} from '../../../types/interaction'

export const SuccessComponent = ({
  event,
  isResolved,
  setResolved,
}: InteractionContentProps<RequestSucceeded>) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const showMessage = useCallback(
    once((event: RequestSucceeded) => {
      AppToaster.show({
        message: event.data.message,
        intent: Intent.SUCCESS,
      })
    }),
    []
  )

  useEffect(() => {
    if (!isResolved) {
      showMessage(event)
      setResolved(true)
    }
  }, [event, showMessage, isResolved, setResolved])

  return null
}
