import {
  ConnectionView,
  SelectionView,
  PassphraseView,
  SuccessView,
} from './views'

export type WalletConnectionData = {
  traceID: string
  workflow: 'WALLET_CONNECTION'
  view?: 'connection' | 'selection' | 'passphrase' | 'success'
  hostname?: string
  availableWallets?: string[]
  selectedWallet?: string
  error?: string
}

export type WalletConnectionProps = {
  data: WalletConnectionData
  onUpdate: (q: WalletConnectionData) => void
  onClose: () => void
}

export const WalletConnection = (p: WalletConnectionProps) => {
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
      return <SuccessView {...p} />
    }
    default: {
      return null
    }
  }
}
