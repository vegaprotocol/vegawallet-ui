import { useEffect, useCallback } from 'react'
import { once } from 'ramda'

import { Intent } from '../../../config/intent'
import { AppToaster } from '../../toaster'
import type {
  InteractionContentProps,
  Log,
  LogContent,
} from '../../../types/interaction'

const getMessageIntent = (type: LogContent['type']) => {
  switch (type) {
    case 'Error': {
      return Intent.DANGER
    }
    case 'Warning': {
      return Intent.WARNING
    }
    case 'Success': {
      return Intent.SUCCESS
    }
    default: {
      return Intent.NONE
    }
  }
}

export const LogComponent = ({
  event,
  isResolved,
  setResolved,
}: InteractionContentProps<Log>) => {
  const showMessage = useCallback(
    once((event: Log) => {
      AppToaster.show({
        message: event.data.message,
        intent: getMessageIntent(event.data.type),
      })
    }),
    []
  )

  useEffect(() => {
    if (!isResolved) {
      showMessage(event)
      setResolved(true)
    }
  }, [isResolved, setResolved, showMessage])

  return null
}
