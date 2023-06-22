import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { WalletImportForm } from '../../components/wallet-import-form'
import { useImportWallet } from '../../hooks/use-import-wallet'
import { Paths } from '../'
import { Page } from '../../components/page'

export const WalletImport = () => {
  const navigate = useNavigate()
  const { submit, imported } = useImportWallet()

  useEffect(() => {
    if (!imported) {
      return
    }

    const path = Paths.Wallet.Wallet(encodeURIComponent(imported))

    navigate(path)
  }, [imported, navigate])

  return (
    <Page name="Import wallet">
      <WalletImportForm submit={submit} cancel={() => navigate(-1)} />
    </Page>
  )
}
