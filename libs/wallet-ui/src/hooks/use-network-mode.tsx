import { useMemo } from 'react'
import { useGlobal } from '../contexts/global/global-context'

export const useNetworkMode = () => {
  const { features } = useGlobal()
  return useMemo(
    () => ({
      mode: features.NETWORK_MODE || 'dev',
      isFairground: features.NETWORK_MODE === 'fairground',
      isMainnet: features.NETWORK_MODE === 'mainnet',
      isDev:
        features.NETWORK_MODE === 'dev' || features.NETWORK_MODE === undefined,
    }),
    [features.NETWORK_MODE]
  )
}
