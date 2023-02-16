import { useMemo } from 'react'

import { useGlobal } from '../contexts/global/global-context'

export const useExplorerUrl = () => {
  const {
    state: { currentNetwork, networks },
  } = useGlobal()

  const config = currentNetwork ? networks[currentNetwork] : null

  return config?.apps.explorer
}
