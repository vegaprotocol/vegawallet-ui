import { useCallback } from 'react'

import { Intent } from '../../config/intent'
import { ServiceState, useGlobal } from '../../contexts/global/global-context'
import { ButtonUnstyled } from '../button-unstyled'
import { StatusCircle } from '../status-circle'
import { AppToaster } from '../toaster'
import { StatusIndicator } from './service-indicator'

export function ServiceStatus() {
  const {
    service,
    dispatch,
    state: { currentNetwork, serviceStatus, httpServiceUrl },
  } = useGlobal()
  const serviceUrl = service.TYPE === 'http' ? httpServiceUrl : ''

  const startService = useCallback(async () => {
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

  const restartService = useCallback(async () => {
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

  switch (serviceStatus) {
    case ServiceState.Started: {
      return (
        <div data-testid="service-status-started" className="whitespace-nowrap">
          <StatusIndicator />
          Wallet Service:{' '}
          <span className="font-mono bg-dark-200 py-[1px] px-[5px]">
            {currentNetwork}
          </span>{' '}
          {serviceUrl && (
            <>
              on <code>{serviceUrl}</code>
            </>
          )}
        </div>
      )
    }
    case ServiceState.Stopped: {
      return (
        <div data-testid="service-status-stopped" className="whitespace-nowrap">
          <StatusCircle background="bg-red" />
          <span>
            Wallet Service: Not running.{' '}
            <ButtonUnstyled
              data-testid="service-status-start-service"
              onClick={startService}
            >
              Start service
            </ButtonUnstyled>
          </span>
        </div>
      )
    }
    case ServiceState.Loading: {
      return (
        <div data-testid="service-status-loading" className="whitespace-nowrap">
          <StatusCircle blinking background="bg-orange" />
          <span className="loading">Wallet Service: Loading</span>
        </div>
      )
    }
    case ServiceState.Stopping: {
      return (
        <div
          data-testid="service-status-stopping"
          className="whitespace-nowrap"
        >
          <StatusCircle blinking background="bg-orange" />
          <span className="loading">Wallet Service: Stopping</span>
        </div>
      )
    }
    case ServiceState.Unhealthy: {
      return (
        <div
          data-testid="service-status-unhealthy"
          className="whitespace-nowrap"
        >
          <StatusCircle blinking background="bg-orange" />
          <span>
            Wallet Service: Unhealthy{' '}
            <ButtonUnstyled
              data-testid="service-status-restart-service"
              onClick={restartService}
            >
              Restart
            </ButtonUnstyled>
          </span>
        </div>
      )
    }
    case ServiceState.Unreachable: {
      return (
        <div
          data-testid="service-status-unreachable"
          className="whitespace-nowrap"
        >
          <StatusCircle blinking background="bg-orange" />
          <span className="loading">
            Wallet Service: Not reachable, retrying
          </span>
        </div>
      )
    }
    case ServiceState.Error: {
      return (
        <div data-testid="service-status-error" className="whitespace-nowrap">
          <StatusCircle background="bg-red" />
          <span>
            Wallet Service: Failed to start.{' '}
            <ButtonUnstyled
              data-testid="service-status-restart-service"
              onClick={startService}
            >
              Try to restart
            </ButtonUnstyled>
          </span>
        </div>
      )
    }
  }
}
