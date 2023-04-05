import { useCallback } from 'react'
import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import { ServiceState, useGlobal } from '../contexts/global/global-context'
import { useStartService } from './use-start-service'

export const useRestartService = () => {
  const {
    service,
    dispatch,
    state: { currentNetwork },
  } = useGlobal()
  const startService = useStartService()
  return useCallback(async () => {
    if (currentNetwork) {
      try {
        await service.StopService()
      } catch (err) {
        dispatch({
          type: 'SET_SERVICE_STATUS',
          status: ServiceState.Error,
        })
        AppToaster.show({
          intent: Intent.DANGER,
          message: `${err}`,
        })
      }

      await startService()
    }
  }, [startService, dispatch, service, currentNetwork])
}
