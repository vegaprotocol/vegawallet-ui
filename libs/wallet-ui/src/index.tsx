import { ErrorBoundary } from '@sentry/react'
import { HashRouter as Router } from 'react-router-dom'
import type { WalletAdmin } from '@vegaprotocol/wallet-admin'
import { ThemeProvider } from '@vegaprotocol/wallet-theme'

import { AppFrame, AppLoader } from './app-loader'
import { Button } from './components/button'
import { InteractionsProvider } from './components/interactions'
import { NetworkCompatibilityDialog } from './components/network-compatibility-dialog'
import { PassphraseModal } from './components/passphrase-modal'
import { TransactionDetailsDialog } from './components/transaction-details-dialog'
import { SplashError } from './components/splash-error'
import { TelemetryDialog } from './components/telemetry-dialog'
import { GlobalProvider } from './contexts/global/global-provider'
import { AppRouter } from './routes'
import type { Service } from './types/service'
import type { Runtime } from './types/runtime'
import type { Features } from './types/features'
import { useEffect } from 'react'
import { Globals } from 'react-spring'
import { FullscreenProvider } from './contexts/fullscreen/fullscreen-provider'

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
  useEffect(() => {
    if (localStorage.getItem('playwright')) {
      Globals.assign({
        skipAnimation: true,
      })
    }

    return () => {
      Globals.assign({
        skipAnimation: false,
      })
    }
  })
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
          <FullscreenProvider>
            <div id={ROOT} className="h-full text-white font-sans bg-black">
              <Router>
                <AppFrame>
                  <AppLoader>
                    <AppRouter />
                    <TelemetryDialog />
                    <PassphraseModal />
                    <InteractionsProvider />
                    <NetworkCompatibilityDialog />
                    <TransactionDetailsDialog />
                  </AppLoader>
                </AppFrame>
              </Router>
            </div>
          </FullscreenProvider>
        </GlobalProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
