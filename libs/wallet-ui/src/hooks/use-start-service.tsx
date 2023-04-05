import { useCallback } from 'react'
import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import { ServiceState, useGlobal } from '../contexts/global/global-context'

export const useStartService = () => {
  const {
    service,
    dispatch,
    state: { currentNetwork },
  } = useGlobal()
  return useCallback(async () => {
    if (currentNetwork) {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Loading,
      })
      try {
        await service.StartService({ network: currentNetwork })
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
    }
  }, [dispatch, service, currentNetwork])
}
