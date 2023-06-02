import { useNavigate } from 'react-router-dom'
import { Button } from '@vegaprotocol/ui-toolkit'

import { Page } from '../../components/page'
import { WalletCreateForm } from '../../components/wallet-create-form'
import { WalletCreateFormSuccess } from '../../components/wallet-create-form/wallet-create-form-success'
import { useCreateWallet } from '../../hooks/use-create-wallet'
import { Paths } from '../'

export const WalletCreate = () => {
  const navigate = useNavigate()
  const { response, submit } = useCreateWallet()

  return (
    <Page name="Create wallet">
      <>
        {response ? (
          <WalletCreateFormSuccess
            response={response}
            callToAction={
              <Button
                data-testid="create-wallet-success-cta"
                onClick={() => {
                  const path = response.wallet?.name
                    ? Paths.Wallet.Wallet(
                        encodeURIComponent(response.wallet.name)
                      )
                    : Paths.Home
                  navigate(path)
                }}
              >
                View wallet
              </Button>
            }
          />
        ) : (
          <WalletCreateForm submit={submit} cancel={() => navigate(-1)} />
        )}
      </>
    </Page>
  )
}
