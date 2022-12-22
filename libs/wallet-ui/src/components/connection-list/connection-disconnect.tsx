import type { Wallet } from '../../contexts/global/global-context'
import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'

type DisconnectDialogProps = {
  wallet: Wallet
  hostname: string
  onClose: () => void
}

export const Disconnect = ({
  wallet,
  hostname,
  onClose,
}: DisconnectDialogProps) => {
  // TODO: add client.DisconnectWallet({...}) when made available
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleDisconnect = () => {}

  return (
    <div>
      <div className="p-[20px]">
        <p>
          Are you sure you want to disconnect your wallet{' '}
          <code>{wallet.name}</code> from <code>{hostname}</code>? You may lose
          site functionality.
        </p>
      </div>
      <ButtonGroup inline className="p-[20px]">
        <Button onClick={handleDisconnect}>Disconnect</Button>
        <ButtonUnstyled onClick={onClose}>Cancel</ButtonUnstyled>
      </ButtonGroup>
    </div>
  )
}
