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

export function NetworkList({ setEditView }: NetworkListProps) {
  const {
    actions,
    dispatch,
    state: { networks },
  } = useGlobal()

  const myNetworks = useMemo(() => {
    return Object.values(networks)
  }, [networks])

  return (
    <>
      <Title>Networks</Title>

      {myNetworks.length > 0 && <Title>My Networks</Title>}
      {myNetworks.map((network) => (
        <div key={network.name} className={itemStyles}>
          <div>{network.name}</div>
          <div className="flex gap-[12px]">
            <Button
              data-testid={`remove-network-${network}`}
              onClick={() => {
                dispatch(actions.removeNetwork(network.name))
              }}
            >
              Remove
            </Button>
            <Button
              data-testid={`edit-network-${network}`}
              onClick={() => {
                setEditView(network.name)
              }}
            >
              Edit
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}
