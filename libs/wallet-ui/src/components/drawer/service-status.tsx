import { ServiceState, useGlobal } from '../../contexts/global/global-context'
import { ButtonUnstyled } from '../button-unstyled'
import { StatusCircle } from '../status-circle'
import { Warning } from '../icons/warning'
import { useStartService } from '../../hooks/use-start-service'
import { useRestartService } from '../../hooks/use-restart-service'

export function ServiceStatus() {
  const {
    service,
    dispatch,
    state: {
      isNetworkCompatible,
      currentNetwork,
      serviceStatus,
      httpServiceUrl,
    },
  } = useGlobal()
  const serviceUrl = service.TYPE === 'http' ? httpServiceUrl : ''
  const startService = useStartService()
  const restartService = useRestartService()

  switch (serviceStatus) {
    case ServiceState.Started: {
      const statusElement = isNetworkCompatible ? (
        <StatusCircle background="bg-green" blinking />
      ) : (
        <ButtonUnstyled
          data-testid="network-compatibility-warning"
          className="text-warning-light cursor-pointer inline-block"
          onClick={() => {
            dispatch({
              type: 'SET_NETWORK_COMPATIBILITY_MODAL',
              open: true,
            })
          }}
        >
          <Warning className="w-[16px] mr-[6px]" />
        </ButtonUnstyled>
      )

      return (
        <div data-testid="service-status" className="whitespace-nowrap">
          {statusElement}
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
            <ButtonUnstyled onClick={startService}>
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
            <ButtonUnstyled onClick={restartService}>Restart</ButtonUnstyled>
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
            <ButtonUnstyled onClick={startService}>
              Try to restart
            </ButtonUnstyled>
          </span>
        </div>
      )
    }
  }
}
