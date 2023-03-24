import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/button'
import { ButtonGroup } from '../../components/button-group'
import { Vega } from '../../components/icons'
import { Title } from '../../components/title'
import { useGlobal } from '../../contexts/global/global-context'
import { useVegaHome } from '../../hooks/use-vega-home'
import { Paths } from '..'
import { indexBy } from '../../lib/index-by'
import { useIsFairground } from '../../hooks/use-is-fairground'

export function Onboard() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const vegaHome = useVegaHome()

  const {
    dispatch,
    actions,
    service,
    client,
    state: { initNetworks, wallets },
  } = useGlobal()
  const isFairground = useIsFairground()
  const logger = useMemo(() => service.GetLogger('Onboard'), [service])

  const handleImportExistingWallet = async () => {
    try {
      setLoading(true)

      await service.InitialiseApp({ vegaHome })

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
      dispatch(actions.completeOnboardAction(() => navigate(Paths.Home)))
    } catch (err) {
      logger.error(err)
    }
  }

  const renderExistingMessage = () => {
    if (!Object.keys(wallets).length) {
      return null
    }

    return (
      <>
        <p className="mb-5">Existing wallets found</p>
        <ButtonGroup>
          <Button
            data-testid="use-existing-wallet"
            loading={isLoading}
            className="w-full"
            onClick={handleImportExistingWallet}
          >
            Use existing
          </Button>
        </ButtonGroup>
        <p className="my-5">OR</p>
      </>
    )
  }

  return (
    <div className="w-[545px] m-auto text-center pt-10">
      <Title className="m-0 mb-7 text-white">
        <Vega />
      </Title>
      {isFairground && (
        <p className="mb-5">
          This is a fairground build of the wallet, it is highly recommended you
          use a different wallet directory to your wallet on other networks to
          ensure full functionality. If you choose to use the same wallet
          directory, compatibility of the configuration files is not guaranteed.
          This can be changed in App settings.
        </p>
      )}
      {renderExistingMessage()}
      <ButtonGroup orientation="vertical" className="mb-4">
        <Button
          data-testid="create-new-wallet"
          onClick={() => navigate('/wallet-create')}
        >
          Create new wallet
        </Button>
        <Button
          data-testid="import-wallet"
          onClick={() => navigate('/wallet-import')}
        >
          Use recovery phrase
        </Button>
      </ButtonGroup>
    </div>
  )
}
