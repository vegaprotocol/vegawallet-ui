import { useState, useEffect } from 'react'
import { EventEmitter } from 'eventemitter3'
import type { GlobalDispatch} from '../../contexts/global/global-context';
import { useGlobal } from '../../contexts/global/global-context'
import type { RawInteraction } from '../../types'
import { InteractionDisplay } from './display'
import { Dialog } from '../dialog'
import { Intent } from '../../config/intent'
import { AppToaster } from '../toaster'
import type {
  WalletConnectionProps,
  TransactionReviewProps,
  PermissionRequestProps,
} from './flows'

export type QueueItem =
  | WalletConnectionProps
  | TransactionReviewProps
  | PermissionRequestProps

type Queue = Map<string, QueueItem>

// Proxy incoming interacion events and group them by traceID
const interactionBus = new EventEmitter<string, RawInteraction>()

const handleEvent = (
  queue: Queue,
  event: RawInteraction,
  dispatch: GlobalDispatch
): Queue => {
  const q = new Map(queue)

  switch (event.name) {
    case 'INTERACTION_SESSION_BEGAN': {
      q.set(event.traceID, {
        traceID: event.traceID,
        workflow: event.data.workflow,
      })
      return q
    }
    case 'INTERACTION_SESSION_ENDED': {
      q.delete(event.traceID)
      return q
    }
    case 'ERROR_OCCURRED': {
      AppToaster.show({
        intent: Intent.DANGER,
        message: event.data.error,
      })
      break
    }
    case 'REQUEST_SUCCEEDED': {
      AppToaster.show({
        intent: Intent.SUCCESS,
        message: event.data.message,
      })
      break
    }

    case 'TRANSACTION_FAILED': {
      AppToaster.show({
        intent: Intent.DANGER,
        message: event.data.error.Message,
      })
      break
    }
    case 'TRANSACTION_SUCCEEDED': {
      AppToaster.show({
        intent: Intent.SUCCESS,
        message: 'yaay',
      })
      break
    }
  }

  return q
}

export const InteractionsProvider = () => {
  const { service, dispatch } = useGlobal()
  const [queue, setQueue] = useState<Queue>(new Map())
  const currentFlowItem = queue.entries().next().value

  useEffect(() => {
    service.EventsOn('new_interaction', (event: RawInteraction) => {
      if (event.name === 'INTERACTION_SESSION_BEGAN') {
        interactionBus.addListener(event.traceID, (event: RawInteraction) => {
          setQueue((queue) => handleEvent(queue, event, dispatch))
        })
      }

      interactionBus.emit(event.traceID, event)

      if (event.name === 'INTERACTION_SESSION_ENDED') {
        interactionBus.removeListener(event.traceID)
      }
    })

    return () => service.EventsOff(['new_interaction'])
  }, [service, dispatch, setQueue])

  return (
    <Dialog size="lg" open={!!currentFlowItem}>
      {currentFlowItem && <InteractionDisplay {...currentFlowItem} />}
    </Dialog>
  )
}
