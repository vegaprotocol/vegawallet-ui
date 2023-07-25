import { useCallback } from 'react'
import type { InteractionErrorType } from '../../views/error'
import { InteractionError } from '../../views/error'
import { InteractionSuccess } from '../../views/success'
import { ConnectionView, SelectionView, PassphraseView } from './views'
import { useOpenWallet } from '../../../../hooks/use-open-wallet'

export type WalletConnectionData = {
  traceID: string
  workflow: 'WALLET_CONNECTION'
  view?: 'connection' | 'selection' | 'passphrase' | 'success'
  hostname?: string
  availableWallets?: string[]
  selectedWallet?: string // populated if multiple wallets are available
  wallet?: string // populated if only a single wallet is available
  error?: InteractionErrorType
  reason?: string
}

export type WalletConnectionProps = {
  data: WalletConnectionData
  onUpdate: (q: WalletConnectionData) => void
  onClose: () => void
}

export const WalletConnection = (p: WalletConnectionProps) => {
  const { getWalletData } = useOpenWallet()

  const onClose = useCallback(async () => {
    const wallet = p.data.wallet || p.data.selectedWallet
    if (wallet && p.data.hostname) {
      await getWalletData(wallet)
    }
    p.onClose()
  }, [getWalletData, p])

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
      return <InteractionSuccess title="Connected" onClose={onClose} />
    }
    default: {
      return null
    }
  }
}
