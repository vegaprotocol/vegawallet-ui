import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'
import { Dialog } from '../dialog'
import { Warning } from '../icons/warning'

const WarningPrompt = ({ wallets }: { wallets: string[] }) => {
  if (wallets.length > 1) {
    return (
      <p>
        You have active connections in the following wallets:{' '}
        <code>{wallets.join(', ')}</code>.
      </p>
    )
  }
  return (
    <p>
      You have active connections in your <code>{wallets[0]}</code> wallet.
    </p>
  )
}

type NetworkSwitchDialogProps = {
  activeConnections: string[]
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  onConfirm: () => void
}

export const ConnectionsWarningDialog = ({
  activeConnections,
  isOpen,
  setOpen,
  onConfirm,
}: NetworkSwitchDialogProps) => {
  return (
    <Dialog
      open={isOpen && activeConnections.length > 0}
      title={
        <>
          <Warning className="w-[20px] mr-[12px]" />
          Warning
        </>
      }
      onChange={setOpen}
    >
      <div className="p-[20px]">
        <WarningPrompt wallets={activeConnections} />
        <p>
          Switching networks will result in losing these connections, and having
          to reconnect the dApps to your wallets.
        </p>
      </div>
      <ButtonGroup inline className="p-[20px]">
        <ButtonUnstyled onClick={() => setOpen(false)}>Cancel</ButtonUnstyled>
        <Button onClick={onConfirm}>Switch</Button>
      </ButtonGroup>
    </Dialog>
  )
}
