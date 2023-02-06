import { ErrorBoundary } from '@sentry/react'
import { HashRouter as Router } from 'react-router-dom'
import type { WalletAdmin } from '@vegaprotocol/wallet-admin'
import { ThemeProvider } from '@vegaprotocol/wallet-theme'

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
import type { Features } from './types/features'
export { FeatureMap } from './types/features'

export * from './types'

export type AppProps = {
  service: Service
  client: WalletAdmin
  runtime: Runtime
  features?: Features
}

const ROOT = 'wallet-ui'

/**
 * Renders all the providers
 */
export function App({ service, client, runtime, features }: AppProps) {
  return (
    <ErrorBoundary
      fallback={({ error }) => (
        <SplashError
          title="Somthing went wrong"
          message={error.message}
          actions={[<Button onClick={runtime.WindowReload}>Reload</Button>]}
        />
      )}
    >
      <ThemeProvider value="dark">
        <GlobalProvider
          service={service}
          client={client}
          runtime={runtime}
          features={features}
        >
          <div id={ROOT} className="h-full text-white font-sans">
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
          </div>
        </GlobalProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
