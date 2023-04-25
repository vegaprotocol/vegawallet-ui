import classnames from 'classnames'
import type { ErrorInfo, ReactNode } from 'react'
import { Component, useEffect } from 'react'

import { Button } from '@vegaprotocol/ui-toolkit'
import { ServiceLoader } from './components/service-loader'
import { Splash } from './components/splash'
import { SplashError } from './components/splash-error'
import { SplashLoader } from './components/splash-loader'
import { AppStatus, useGlobal } from './contexts/global/global-context'
import { useNetworkMode } from './hooks/use-network-mode'
import type { Features } from './types'
import type { Logger } from './types/logger'

/**
 * Initialiases the app
 */
export function AppLoader({ children }: { children?: ReactNode }) {
  const {
    state: { status, initError },
    runtime,
    actions,
    dispatch,
  } = useGlobal()
  const { mode } = useNetworkMode()

  // Get wallets, service state and version
  useEffect(() => {
    dispatch(actions.initAppAction(mode))
  }, [dispatch, actions, mode])

  if (status === AppStatus.Pending) {
    return (
      <Splash>
        <SplashLoader />
      </Splash>
    )
  }

  if (status === AppStatus.Failed) {
    return (
      <SplashError
        message={initError ?? 'Failed to initialise'}
        actions={<Button onClick={() => runtime.WindowReload()}>Reload</Button>}
      />
    )
  }

  return <ServiceLoader>{children}</ServiceLoader>
}

export const APP_FRAME_HEIGHT = 36
interface AppFrameProps {
  children: ReactNode
}

const getAppTitle = (networkMode: Features['NETWORK_MODE']) => {
  switch (networkMode) {
    case 'mainnet':
      return 'Vega Wallet'
    case 'fairground':
      return 'Fairground Wallet'
    default:
      return 'Vega Wallet Dev'
  }
}

/**
 * Renders a bar at the top of the app with the data-wails-drag attribute which lets you
 * drag the app window aroung. Also renders the vega-bg className if onboard mode
 */
export function AppFrame({ children }: AppFrameProps) {
  const { state } = useGlobal()
  const { mode } = useNetworkMode()
  const useVegaBg = state.status === AppStatus.Onboarding
  return (
    <div
      data-testid="app-frame"
      className={classnames(
        'grid grid-rows-[min-content_1fr]',
        'h-full bg-cover relative overflow-y-hidden',
        {
          'vega-bg': useVegaBg,
          'bg-transparent': useVegaBg,
          'bg-grey-100': !useVegaBg,
        }
      )}
    >
      <div
        // !pointer-events-auto is required to allow the user to click and drag the app
        // when dialogs are open, as radix-ui will apply pointer-events: none to the body
        className="h-9 bg-transparent !pointer-events-auto"
        style={{
          // The app is frameless by default so this element creates a space at the top of the app
          // which you can click and drag to move the app around.
          // https://wails.io/docs/guides/frameless/
          // @ts-ignore: Allow custom css property for wails
          '--wails-draggable': 'drag',
        }}
      >
        <div className="pt-2 flex justify-center">
          {state.version?.version && (
            <>
              <span className="text-white">{getAppTitle(mode)}</span>
              &nbsp;
              <span className="text-dark-300">
                {state.version.version.replace('v', '')}
              </span>
            </>
          )}
        </div>
      </div>
      <div
        className="min-h-0" // prevent children from expanding to fit content
      >
        {children}
      </div>
    </div>
  )
}

type ErrorBoundaryProps = {
  reload: () => void
  logger: Logger
  children: ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  override state: { error: Error | null } = {
    error: null,
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.logger.error(error, errorInfo.componentStack)
  }

  override render() {
    const { error } = this.state
    const { reload, children } = this.props

    if (error) {
      return (
        <SplashError
          message={`Something went wrong: ${error.message}`}
          actions={<Button onClick={() => reload()}>Reload</Button>}
        />
      )
    }

    return children
  }
}
