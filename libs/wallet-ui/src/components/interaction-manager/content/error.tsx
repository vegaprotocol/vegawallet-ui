import { useEffect } from 'react'

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
  useEffect(() => {
    if (!isResolved) {
      AppToaster.show({
        message: event.data.error,
        intent: Intent.WARNING,
      })
      setResolved(true)
    }
  }, [event, isResolved, setResolved])

  return null
}
