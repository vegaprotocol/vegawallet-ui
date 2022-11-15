import React from 'react'
import useThunkReducer from 'react-hook-thunk-reducer'
import type { WalletClient } from '@vegaprotocol/wallet-client'

import type { Service } from '../../types/service'
import type { Runtime } from '../../types/runtime'
import { createActions } from './global-actions'
import { GlobalContext } from './global-context'
import { globalReducer, initialGlobalState } from './global-reducer'

interface GlobalProviderProps {
  service: Service
  client: WalletClient
  runtime: Runtime
  children: React.ReactElement
}

export function GlobalProvider({
  service,
  client,
  runtime,
  children,
}: GlobalProviderProps) {
  const [state, dispatch] = useThunkReducer(globalReducer, initialGlobalState)
  const actions = React.useMemo(
    () => createActions(service, client),
    [service, client]
  )

  return (
    <GlobalContext.Provider
      value={{ state, actions, service, client, runtime, dispatch }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
