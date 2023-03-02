import { useState, useEffect } from 'react'
import { EventEmitter } from 'eventemitter3'
import type {
  GlobalDispatch,
  GlobalState,
} from '../../contexts/global/global-context'
import { useGlobal } from '../../contexts/global/global-context'
import type { RawInteraction } from '../../types'
import type { InteractionDisplayProps } from './display';
import { InteractionDisplay } from './display'
import { Dialog } from '../dialog'
import { Intent } from '../../config/intent'
import { AppToaster } from '../toaster'
import type {
  WalletConnectionData,
  TransactionReviewData,
  PermissionRequestData,
} from './flows'
import { parseTransactionInput } from '../../lib/transactions'

export type QueueItem =
  | WalletConnectionData
  | TransactionReviewData
  | PermissionRequestData

type Queue = Map<string, QueueItem>

// Proxy incoming interacion events and group them by traceID
const interactionBus = new EventEmitter<string, RawInteraction>()

const handleEvent = ({
  queue,
  event,
  dispatch,
  state,
}: {
  queue: Queue
  event: RawInteraction
  dispatch: GlobalDispatch
  state: GlobalState
}): Queue => {
  const q = new Map(queue)
  const queueItem = q.get(event.traceID)

  switch (event.name) {
    case 'INTERACTION_SESSION_BEGAN': {
      q.set(event.traceID, {
        traceID: event.traceID,
        workflow: event.data.workflow,
      })
      break
    }
    case 'INTERACTION_SESSION_ENDED': {
      break
    }
    case 'ERROR_OCCURRED': {
      if (queueItem) {
        q.set(event.traceID, {
          ...queueItem,
          error: event.data.error,
        })
      }
      break
    }
    case 'LOG': {
      if (queueItem?.workflow === 'TRANSACTION_REVIEW') {
        dispatch({
          type: 'ADD_TRANSACTION_LOG',
          id: event.traceID,
          log: event.data,
        })
      } else {
        // ???
      }
      break
    }
    case 'REQUEST_PASSPHRASE': {
      if (queueItem?.workflow === 'WALLET_CONNECTION') {
        q.set(event.traceID, {
          ...queueItem,
          view: 'passphrase',
        })
      }
      break
    }
    case 'REQUEST_SUCCEEDED': {
      if (queueItem?.workflow === 'WALLET_CONNECTION') {
        q.set(event.traceID, {
          ...queueItem,
          view: 'success',
        })
      }
      AppToaster.show({
        intent: Intent.SUCCESS,
        message: event.data.message,
      })
      break
    }
    // Wallet connection
    case 'REQUEST_WALLET_CONNECTION_REVIEW': {
      if (queueItem) {
        q.set(event.traceID, {
          ...queueItem,
          traceID: event.traceID,
          workflow: 'WALLET_CONNECTION',
          view: 'connection',
          hostname: event.data.hostname,
          availableWallets: [],
        })
      }
      break
    }
    case 'REQUEST_WALLET_SELECTION': {
      if (queueItem) {
        q.set(event.traceID, {
          ...queueItem,
          traceID: event.traceID,
          workflow: 'WALLET_CONNECTION',
          view: 'selection',
          availableWallets: event.data.availableWallets,
        })
      }
      break
    }
    // Permissions
    case 'REQUEST_PERMISSIONS_REVIEW': {
      q.set(event.traceID, {
        traceID: event.traceID,
        workflow: 'PERMISSION_REQUEST',
        hostname: event.data.hostname,
        permissions: event.data.permissions,
        wallet: event.data.wallet,
      })
      break
    }
    // Transactions
    case 'REQUEST_TRANSACTION_REVIEW_FOR_SENDING': {
      const transaction = parseTransactionInput(event)

      q.set(event.traceID, {
        traceID: event.traceID,
        workflow: 'TRANSACTION_REVIEW',
        transaction,
      })
      dispatch({
        type: 'ADD_TRANSACTION',
        transaction,
      })

      break
    }
    case 'TRANSACTION_FAILED': {
      const t = state.transactions[event.traceID]
      const transaction = parseTransactionInput(event, t)

      q.set(event.traceID, {
        traceID: event.traceID,
        workflow: 'TRANSACTION_REVIEW',
        transaction,
      })
      dispatch({
        type: 'UPDATE_TRANSACTION',
        transaction,
      })

      break
    }
    case 'TRANSACTION_SUCCEEDED': {
      const t = state.transactions[event.traceID]
      const transaction = parseTransactionInput(event, t)
      q.set(event.traceID, {
        traceID: event.traceID,
        workflow: 'TRANSACTION_REVIEW',
        transaction,
      })
      dispatch({
        type: 'UPDATE_TRANSACTION',
        transaction,
      })

      break
    }
  }

  return q
}

export const InteractionsProvider = () => {
  const { service, state, dispatch } = useGlobal()
  const [queue, setQueue] = useState<Queue>(new Map())
  const currentFlowItem = queue.entries().next().value

  useEffect(() => {
    service.EventsOn('new_interaction', (event: RawInteraction) => {
      if (event.name === 'INTERACTION_SESSION_BEGAN') {
        interactionBus.addListener(event.traceID, (event: RawInteraction) => {
          setQueue((queue) => handleEvent({ queue, event, dispatch, state }))
        })
      }

      interactionBus.emit(event.traceID, event)

      if (event.name === 'INTERACTION_SESSION_ENDED') {
        interactionBus.removeListener(event.traceID)
      }
    })

    return () => service.EventsOff('new_interaction')
  }, [service, state, dispatch, setQueue])

  return (
    <Dialog size="full" open={!!currentFlowItem}>
      {currentFlowItem && (
        <InteractionDisplay
          data={currentFlowItem}
          onUpdate={(data: InteractionDisplayProps['data']) =>
            setQueue((queue) => {
              const q = new Map(queue)
              q.set(currentFlowItem.traceID, data)
              return q
            })
          }
          onClose={() =>
            setQueue((queue) => {
              const q = new Map(queue)
              q.delete(currentFlowItem.traceID)
              return q
            })
          }
        />
      )}
    </Dialog>
  )
}
