import { useGlobal } from '../../contexts/global/global-context'
import { NodeList } from '../node-list'
import { Title } from '../title'

export function NetworkInfo() {
  const {
    service,
    state: { currentNetwork, networks },
  } = useGlobal()
  const config = currentNetwork && networks[currentNetwork]

  if (!config) {
    return null
  }

  return (
    <>
      {config.apps.console && (
        <>
          <Title>Console dApp URL</Title>
          <a
            href={config.apps.console}
            rel="noopener noreferrer"
            target="_blank"
          >
            {config.apps.console}
          </a>
        </>
      )}
      {config.apps.explorer && (
        <>
          <Title>Explorer dApp URL</Title>
          <a
            href={config.apps.explorer}
            rel="noopener noreferrer"
            target="_blank"
          >
            {config.apps.explorer}
          </a>
        </>
      )}
      {config.apps.tokenDApp && (
        <>
          <Title>Token dApp URL</Title>
          <a
            href={config.apps.tokenDApp}
            rel="noopener noreferrer"
            target="_blank"
          >
            {config.apps.tokenDApp}
          </a>
        </>
      )}
      <Title>gRPC Nodes</Title>
      <NodeList items={config.api?.grpcConfig?.hosts ?? []} />
      <Title>GraphQL Nodes</Title>
      <NodeList items={config.api?.graphQLConfig?.hosts ?? []} />
      <Title>REST Nodes</Title>
      <NodeList items={config.api?.restConfig?.hosts ?? []} />
    </>
  )
}
