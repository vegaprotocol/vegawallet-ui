import { useMemo } from 'react'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { useGlobal } from '../../contexts/global/global-context'
import { KeyValueTable } from '../key-value-table'
import { NodeList } from '../node-list'
import { Title } from '../title'
import type { Service } from '../../types/service'

type AppSettingsField = {
  key: string
  value: string
  dataTestId: string
}

const compileAppSettings = (
  service: Service,
  config: WalletModel.DescribeNetworkResult | null
) => {
  const settings: AppSettingsField[] = []

  if (!config) {
    return settings
  }

  if (service.TYPE === 'http') {
    settings.push({
      key: 'Wallet Service URL',
      value: `http://${config.host}:${config.port}`,
      dataTestId: 'service-url',
    })
  }

  if (config.logLevel) {
    settings.push({
      key: 'Log level',
      value: config.logLevel,
      dataTestId: 'network-log-level',
    })
  }

  if (config.tokenExpiry) {
    settings.push({
      key: 'Token expiry',
      value: config.tokenExpiry,
      dataTestId: 'token-expiry',
    })
  }

  return settings
}

export function NetworkInfo() {
  const {
    service,
    state: { networkConfig: config },
  } = useGlobal()
  const appSettings = useMemo(
    () => compileAppSettings(service, config),
    [service, config]
  )

  if (!config) {
    return null
  }

  return (
    <>
      <Title>gRPC Nodes</Title>
      <NodeList items={config.api?.grpcConfig?.hosts ?? []} />
      <Title>GraphQL Nodes</Title>
      <NodeList items={config.api?.graphQLConfig?.hosts ?? []} />
      <Title>REST Nodes</Title>
      <NodeList items={config.api?.restConfig?.hosts ?? []} />
      {appSettings.length > 0 && (
        <>
          <Title>Application Settings</Title>
          <KeyValueTable className="text-base" rows={appSettings} />
        </>
      )}
    </>
  )
}
