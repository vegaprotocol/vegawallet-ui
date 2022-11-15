import './index.css'
import { useMemo, StrictMode } from 'react'
import { ErrorBoundary } from '@sentry/react'
import { HashRouter as Router } from 'react-router-dom'
import { WalletClient } from '@vegaprotocol/wallet-client'

import { AppFrame, AppLoader } from './app-loader'
import { Button } from './components/button'
import { Chrome } from './components/chrome'
import { InteractionManager } from './components/interaction-manager'
import { NetworkCompatibilityDialog } from './components/network-compatibility-dialog'
import { PassphraseModal } from './components/passphrase-modal'
import { Settings } from './components/settings'
import { SplashError } from './components/splash-error'
import { TelemetryDialog } from './components/telemetry-dialog'
import { GlobalProvider } from './contexts/global/global-provider'
import { AppRouter } from './routes'
import type { Service } from './types/service'
import type { Runtime } from './types/runtime'

export type AppProps = {
  service: Service
  runtime: Runtime
}

/**
 * Renders all the providers
 */
export function App({ service, runtime }: AppProps) {
  const client = useMemo(
    () => new WalletClient(service.SendAPIRequest),
    [service]
  )

  return (
    <StrictMode>
      <ErrorBoundary
        fallback={({ error }) => (
          <SplashError
            title="Somthing went wrong"
            message={error.message}
            actions={[<Button onClick={runtime.WindowReload}>Reload</Button>]}
          />
        )}
      >
        <GlobalProvider service={service} client={client} runtime={runtime}>
          <Router>
            <AppFrame>
              <Chrome>
                <AppLoader>
                  <AppRouter />
                  <TelemetryDialog />
                  <PassphraseModal />
                  <InteractionManager />
                  <NetworkCompatibilityDialog />
                  <Settings />
                </AppLoader>
              </Chrome>
            </AppFrame>
          </Router>
        </GlobalProvider>
      </ErrorBoundary>
    </StrictMode>
  )
}
