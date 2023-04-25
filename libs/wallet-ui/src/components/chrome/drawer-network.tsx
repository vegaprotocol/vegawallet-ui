import { DrawerPanel, useGlobal } from '../../contexts/global/global-context'
import { Button } from '../button'
import { ButtonUnstyled } from '../button-unstyled'
import { NetworkInfo } from '../network-info'
import { NetworkSwitcher } from '../network-switcher'
import { Title } from '../title'

interface DrawerNetworkProps {
  setView: (panel: DrawerPanel) => void
}

export function DrawerNetwork({ setView }: DrawerNetworkProps) {
  const {
    state: { networks, currentNetwork },
  } = useGlobal()

  const hasNetworks = Object.keys(networks).length > 0

  return (
    <>
      <Title className="mt-0">Network</Title>
      {hasNetworks ? (
        <div className="flex items-center justify-between mb-[20px]">
          <NetworkSwitcher />
          <ButtonUnstyled
            data-testid="manage-networks"
            onClick={() => setView(DrawerPanel.Manage)}
          >
            Manage networks
          </ButtonUnstyled>
        </div>
      ) : (
        <div>
          <Button data-testid="import" onClick={() => setView(DrawerPanel.Add)}>
            Import
          </Button>
        </div>
      )}
      <NetworkInfo network={currentNetwork} />
    </>
  )
}
