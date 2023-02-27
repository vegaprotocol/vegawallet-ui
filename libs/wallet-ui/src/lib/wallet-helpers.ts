import type { WalletModel } from '@vegaprotocol/wallet-admin'
import type { KeyPair, Wallet } from '../contexts/global/global-context'
import { truncateMiddle } from './truncate-middle'

export function extendKeypair(kp: WalletModel.DescribeKeyResult): KeyPair {
  const publicKeyShort = truncateMiddle(kp.publicKey ?? '')
  const nameMeta = kp.metadata?.find((m) => m.key === 'name')
  return {
    isTainted: kp.isTainted,
    publicKey: kp.publicKey,
    meta: kp.metadata,
    name: nameMeta?.value || 'No name',
    publicKeyShort,
  }
}

export function sortWallet(a: Wallet, b: Wallet) {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}
