import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { Intent } from '../../config/intent'
import { ServiceState, useGlobal } from '../../contexts/global/global-context'
import { Button } from '../button'
import { SplashError } from '../splash-error'
import { AppToaster } from '../toaster'

/**
 * Initialiases the app
 */
export function ServiceLoader({ children }: { children?: ReactNode }) {
  const [serviceError, setServiceError] = useState<string | null>(null)

  const {
    state: { serviceStatus, httpServiceUrl },
    actions,
    service,
    runtime,
    dispatch,
  } = useGlobal()

  useEffect(() => {
    if (serviceStatus === ServiceState.Stopped) {
      dispatch(actions.startServiceAction())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (serviceStatus === ServiceState.Started && serviceError) {
      setServiceError(null)
    }
  }, [serviceStatus, serviceError])

  useEffect(() => {
    service.EventsOn('service_is_healthy', () => {
      setServiceError(null)
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Started,
      })
    })

    service.EventsOn('service_unreachable', () => {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Unreachable,
      })
    })

    service.EventsOn('service_is_unhealthy', () => {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Unhealthy,
      })
    })

    service.EventsOn('service_stopped_with_error', (err: Error) => {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Error,
      })

      AppToaster.show({
        intent: Intent.DANGER,
        message: `${err}`,
      })
    })

    service.EventsOn('service_stopped', () => {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Stopped,
      })
    })

    return () => {
      service.EventsOff(
        'service_is_healthy',
        'service_unreachable',
        'service_is_unhealthy',
        'service_stopped_with_error',
        'service_stopped'
      )
    }
  }, [service, dispatch])

  if (serviceError && httpServiceUrl) {
    // TODO: check this renders okay without chrome
    return (
      <SplashError
        title="Wallet service cannot load"
        message={
          <span>
            Make sure you don't already have an application running on machine
            on port <code className="inline">:1789</code>. Reload the
            application, or change your network port.
          </span>
        }
        actions={<Button onClick={() => runtime.WindowReload()}>Reload</Button>}
      />
    )
  }

  return <>{children}</>
}
