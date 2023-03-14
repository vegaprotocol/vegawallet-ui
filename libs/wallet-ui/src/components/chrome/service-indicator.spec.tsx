import { render, screen } from '@testing-library/react'
import { service, client, runtime } from '../../mocks'
import { GlobalProvider } from '../../contexts/global/global-provider'
import type { GlobalState } from '../../contexts/global/global-context'
import { StatusIndicator } from './service-indicator'

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
      <StatusIndicator />
    </GlobalProvider>
  )
}

describe('ServiceIndicator', () => {
  it('renders green circle by default', () => {
    renderComponent({
      isNetworkCompatible: true,
      wasAbleToVerifyCompatibility: true,
    })
    expect(screen.getByTestId('status-circle')).toHaveClass('bg-green')
  })
  it('renders warning when is not compatible but was able to check', () => {
    renderComponent({
      isNetworkCompatible: false,
      wasAbleToVerifyCompatibility: true,
    })
    expect(screen.getByTestId('network-compatibility-warning')).toHaveClass(
      'text-warning-light'
    )
  })
  it('renders error when is not compatible but was able to check', () => {
    renderComponent({
      isNetworkCompatible: false,
      wasAbleToVerifyCompatibility: false,
    })
    expect(screen.getByTestId('network-compatibility-warning')).toHaveClass(
      'text-danger-light'
    )
  })
})
