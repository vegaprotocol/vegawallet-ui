import { useCallback, useEffect, useMemo, useState } from 'react'

import { Intent } from '../../config/intent'
import { useGlobal } from '../../contexts/global/global-context'
import type {
  Features,
  TelemetryConfig,
  GetVersionResponse,
  NetworkCompatibility,
} from '../../types'
import { AnchorButton, Button } from '../button'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'
import { Dialog } from '../dialog'
import { Warning } from '../icons/warning'
import { AppToaster } from '../toaster'
import { AddNetwork } from './add-network'
import { ChangeNetwork } from './choose-network'

const ONE_DAY = 86400000

const findNetworkData = (
  network: string | null,
  version: GetVersionResponse | null
) => {
  if (!network || !version?.backend) {
    return {}
  }

  return {
    supportedVersion: version.backend.version,
    networkData: version.networksCompatibility?.find(
      (n) => n.network === network
    ),
  }
}

const addCompatibleNetwork = (
  acc: string[],
  { isCompatible, network }: NetworkCompatibility
) => {
  if (isCompatible) {
    acc.push(network)
  }
  return acc
}

type Subview = 'change' | 'add' | null

const getTitle = (subview: Subview) => {
  switch (subview) {
    case 'add': {
      return 'Add network'
    }
    case 'change': {
      return 'Choose a compatible network'
    }
    default: {
      return (
        <>
          <Warning className="w-[20px] mr-[12px]" />
          Incompatible network
        </>
      )
    }
  }
}

type GetShouldOpenProps = {
  features: Features
  networkData?: NetworkCompatibility
  telemetry?: TelemetryConfig
}

const getShouldOpen = ({
  features,
  networkData,
  telemetry,
}: GetShouldOpenProps) => {
  return (
    telemetry?.consentAsked === true &&
    networkData?.isCompatible === false &&
    features.NETWORK_COMPATIBILITY_WARNING === true
  )
}

export const NetworkCompatibilityDialog = () => {
  const { state, service, dispatch, features, actions } = useGlobal()
  const { supportedVersion, networkData } = useMemo(
    () => findNetworkData(state.network, state.version),
    [state.network, state.version]
  )
  const compatibleNetworksList = useMemo(() => {
    const checkList = state.version?.networksCompatibility || []
    return checkList.reduce<string[]>(addCompatibleNetwork, [])
  }, [state.version])
  const [isOpen, setOpen] = useState(
    getShouldOpen({
      features,
      networkData,
      telemetry: state.config?.telemetry,
    })
  )
  const [subview, setSubview] = useState<Subview>(null)

  useEffect(() => {
    const shouldOpen = getShouldOpen({
      features,
      networkData,
      telemetry: state.config?.telemetry,
    })
    if (shouldOpen) {
      setOpen(true)
    }
  }, [supportedVersion, networkData, features, state.config?.telemetry])

  useEffect(() => {
    const getVersion = async () => {
      try {
        const version = await service.GetVersion()
        dispatch({
          type: 'SET_VERSION',
          version,
        })
      } catch (err) {
        AppToaster.show({
          intent: Intent.DANGER,
          message: 'There was an error checking for new releases',
        })
      }
    }

    const interval = setInterval(getVersion, ONE_DAY)
    getVersion()

    return () => {
      clearInterval(interval)
    }
  }, [service, dispatch])

  const handleChangeNetwork = useCallback(
    ({ network }: { network?: string }) => {
      if (network) {
        dispatch(actions.changeNetworkAction(network))
        setOpen(false)
        setSubview(null)
      }
    },
    [dispatch, actions, setOpen, setSubview]
  )

  const handleAddNetwork = useCallback(
    async (network: string) => {
      setOpen(false)
      setSubview(null)
      const version = await service.GetVersion()
      dispatch({
        type: 'SET_VERSION',
        version,
      })

      dispatch(actions.changeNetworkAction(network))
    },
    [dispatch, actions, service, setOpen, setSubview]
  )

  const title = useMemo(() => getTitle(subview), [subview])

  if (!networkData) {
    return null
  }

  return (
    <Dialog
      size="lg"
      data-testid="network-compatibility-dialog"
      open={isOpen}
      title={title}
    >
      {subview === null && (
        <div className="p-[20px]">
          <p className="mb-[20px]">
            Your selected network "<code>{networkData.network}</code>" is
            running on Vega <code>{networkData.retrievedVersion}</code>, however
            this app only supports networks running{' '}
            <code>{supportedVersion}</code>.
          </p>
          {compatibleNetworksList.length > 0 && (
            <p className="mb-[20px]">
              Download a compatible release or change network to continue.
            </p>
          )}
          {compatibleNetworksList.length === 0 && (
            <p className="mb-[20px]">
              Download a compatible release or add a compatible network to
              continue.
            </p>
          )}
          <ButtonGroup inline className="py-[20px]">
            <AnchorButton
              data-testid="network-compatibility-release"
              href="https://github.com/vegaprotocol/vegawallet-desktop/releases"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get a compatible release
            </AnchorButton>
            {compatibleNetworksList.length > 0 && (
              <Button
                data-testid="network-compatibility-change"
                onClick={() => setSubview('change')}
              >
                Change network
              </Button>
            )}
            {compatibleNetworksList.length === 0 && (
              <Button onClick={() => setSubview('add')}>Add network</Button>
            )}
          </ButtonGroup>
          <ButtonGroup inline>
            <ButtonUnstyled
              data-testid="network-compatibility-continue"
              onClick={() => setOpen(false)}
            >
              Continue with existing network
            </ButtonUnstyled>
          </ButtonGroup>
        </div>
      )}
      {subview === 'add' && (
        <AddNetwork
          onSubmit={handleAddNetwork}
          onCancel={() => setSubview(null)}
        />
      )}
      {subview === 'change' && (
        <ChangeNetwork
          networks={compatibleNetworksList}
          onSubmit={handleChangeNetwork}
          onCancel={() => setSubview(null)}
          onAddNetwork={() => setSubview('add')}
        />
      )}
    </Dialog>
  )
}
