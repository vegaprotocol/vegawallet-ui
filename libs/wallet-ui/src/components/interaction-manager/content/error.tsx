import { useEffect, useCallback } from 'react'
import { once } from 'ramda'

import { Intent } from '../../../config/intent'
import { AppToaster } from '../../toaster'
import type {
  ErrorOccurred,
  InteractionContentProps,
} from '../../../types/interaction'

export const ErrorComponent = ({
  event,
  isResolved,
  setResolved,
}: InteractionContentProps<ErrorOccurred>) => {
  const showMessage = useCallback(
    once((event: ErrorOccurred) => {
      AppToaster.show({
        message: event.data.error,
        intent: Intent.WARNING,
      })
    }),
    []
  )

  useEffect(() => {
    if (!isResolved) {
      showMessage(event)
      setResolved(true)
    }
  }, [event, isResolved, setResolved])

  return null
}
