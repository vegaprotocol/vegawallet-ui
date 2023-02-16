import classnames from 'classnames'
import { useCallback, useMemo, useState } from 'react'

import type { Wallet } from '../../contexts/global/global-context';
import { ServiceState } from '../../contexts/global/global-context'
import { useGlobal } from '../../contexts/global/global-context'
import { Button } from '../button'
import { ButtonUnstyled } from '../button-unstyled'
import { DropdownItem, DropdownMenu } from '../dropdown-menu'
import { DropdownArrow } from '../icons/dropdown-arrow'
import { ConnectionsWarningDialog } from './connections-warning-dialog'

const findActiveConnections = (wallets: Record<string, Wallet>) => {
  return Object.keys(wallets).reduce<string[]>((acc, walletName) => {
    const connections = wallets[walletName].connections || {}
    const hosts = Object.keys(connections)
    if (hosts.find((host) => connections[host].active)) {
      acc.push(walletName)
    }
    return acc
  }, [])
}

export const NetworkSwitcher = () => {
  const { state, actions, dispatch } = useGlobal()
  const [hasConnectionWarning, setConnectionWarning] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState(state.currentNetwork)
  const activeConnections = useMemo(
    () => findActiveConnections(state.wallets),
    [state.wallets]
  )

  const handleNetworkChange = useCallback(
    (network: string) => {
      if (activeConnections.length) {
        setSelectedNetwork(network)
        setConnectionWarning(true)
        return
      }
      dispatch(actions.changeNetworkAction(network))
    },
    [dispatch, actions, activeConnections]
  )

  const handleConfirm = useCallback(() => {
    if (selectedNetwork) {
      setConnectionWarning(false)
      dispatch(actions.changeNetworkAction(selectedNetwork))
    }
  }, [dispatch, actions, selectedNetwork, setConnectionWarning])

  return (
    <>
      <DropdownMenu
        trigger={
          <Button
            data-testid="network-select"
            className="flex justify-between items-center gap-[5px] min-w-[75px]"
          >
            <span>{state.currentNetwork}</span>
            <DropdownArrow className="w-[13px] h-[13px] ml-[10px]" />
          </Button>
        }
        content={
          <div>
            {Object.values(state.networks).map((network) => (
              <DropdownItem key={network.name}>
                <ButtonUnstyled
                  data-testid={`select-${network}`}
                  className={classnames(
                    'w-full py-[10px] px-[10px] leading-none text-left',
                    {
                      underline: network.name === selectedNetwork,
                      'text-white': network.name === selectedNetwork,
                      'text-deemphasise': network.name !== selectedNetwork,
                    }
                  )}
                  disabled={state.serviceStatus === ServiceState.Stopped}
                  onClick={() => {
                    handleNetworkChange(network.name)
                  }}
                >
                  {network.name}
                </ButtonUnstyled>
              </DropdownItem>
            ))}
          </div>
        }
      />
      <ConnectionsWarningDialog
        activeConnections={activeConnections}
        isOpen={hasConnectionWarning}
        setOpen={setConnectionWarning}
        onConfirm={handleConfirm}
      />
    </>
  )
}
