import { useCallback, useState } from 'react'
import type { Wallet } from '../../contexts/global/global-context'
import { useGlobal } from '../../contexts/global/global-context'
import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'
import { AppToaster } from '../toaster'
import { Intent } from '../../config/intent'

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
  const [isLoading, setLoading] = useState(false)
  const { client, dispatch } = useGlobal()

  const handleDisconnect = useCallback(async () => {
    setLoading(true)
    try {
      await client.CloseConnection({
        wallet: wallet.name,
        hostname,
      })

      const hostConnection = wallet.connections?.[hostname]

      if (hostConnection) {
        dispatch({
          type: 'SET_CONNECTIONS',
          wallet: wallet.name,
          connections: {
            ...wallet.connections,
            [hostname]: {
              ...hostConnection,
              active: false,
            },
          },
        })
      }
      setLoading(false)
      onClose()
    } catch (err) {
      setLoading(false)
      AppToaster.show({
        intent: Intent.DANGER,
        message: `${err}`,
      })
    }
  }, [dispatch, client, wallet, hostname, setLoading, onClose])

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
        <Button loading={isLoading} onClick={handleDisconnect}>
          Disconnect
        </Button>
        <ButtonUnstyled onClick={onClose}>Cancel</ButtonUnstyled>
      </ButtonGroup>
    </div>
  )
}
