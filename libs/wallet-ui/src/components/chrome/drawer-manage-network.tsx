import { DrawerPanel } from '../../contexts/global/global-context'
import { Button } from '../button'
import { NetworkList } from '../network-list'

interface DrawerManageNetworkProps {
  setView: (panel: DrawerPanel) => void
  setEditingNetwork: (network: string) => void
}

export function DrawerManageNetwork({
  setView,
  setEditingNetwork,
}: DrawerManageNetworkProps) {
  return (
    <div>
      <NetworkList setEditView={setEditingNetwork} />
      <div className="my-[24px] mx-0">
        <Button
          data-testid="add-network"
          onClick={() => setView(DrawerPanel.Add)}
        >
          Add network
        </Button>
      </div>
    </div>
  )
}
