import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { Intent } from '../../config/intent'
import {
  DrawerPanel,
  ServiceState,
  useGlobal,
} from '../../contexts/global/global-context'
import { EVENTS } from '../../lib/events'
import { Button } from '../button'
import { Chrome } from '../chrome'
import { SplashError } from '../splash-error'
import { AppToaster } from '../toaster'

/**
 * Initialiases the app
 */
export function ServiceLoader({ children }: { children?: ReactNode }) {
  const [serviceError, setServiceError] = useState<string | null>(null)

  const {
    state: { serviceStatus, currentNetwork, httpServiceUrl },
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
    service.EventsOn(EVENTS.SERVICE_HEALTHY, () => {
      console.log('service.EventsOn(EVENTS.SERVICE_HEALTHY')
      setServiceError(null)
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Started,
      })
    })

    service.EventsOn(EVENTS.SERVICE_UNREACHABLE, () => {
      console.log('service.EventsOn(EVENTS.SERVICE_UNREACHABLE')
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Unreachable,
      })
    })

    service.EventsOn(EVENTS.SERVICE_UNHEALTHY, () => {
      console.log('service.EventsOn(EVENTS.SERVICE_UNHEALTHY')
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Unhealthy,
      })
    })

    service.EventsOn(EVENTS.SERVICE_STOPPED_WITH_ERROR, (err: Error) => {
      console.log('service.EventsOn(EVENTS.SERVICE_STOPPED_WITH_ERROR', err)
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Error,
      })

      AppToaster.show({
        intent: Intent.DANGER,
        message: `${err}`,
      })
    })

    service.EventsOn(EVENTS.SERVICE_STOPPED, () => {
      console.log('service.EventsOn(EVENTS.SERVICE_STOPPED')
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Stopped,
      })
    })

    return () => {
      service.EventsOff(
        EVENTS.SERVICE_HEALTHY,
        EVENTS.SERVICE_UNREACHABLE,
        EVENTS.SERVICE_UNHEALTHY,
        EVENTS.SERVICE_STOPPED_WITH_ERROR,
        EVENTS.SERVICE_STOPPED
      )
    }
  }, [service, dispatch])

  if (serviceError && httpServiceUrl) {
    return (
      <Chrome>
        <SplashError
          title="Wallet service cannot load"
          message={
            <span>
              Make sure you don't already have an application running on machine
              on port <code className="inline">:1789</code>. Reload the
              application, or change your network port.
            </span>
          }
          actions={
            <Button onClick={() => runtime.WindowReload()}>Reload</Button>
          }
        />
      </Chrome>
    )
  }

  return <>{children}</>
}
