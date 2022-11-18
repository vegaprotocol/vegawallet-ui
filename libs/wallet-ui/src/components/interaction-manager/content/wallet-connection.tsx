import { useEffect, useCallback } from 'react'
import { once } from 'ramda'

import { Intent } from '../../../config/intent'
import { useGlobal } from '../../../contexts/global/global-context'
import { AppToaster } from '../../toaster'
import type {
  InteractionContentProps,
  RequestWalletConnection,
} from '../../../types/interaction'
import {
  CONNECTION_RESPONSE,
  INTERACTION_RESPONSE_TYPE,
} from '../../../types/interaction'

export const WalletConnection = ({
  event,
  isResolved,
  setResolved,
}: InteractionContentProps<RequestWalletConnection>) => {
  const { service } = useGlobal()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResponse = useCallback(
    once(async (decision: boolean) => {
      try {
        await service.RespondToInteraction({
          traceID: event.traceID,
          name: INTERACTION_RESPONSE_TYPE.WALLET_CONNECTION_DECISION,
          data: {
            connectionApproval: decision
              ? CONNECTION_RESPONSE.APPROVED_ONCE
              : CONNECTION_RESPONSE.REJECTED_ONCE,
          },
        })
      } catch (err: unknown) {
        AppToaster.show({
          message: `${err}`,
          intent: Intent.DANGER,
        })
      }
    }),
    []
  )

  useEffect(() => {
    if (!isResolved) {
      handleResponse(true)
      setResolved(true)
    }
  }, [isResolved, setResolved, handleResponse])

  return null
}
