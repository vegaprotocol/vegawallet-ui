export type WalletConnectionProps = {
  workflow: 'WALLET_CONNECTION'
  view?: 'connection' | 'selection' | 'passphrase'
  selectedWallet?: string
}

export const WalletConnection = ({ workflow }: WalletConnectionProps) => {
  return <div>{workflow}</div>
}
