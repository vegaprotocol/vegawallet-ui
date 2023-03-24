import { useMemo } from 'react'
// @ts-ignore Webpack refuses to build this when imported using a default import
import { useThunkReducer } from 'react-hook-thunk-reducer'
import type { WalletAdmin } from '@vegaprotocol/wallet-admin'

import type { Service, Runtime, Features } from '../../types'
import { createActions } from './global-actions'
import { GlobalContext } from './global-context'
import { globalReducer, initialGlobalState } from './global-reducer'

const DEFAULT_FEATURES: Features = {
  TELEMETRY_CHECK: true,
  NETWORK_COMPATIBILITY_WARNING: true,
  FAIRGROUND_MODE: false,
}

interface GlobalProviderProps {
  service: Service
  client: WalletAdmin
  runtime: Runtime
  features?: Partial<Features>
  children: React.ReactElement
}

export function GlobalProvider({
  service,
  client,
  runtime,
  features: partialFeatures,
  children,
}: GlobalProviderProps) {
  const [state, dispatch] = useThunkReducer(globalReducer, initialGlobalState)
  const actions = useMemo(
    () => createActions(service, client),
    [service, client]
  )
  const features = useMemo(
    () => ({
      ...DEFAULT_FEATURES,
      ...partialFeatures,
    }),
    [partialFeatures]
  )

  return (
    <GlobalContext.Provider
      value={{ state, actions, service, client, runtime, features, dispatch }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
