import { useMemo, useState } from 'react'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { useGlobal } from '../../contexts/global/global-context'
import { useImportNetwork } from '../../hooks/use-import-network'
import { Button } from '../button'
import { Title } from '../title'

const itemStyles = 'flex items-center justify-between my-[12px]'

type NetworkPresetItemProps = {
  network: WalletModel.DescribeNetworkResult
  onEdit: () => void
  onRemove: () => void
}

const NetworkListItem = ({
  network,
  onEdit,
  onRemove,
}: NetworkPresetItemProps) => {
  const { state } = useGlobal()
  const { submit } = useImportNetwork()

  return (
    <div className={itemStyles}>
      <div>{network.name}</div>
      <div className="flex gap-[12px]">
        <Button
          data-testid={`remove-network-${network.name}`}
          onClick={onRemove}
        >
          Remove
        </Button>
        <Button data-testid={`edit-network-${network.name}`} onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  )
}

interface NetworkListProps {
  setEditView: (network: string) => void
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

export function NetworkList({ setEditView }: NetworkListProps) {
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
        <NetworkRow
          key={config.name}
          type="mainnet"
          config={config}
          setEditView={setEditView}
        />
      ))}
      {testnet.length > 0 && <Title>Test Networks</Title>}
      {testnet.map((config) => (
        <NetworkRow
          key={config.name}
          type="mainnet"
          config={config}
          setEditView={setEditView}
        />
      ))}
      {myNetworks.length > 0 && <Title>My Networks</Title>}
      {myNetworks.map((config) => (
        <NetworkRow
          key={config.name}
          type="mainnet"
          config={config}
          setEditView={setEditView}
        />
      ))}
    </>
  )
}

type NetworkRowProps = NetworkListProps & {
  type?: 'mainnet' | 'testnet'
  config: WalletModel.DescribeNetworkResult
}

const NetworkRow = ({ config, type, setEditView }: NetworkRowProps) => {
  const { actions, dispatch } = useGlobal()

  return (
    <div key={config.name} className={itemStyles}>
      <div>{config.name}</div>

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
              setEditView(config.name)
            }}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  )
}
