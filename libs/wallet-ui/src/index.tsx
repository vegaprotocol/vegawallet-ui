import { ErrorBoundary } from '@sentry/react'
import { HashRouter as Router } from 'react-router-dom'
import type { WalletAdmin } from '@vegaprotocol/wallet-admin'
import { ThemeProvider } from '@vegaprotocol/wallet-theme'

import { AppFrame, AppLoader } from './app-loader'
import { Button } from './components/button'
import { Chrome } from './components/chrome'
import { InteractionsProvider } from './components/interactions'
import { NetworkCompatibilityDialog } from './components/network-compatibility-dialog'
import { PassphraseModal } from './components/passphrase-modal'
import { TransactionDetailsDialog } from './components/transaction-details-dialog'
import { Settings } from './components/settings'
import { SplashError } from './components/splash-error'
import { TelemetryDialog } from './components/telemetry-dialog'
import { GlobalProvider } from './contexts/global/global-provider'
import { AppRouter } from './routes'
import type { Service } from './types/service'
import type { Runtime } from './types/runtime'
import type { Features } from './types/features'
import { useEffect } from 'react'
import { Globals } from 'react-spring'
import { NavBar } from './components/navbar'

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
    if ('Cypress' in window) {
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
          <div id={ROOT} className="h-full text-white font-sans bg-black">
            <Router>
              <AppFrame>
                <NavBar />
                {/* <Chrome>
                  <AppLoader>
                    <AppRouter />
                    <TelemetryDialog />
                    <PassphraseModal />
                    <InteractionsProvider />
                    <NetworkCompatibilityDialog />
                    <TransactionDetailsDialog />
                    <Settings />
                  </AppLoader>
                </Chrome> */}
              </AppFrame>
            </Router>
          </div>
        </GlobalProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
