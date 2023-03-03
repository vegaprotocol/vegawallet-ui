import type { InteractionErrorType } from '../../views/error'
import { InteractionError } from '../../views/error'
import { InteractionSuccess } from '../../views/success'
import { ConnectionView, SelectionView, PassphraseView } from './views'

export type WalletConnectionData = {
  traceID: string
  workflow: 'WALLET_CONNECTION'
  view?: 'connection' | 'selection' | 'passphrase' | 'success'
  hostname?: string
  availableWallets?: string[]
  selectedWallet?: string
  error?: InteractionErrorType
}

export type WalletConnectionProps = {
  data: WalletConnectionData
  onUpdate: (q: WalletConnectionData) => void
  onClose: () => void
}

export const WalletConnection = (p: WalletConnectionProps) => {
  if (p.data.error && p.data.error.type !== 'User error') {
    return (
      <InteractionError
        title="Connection failed"
        type={p.data.error.type}
        message={p.data.error.error}
        onReset={() =>
          p.onUpdate({
            ...p.data,
            error: undefined,
          })
        }
        onClose={p.onClose}
      />
    )
  }

  switch (p.data.view) {
    case 'connection': {
      return <ConnectionView {...p} />
    }
    case 'selection': {
      return <SelectionView {...p} />
    }
    case 'passphrase': {
      return <PassphraseView {...p} />
    }
    case 'success': {
      return <InteractionSuccess title="Connected" onClose={p.onClose} />
    }
    default: {
      return null
    }
  }
}
