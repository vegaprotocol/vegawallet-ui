import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/button'
import { ButtonGroup } from '../../components/button-group'
import { Vega } from '../../components/icons'
import { Title } from '../../components/title'
import { useGlobal } from '../../contexts/global/global-context'
import { useVegaHome } from '../../hooks/use-vega-home'
import { Paths } from '..'

export function Onboard() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const vegaHome = useVegaHome()

  const {
    dispatch,
    actions,
    service,
    client,
    state: { networks, wallets },
  } = useGlobal()

  const logger = useMemo(() => service.GetLogger('Onboard'), [service])

  const handleImportExistingWallet = async () => {
    try {
      setLoading(true)

      await service.InitialiseApp({ vegaHome })

      // If use doesnt have networks go to the import network section on onboarding
      // otherwise go to home to complete onboarding
      if (networks.length) {
        const config = await service.GetAppConfig()
        const defaultNetwork = config.defaultNetwork
          ? config.defaultNetwork
          : networks[0]
        const defaultNetworkConfig = await client.DescribeNetwork({
          name: defaultNetwork,
        })
        dispatch({
          type: 'ADD_NETWORKS',
          networks,
          network: defaultNetwork,
          networkConfig: defaultNetworkConfig,
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
        <p className="mb-[20px]">Existing wallets found</p>
        <ButtonGroup>
          <Button
            loading={isLoading}
            className="w-full"
            onClick={handleImportExistingWallet}
          >
            Use existing
          </Button>
        </ButtonGroup>
        <p className="my-[20px]">OR</p>
      </>
    )
  }

  return (
    <div className="w-[545px] m-auto text-center pt-[82px]">
      <Title className="m-0 mb-[30px] text-white">
        <Vega />
      </Title>
      {renderExistingMessage()}
      <ButtonGroup orientation="vertical" className="mb-[20px]">
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
