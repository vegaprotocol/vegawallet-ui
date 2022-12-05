import { useState, useEffect, useMemo } from 'react'
import type { ReactElement } from 'react'
import type { WalletModel } from '@vegaprotocol/wallet-client'

import { useGlobal } from '../../contexts/global/global-context'

interface NetworkConfigContainerProps {
  children: (config: WalletModel.DescribeNetworkResult) => ReactElement
  name: string | null
}

export function NetworkConfigContainer({
  children,
  name,
}: NetworkConfigContainerProps) {
  const { config, loading } = useNetworkConfig(name)

  if (loading) {
    return null
  }

  if (!config) {
    return <p>No network configuration found. </p>
  }

  return children(config)
}

export function useNetworkConfig(name: string | null) {
  const { client, service } = useGlobal()
  const logger = useMemo(
    () => service.GetLogger('NetworkConfigContainer'),
    [service]
  )
  const [config, setConfig] =
    useState<WalletModel.DescribeNetworkResult | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      if (!name) return
      setLoading(true)
      try {
        const res = await client.DescribeNetwork({ name })
        setConfig(res)
      } catch (err) {
        setError(err as Error)
        logger.error(err)
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [name, client, logger])

  return { config, error, loading }
}
