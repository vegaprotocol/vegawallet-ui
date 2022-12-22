import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Splash } from '../../components/splash'
import { Title } from '../../components/title'
import { WalletImportForm } from '../../components/wallet-import-form'
import { useImportWallet } from '../../hooks/use-import-wallet'
import { Paths } from '../'

export const WalletImport = () => {
  const navigate = useNavigate()
  const { submit, response } = useImportWallet()

  useEffect(() => {
    if (response) {
      navigate(Paths.Home)
    }
  }, [response, navigate])

  return (
    <Splash>
      <Title className="mt-0 text-white text-center">Import wallet</Title>
      <WalletImportForm submit={submit} cancel={() => navigate(Paths.Home)} />
    </Splash>
  )
}
