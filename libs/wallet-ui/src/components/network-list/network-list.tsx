import { useMemo } from 'react'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { useGlobal } from '../../contexts/global/global-context'
import { Button } from '../button'
import { Title } from '../title'

const itemStyles = 'flex items-center justify-between my-[12px]'

type NetworkListItemProps = NetworkListProps & {
  type?: 'mainnet' | 'testnet'
  config: WalletModel.DescribeNetworkResult
}

const NetworkListItem = ({
  config,
  type,
  setEditPanel,
  setViewPanel,
}: NetworkListItemProps) => {
  const { actions, dispatch } = useGlobal()

  return (
    <div key={config.name} className={itemStyles}>
      <div>{config.name}</div>

      {type && (
        <div className="flex gap-[12px]">
          <Button
            data-testid={`view-network-${config.name}`}
            onClick={() => {
              setViewPanel(config.name)
            }}
          >
            View
          </Button>
        </div>
      )}

      {!type && (
        <div className="flex gap-[12px]">
          <Button
            data-testid={`remove-network-${config.name}`}
            onClick={() => {
              dispatch(actions.removeNetwork(config.name))
            }}
          >
            Remove
          </Button>
          <Button
            data-testid={`edit-network-${config.name}`}
            onClick={() => {
              setEditPanel(config.name)
            }}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  )
}

interface NetworkListProps {
  setEditPanel: (network: string) => void
  setViewPanel: (network: string) => void
}

type CompiledNetworks = {
  myNetworks: WalletModel.DescribeNetworkResult[]
  mainnet: WalletModel.DescribeNetworkResult[]
  testnet: WalletModel.DescribeNetworkResult[]
}

const isNetwork = (
  type: 'mainnet' | 'testnet',
  config: WalletModel.DescribeNetworkResult
) => {
  return !!config.metadata?.find(({ key, value }) => {
    return key === 'network' && value === type
  })
}

const compileNetworks = (
  networks: Record<string, WalletModel.DescribeNetworkResult>
) => {
  const configs = Object.values(networks)
  return configs.reduce<CompiledNetworks>(
    (acc, config) => {
      if (isNetwork('mainnet', config)) {
        acc.mainnet.push(config)
        return acc
      }
      if (isNetwork('testnet', config)) {
        acc.testnet.push(config)
        return acc
      }
      acc.myNetworks.push(config)
      return acc
    },
    {
      myNetworks: [],
      mainnet: [],
      testnet: [],
    }
  )
}

export function NetworkList({ setViewPanel, setEditPanel }: NetworkListProps) {
  const {
    state: { networks },
  } = useGlobal()

  const { myNetworks, mainnet, testnet } = useMemo(() => {
    return compileNetworks(networks)
  }, [networks])

  return (
    <>
      {mainnet.length > 0 && <Title>Networks</Title>}
      {mainnet.map((config) => (
        <NetworkListItem
          key={config.name}
          type="mainnet"
          config={config}
          setViewPanel={setViewPanel}
          setEditPanel={setEditPanel}
        />
      ))}
      {testnet.length > 0 && <Title>Test Networks</Title>}
      {testnet.map((config) => (
        <NetworkListItem
          key={config.name}
          type="testnet"
          config={config}
          setViewPanel={setViewPanel}
          setEditPanel={setEditPanel}
        />
      ))}
      {myNetworks.length > 0 && <Title>My Networks</Title>}
      {myNetworks.map((config) => (
        <NetworkListItem
          key={config.name}
          config={config}
          setViewPanel={setViewPanel}
          setEditPanel={setEditPanel}
        />
      ))}
    </>
  )
}
