import type { InteractionErrorType } from '../../views/error'
import { InteractionError } from '../../views/error'
import { InteractionSuccess } from '../../views/success'
import { ConnectionView, SelectionView, PassphraseView } from './views'
import { useGlobal } from '../../../../contexts/global/global-context'

export type WalletConnectionData = {
  traceID: string
  workflow: 'WALLET_CONNECTION'
  view?: 'connection' | 'selection' | 'passphrase' | 'success'
  hostname?: string
  availableWallets?: string[]
  selectedWallet?: string // populated if multiple wallets are available
  wallet?: string // populated if only a single wallet is available
  error?: InteractionErrorType
}

export type WalletConnectionProps = {
  data: WalletConnectionData
  onUpdate: (q: WalletConnectionData) => void
  onClose: () => void
}

export const WalletConnection = (p: WalletConnectionProps) => {
  const { dispatch } = useGlobal()

  if (p.data.error && p.data.error.type !== 'User error') {
    return (
      <InteractionError
        title="Connection failed"
        type={p.data.error.type}
        message={p.data.error.error}
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
      return (
        <InteractionSuccess
          title="Connected"
          onClose={() => {
            const wallet = p.data.wallet || p.data.selectedWallet
            if (wallet && p.data.hostname) {
              dispatch({
                type: 'ADD_CONNECTION',
                wallet,
                connection: {
                  hostname: p.data.hostname,
                  active: true,
                  permissions: {},
                },
              })
            }
            p.onClose()
          }}
        />
      )
    }
    default: {
      return null
    }
  }
}
