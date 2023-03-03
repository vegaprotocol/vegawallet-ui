import classnames from 'classnames'
import { useState, useEffect } from 'react'
import { EventEmitter } from 'eventemitter3'
import { animated, config, useTransition } from 'react-spring'

import type { GlobalDispatch } from '../../contexts/global/global-context'
import { useGlobal } from '../../contexts/global/global-context'
import type { RawInteraction } from '../../types'
import type { InteractionDisplayProps } from './display'
import { InteractionDisplay } from './display'
import { Splash } from '../splash'
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
}: {
  queue: Queue
  event: RawInteraction
  dispatch: GlobalDispatch
}): Queue => {
  console.log(queue, event)
  const q = new Map(queue)
  const queueItem = q.get(event.traceID)

  switch (event.name) {
    case 'INTERACTION_SESSION_BEGAN': {
      dispatch({ type: 'START_INTERACTION' })
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
          error: event.data,
        })
      }
      break
    }
    case 'LOG': {
      if (
        queueItem?.workflow === 'TRANSACTION_REVIEW' &&
        queueItem.transaction
      ) {
        const t = queueItem.transaction
        q.set(event.traceID, {
          ...queueItem,
          transaction: {
            ...t,
            logs: [...t.logs, event.data],
          },
        })
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
      if (
        queueItem?.workflow === 'WALLET_CONNECTION' ||
        queueItem?.workflow === 'PERMISSION_REQUEST'
      ) {
        q.set(event.traceID, {
          ...queueItem,
          view: 'success',
        })
      } else {
        AppToaster.show({
          intent: Intent.SUCCESS,
          message: event.data.message,
        })
      }
      break
    }
    // Wallet connection
    case 'REQUEST_WALLET_CONNECTION_REVIEW': {
      if (queueItem) {
        q.set(event.traceID, {
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
      if (
        queueItem?.workflow === 'TRANSACTION_REVIEW' &&
        queueItem.transaction
      ) {
        const transaction = parseTransactionInput(event, queueItem.transaction)

        q.set(event.traceID, {
          traceID: event.traceID,
          workflow: 'TRANSACTION_REVIEW',
          transaction,
        })
        dispatch({
          type: 'UPDATE_TRANSACTION',
          transaction,
        })
      }

      break
    }
    case 'TRANSACTION_SUCCEEDED': {
      if (
        queueItem?.workflow === 'TRANSACTION_REVIEW' &&
        queueItem.transaction
      ) {
        const transaction = parseTransactionInput(event, queueItem.transaction)
        q.set(event.traceID, {
          traceID: event.traceID,
          workflow: 'TRANSACTION_REVIEW',
          transaction,
        })
        dispatch({
          type: 'UPDATE_TRANSACTION',
          transaction,
        })
      }

      break
    }
  }

  return q
}

const getSplashClasses = (item?: QueueItem) => {
  if (item && 'view' in item && item?.view === 'success') {
    return {
      background: 'bg-success',
      color: 'text-black',
    }
  }
  return {
    background: 'bg-black',
    color: 'text-white',
  }
}

export const InteractionsProvider = () => {
  const { service, dispatch } = useGlobal()
  const [queue, setQueue] = useState<Queue>(new Map())
  const currentFlowItem = queue.entries().next().value

  const { background, color } = getSplashClasses(currentFlowItem?.[1])

  const transitions = useTransition(!!currentFlowItem, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { ...config.default, duration: 300 },
  })

  useEffect(() => {
    service.EventsOn('new_interaction', (event: RawInteraction) => {
      if (event.name === 'INTERACTION_SESSION_BEGAN') {
        interactionBus.addListener(event.traceID, (event: RawInteraction) => {
          setQueue((queue) => handleEvent({ queue, event, dispatch }))
        })
      }

      interactionBus.emit(event.traceID, event)

      if (event.name === 'INTERACTION_SESSION_ENDED') {
        interactionBus.removeListener(event.traceID)
      }
    })

    return () => service.EventsOff('new_interaction')
  }, [service, dispatch, setQueue])

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          className={classnames(
            'fixed top-0 bottom-0 left-0 right-0 bg-black overflow-y-auto',
            'transition duration-300 ease-in-out',
            background,
            color
          )}
          style={{
            opacity: styles.opacity,
          }}
        >
          <Splash>
            {currentFlowItem && (
              <InteractionDisplay
                data={currentFlowItem[1]}
                onUpdate={(data: InteractionDisplayProps['data']) =>
                  setQueue((queue) => {
                    const q = new Map(queue)
                    q.set(currentFlowItem[0], data)
                    return q
                  })
                }
                onClose={() =>
                  setQueue((queue) => {
                    const q = new Map(queue)
                    q.delete(currentFlowItem[0])
                    if (q.size === 0) {
                      dispatch({ type: 'END_INTERACTION' })
                    }
                    return q
                  })
                }
              />
            )}
          </Splash>
        </animated.div>
      )
  )
}
