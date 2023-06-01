import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { WalletImportForm } from '../../components/wallet-import-form'
import { useImportWallet } from '../../hooks/use-import-wallet'
import { Paths } from '../'
import { Page } from '../../components/page'

export const WalletImport = () => {
  const navigate = useNavigate()
  const { submit, response } = useImportWallet()

  useEffect(() => {
    if (response) {
      navigate(Paths.Home)
    }
  }, [response, navigate])

  return (
    <Page name="Import wallet">
      <WalletImportForm submit={submit} cancel={() => navigate(-1)} />
    </Page>
  )
}
