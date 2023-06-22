import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@vegaprotocol/ui-toolkit'

import { ButtonGroup } from '../../components/button-group'
import { Vega } from '../../components/icons'
import { useGlobal } from '../../contexts/global/global-context'
import { useVegaHome } from '../../hooks/use-vega-home'
import { Paths } from '..'
import { indexBy } from '../../lib/index-by'
import { Spinner } from '../../components/spinner'
import { OnboardingPage } from '../../components/page'

export function OnboardStart() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const vegaHome = useVegaHome()

  const {
    dispatch,
    actions,
    service,
    client,
    features,
    state: { initNetworks, wallets },
  } = useGlobal()
  const logger = useMemo(() => service.GetLogger('Onboard'), [service])

  const handleImportExistingWallet = async () => {
    try {
      setLoading(true)

      if (!(await service.IsAppInitialised())) {
        await service.InitialiseApp({ vegaHome })
      }
      // If use doesn't have networks go to the import network section on onboarding
      // otherwise go to home to complete onboarding
      if (initNetworks?.length) {
        const config = await service.GetAppConfig()
        const currentNetwork = config.defaultNetwork
          ? config.defaultNetwork
          : initNetworks[0]

        const networks = await Promise.all(
          initNetworks.map((name) => client.DescribeNetwork({ name }))
        )

        dispatch({
          type: 'ADD_NETWORKS',
          networks: networks.reduce(indexBy('name'), {}),
        })
        dispatch({
          type: 'CHANGE_NETWORK',
          network: currentNetwork,
        })
      }

      // Found wallets and networks, go to the main app
      await dispatch(
        actions.completeOnboardAction(features.NETWORK_MODE, () =>
          navigate(Paths.Home)
        )
      )
    } catch (err) {
      logger.error(err)
    }
  }

  return (
    <OnboardingPage title={<Vega />}>
      {Object.keys(wallets).length ? (
        <>
          <p className="mb-5 text-base">Existing wallets found</p>
          <ButtonGroup>
            <Button
              data-testid="use-existing-wallet"
              className="w-full"
              onClick={handleImportExistingWallet}
            >
              {isLoading ? <Spinner /> : 'Use existing'}
            </Button>
          </ButtonGroup>
          <p className="my-5 text-base">OR</p>
        </>
      ) : undefined}
      <ButtonGroup orientation="vertical" className="mb-4">
        <Button
          data-testid="create-new-wallet"
          onClick={() => navigate(Paths.Onboard.WalletCreate)}
        >
          Create new wallet
        </Button>
        <Button
          data-testid="import-wallet"
          onClick={() => navigate(Paths.Onboard.WalletImport)}
        >
          Use recovery phrase
        </Button>
      </ButtonGroup>
    </OnboardingPage>
  )
}
