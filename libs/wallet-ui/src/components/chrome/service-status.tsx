import { useCallback } from 'react'

import { Colors } from '../../config/colors'
import { Fonts } from '../../config/fonts'
import { Intent } from '../../config/intent'
import { ServiceState, useGlobal } from '../../contexts/global/global-context'
import { ButtonUnstyled } from '../button-unstyled'
import { StatusCircle } from '../status-circle'
import { AppToaster } from '../toaster'

export function ServiceStatus() {
  const {
    service,
    dispatch,
    state: { network, networkConfig, serviceStatus }
  } = useGlobal()
  const serviceUrl = networkConfig
    ? `http://${networkConfig.host}:${networkConfig.port}`
    : ''

  const startService = useCallback(async () => {
    if (network) {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Loading
      })
      try {
        await service.StartService({ network })
      } catch (err) {
        dispatch({
          type: 'SET_SERVICE_STATUS',
          status: ServiceState.Error
        })
        AppToaster.show({
          intent: Intent.DANGER,
          message: `${err}`
        })
      }
    }
  }, [dispatch, service, network])

  const restartService = useCallback(async () => {
    if (network) {
      try {
        await service.StopService()
      } catch (err) {
        dispatch({
          type: 'SET_SERVICE_STATUS',
          status: ServiceState.Error
        })
        AppToaster.show({
          intent: Intent.DANGER,
          message: `${err}`
        })
      }

      await startService()
    }
  }, [startService, dispatch, service, network])

  switch (serviceStatus) {
    case ServiceState.Started: {
      return (
        <div data-testid='service-status' style={{ whiteSpace: 'nowrap' }}>
          <StatusCircle background={Colors.VEGA_GREEN} />
          <>
            Wallet Service:{' '}
            <span
              style={{
                fontFamily: Fonts.MONO,
                background: Colors.DARK_GRAY_4,
                padding: '1px 5px'
              }}
            >
              {network}
            </span>{' '}
            on <code>{serviceUrl}</code>
          </>
        </div>
      )
    }
    case ServiceState.Stopped: {
      return (
        <div data-testid='service-status' style={{ whiteSpace: 'nowrap' }}>
          <StatusCircle background={Colors.VEGA_RED} />
          <span>
            Wallet Service: Not running.{' '}
            <ButtonUnstyled onClick={startService}>
              Start service
            </ButtonUnstyled>
          </span>
        </div>
      )
    }
    case ServiceState.Loading: {
      return (
        <div data-testid='service-status' style={{ whiteSpace: 'nowrap' }}>
          <StatusCircle blinking background={Colors.VEGA_ORANGE} />
          <span className='loading'>Wallet Service: Loading</span>
        </div>
      )
    }
    case ServiceState.Stopping: {
      return (
        <div data-testid='service-status' style={{ whiteSpace: 'nowrap' }}>
          <StatusCircle blinking background={Colors.VEGA_ORANGE} />
          <span className='loading'>Wallet Service: Stopping</span>
        </div>
      )
    }
    case ServiceState.Unhealthy: {
      return (
        <div data-testid='service-status' style={{ whiteSpace: 'nowrap' }}>
          <StatusCircle blinking background={Colors.VEGA_ORANGE} />
          <span>
            Wallet Service: Unhealthy{' '}
            <ButtonUnstyled onClick={restartService}>Restart</ButtonUnstyled>
          </span>
        </div>
      )
    }
    case ServiceState.Unreachable: {
      return (
        <div data-testid='service-status' style={{ whiteSpace: 'nowrap' }}>
          <StatusCircle blinking background={Colors.VEGA_ORANGE} />
          <span className='loading'>
            Wallet Service: Not reachable, retrying
          </span>
        </div>
      )
    }
    case ServiceState.Error: {
      return (
        <div data-testid='service-status' style={{ whiteSpace: 'nowrap' }}>
          <StatusCircle background={Colors.VEGA_RED} />
          <span>
            Wallet Service: Failed to start.{' '}
            <ButtonUnstyled onClick={startService}>
              Try to restart
            </ButtonUnstyled>
          </span>
        </div>
      )
    }
  }
}
