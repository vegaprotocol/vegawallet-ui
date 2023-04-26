import { useGlobal } from '../contexts/global/global-context'

export const useExplorerUrl = () => {
  const {
    state: { currentNetwork, networks },
  } = useGlobal()

  const config = currentNetwork ? networks[currentNetwork] : null

  return config?.apps.explorer
}

export type ExplorerLinks = {
  getTxUrl: (hash: string | null | undefined) => string | undefined
  getPartyUrl: (key: string | null | undefined) => string | undefined
  getBlockUrl: (number: string | null | undefined) => string | undefined
}
export const useExplorerLinks = (): ExplorerLinks => {
  const explorerUrl = useExplorerUrl()
  const base = explorerUrl?.trim().replace(/\/*$/, '')
  const canCreateLink = (value: string | null | undefined) =>
    base && value && value.length > 0
  return {
    getTxUrl: (hash: string | null | undefined) =>
      canCreateLink(hash) ? `${base}/txs/${hash}` : undefined,
    getPartyUrl: (key: string | null | undefined) =>
      canCreateLink(key) ? `${base}/parties/${key}` : undefined,
    getBlockUrl: (number: string | null | undefined) =>
      canCreateLink(number) ? `${base}/blocks/${number}` : undefined,
  }
}
