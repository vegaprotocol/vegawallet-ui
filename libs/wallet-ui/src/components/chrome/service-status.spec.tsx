import { render, screen } from '@testing-library/react'
import { ServiceStatus } from './service-status'
import { service, client, runtime } from '../../mocks'
import { GlobalProvider } from '../../contexts/global/global-provider'
import type { GlobalState } from '../../contexts/global/global-context'
import { ServiceState } from '../../contexts/global/global-context'

const renderComponent = (initialGlobalState: Partial<GlobalState>) => {
  render(
    <GlobalProvider
      service={service}
      client={client}
      runtime={runtime}
      features={{
        TELEMETRY_CHECK: true,
        NETWORK_COMPATIBILITY_WARNING: true,
      }}
      initialState={initialGlobalState}
    >
      <ServiceStatus />
    </GlobalProvider>
  )
}

describe('ServiceStatus', () => {
  it('renders started when state', () => {
    renderComponent({
      serviceStatus: ServiceState.Started,
      httpServiceUrl: 'http://localhost:8080',
    })
    expect(screen.getByTestId('service-status-started')).toHaveTextContent(
      'Wallet Service: on http://localhost:8080'
    )
    expect(screen.getByTestId('status-circle')).toHaveClass('bg-green')
  })
  it('renders stopped state', () => {
    renderComponent({
      serviceStatus: ServiceState.Stopped,
    })
    expect(screen.getByTestId('service-status-stopped')).toHaveTextContent(
      'Wallet Service: Not running. Start service'
    )
    expect(screen.getByTestId('status-circle')).toHaveClass('bg-red')
    expect(
      screen.getByTestId('service-status-start-service')
    ).toBeInTheDocument()
  })
  it('renders loading state', () => {
    renderComponent({
      serviceStatus: ServiceState.Loading,
    })
    expect(screen.getByTestId('service-status-loading')).toHaveTextContent(
      'Wallet Service: Loading'
    )
    expect(screen.getByTestId('status-circle')).toHaveClass('bg-orange')
  })
  it('renders unhealthy state', () => {
    renderComponent({
      serviceStatus: ServiceState.Unhealthy,
    })
    expect(screen.getByTestId('service-status-unhealthy')).toHaveTextContent(
      'Wallet Service: Unhealthy Restart'
    )
    expect(screen.getByTestId('status-circle')).toHaveClass('bg-orange')
  })
  it('renders unreachable state', () => {
    renderComponent({
      serviceStatus: ServiceState.Unreachable,
    })
    expect(screen.getByTestId('service-status-unreachable')).toHaveTextContent(
      'Wallet Service: Not reachable, retrying'
    )
    expect(screen.getByTestId('status-circle')).toHaveClass('bg-orange')
  })
  it('renders error state', () => {
    renderComponent({
      serviceStatus: ServiceState.Error,
    })
    expect(screen.getByTestId('service-status-error')).toHaveTextContent(
      'Wallet Service: Failed to start. Try to restart'
    )
    expect(screen.getByTestId('status-circle')).toHaveClass('bg-red')
    expect(
      screen.getByTestId('service-status-restart-service')
    ).toBeInTheDocument()
  })
})
