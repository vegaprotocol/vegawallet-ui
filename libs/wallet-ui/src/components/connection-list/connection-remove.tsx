import { omit } from 'ramda'
import { useCallback, useState } from 'react'
import type { Wallet } from '../../contexts/global/global-context'
import { useGlobal } from '../../contexts/global/global-context'
import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'

type RemoveDialogProps = {
  wallet: Wallet
  hostname: string
  onClose: () => void
}

export const Remove = ({ wallet, hostname, onClose }: RemoveDialogProps) => {
  const [isLoading, setLoading] = useState(false)
  const { client, dispatch } = useGlobal()

  const handleRemoval = useCallback(async () => {
    setLoading(true)
    const hostConnection = wallet.connections?.[hostname]

    await client.RevokePermissions({
      wallet: wallet.name,
      hostname,
    })

    if (hostConnection) {
      dispatch({
        type: 'SET_CONNECTIONS',
        wallet: wallet.name,
        connections: omit([hostname], wallet.connections),
      })
    }
    setLoading(false)
    onClose()
  }, [dispatch, client, hostname, wallet, setLoading, onClose])

  return (
    <div>
      <div data-testid="remove-connection-message" className="p-[20px]">
        <p>
          Are you sure you want to remove the connection from your wallet{' '}
          <code>{wallet.name}</code> to <code>{hostname}</code>? You may lose
          site functionality.
        </p>
      </div>
      <ButtonGroup inline className="p-[20px]">
        <ButtonUnstyled
          data-testid="remove-connection-cancel-button"
          onClick={onClose}
        >
          Cancel
        </ButtonUnstyled>
        <Button
          data-testid="remove-connection-remove-button"
          loading={isLoading}
          onClick={handleRemoval}
        >
          Remove
        </Button>
      </ButtonGroup>
    </div>
  )
}
