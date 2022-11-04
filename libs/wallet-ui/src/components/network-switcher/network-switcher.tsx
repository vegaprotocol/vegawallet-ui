import { useCallback, useMemo, useState } from 'react'

import { Colors } from '../../config/colors'
import type { Wallet } from '../../contexts/global/global-context'
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
    if (hosts.find(host => connections[host].active)) {
      acc.push(walletName)
    }
    return acc
  }, [])
}

export const NetworkSwitcher = () => {
  const { state, actions, dispatch } = useGlobal()
  const [hasConnectionWarning, setConnectionWarning] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState(state.network)
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
            data-testid='network-select'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 5,
              minWidth: 75
            }}
          >
            <span>{state.network}</span>
            <DropdownArrow style={{ width: 13, height: 13, marginLeft: 10 }} />
          </Button>
        }
        content={
          <div>
            {state.networks.map(network => (
              <DropdownItem key={network}>
                <ButtonUnstyled
                  data-testid={`select-${network}`}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    lineHeight: 1,
                    textAlign: 'left',
                    textDecoration:
                      network === selectedNetwork ? 'underline' : 'none',
                    color:
                      network === selectedNetwork
                        ? Colors.WHITE
                        : Colors.TEXT_COLOR_DEEMPHASISE
                  }}
                  onClick={() => {
                    handleNetworkChange(network)
                  }}
                >
                  {network}
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
