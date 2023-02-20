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
          Potential compatibility issue
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

const getIsCompatible = ({
  features,
  networkData,
  telemetry,
}: GetShouldOpenProps) => {
  return (
    telemetry?.consentAsked === true &&
    networkData?.isCompatible !== false &&
    features.NETWORK_COMPATIBILITY_WARNING === true
  )
}

export const NetworkCompatibilityDialog = () => {
  const { state, service, dispatch, features, actions } = useGlobal()
  const { supportedVersion, networkData } = useMemo(
    () => findNetworkData(state.currentNetwork, state.version),
    [state.currentNetwork, state.version]
  )
  const compatibleNetworksList = useMemo(() => {
    const checkList = state.version?.networksCompatibility || []
    return checkList.reduce<string[]>(addCompatibleNetwork, [])
  }, [state.version])

  const [subview, setSubview] = useState<Subview>(null)

  useEffect(() => {
    const isCompatible = getIsCompatible({
      features,
      networkData,
      telemetry: state.config?.telemetry,
    })
    dispatch({
      type: 'SET_NETWORK_COMPATIBILITY',
      isCompatible,
    })
  }, [
    dispatch,
    supportedVersion,
    networkData,
    features,
    state.isNetworkCompatibilityModalOpen,
    state.config?.telemetry,
  ])

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
        dispatch({
          type: 'SET_NETWORK_COMPATIBILITY_MODAL',
          open: false,
        })
        setSubview(null)
      }
    },
    [dispatch, actions, setSubview]
  )

  const handleAddNetwork = useCallback(
    async (network: string) => {
      dispatch({
        type: 'SET_NETWORK_COMPATIBILITY_MODAL',
        open: false,
      })
      setSubview(null)
      const version = await service.GetVersion()
      dispatch({
        type: 'SET_VERSION',
        version,
      })

      dispatch(actions.changeNetworkAction(network))
    },
    [dispatch, actions, service, setSubview]
  )

  const title = useMemo(() => getTitle(subview), [subview])

  if (!networkData) {
    return null
  }

  return (
    <Dialog
      size="lg"
      data-testid="network-compatibility-dialog"
      open={state.isNetworkCompatibilityModalOpen}
      title={title}
    >
      {subview === null && (
        <div className="p-[20px]">
          {!networkData.network && (
            <p className="mb-[20px]">
              Couldn't retrieve the network compatibility information from the
              nodes you are trying to connect to.
            </p>
          )}
          {networkData.network && (
            <div>
              <p className="mb-[20px] hidden">
                This software (<code>vega@{supportedVersion}</code>) and the
                network{' '}
                <code className="bg-dark-200 py-[1px] px-[5px]">
                  {networkData.network}
                </code>{' '}
                (<code>vega@{networkData.retrievedVersion}</code>) are not
                running on the same version, you may encounter compatibility
                issues, such as transactions not being seen by the network.
              </p>
              <p className="mb-[20px]">
                This software and the network{' '}
                <code className="bg-dark-200 py-[1px] px-[5px]">
                  {networkData.network}
                </code>{' '}
                are relying on different network software versions. You may
                encounter compatibility issues, such as transactions not being
                seen by the network.
              </p>
              <p>
                The network{' '}
                <code className="bg-dark-200 py-[1px] px-[5px]">
                  {networkData.network}
                </code>{' '}
                is currently running on version "
                <code>{networkData.retrievedVersion}</code>", while this
                software is running on version "<code>{supportedVersion}</code>
                ".
              </p>
            </div>
          )}
          <ButtonGroup inline className="py-[20px]">
            {networkData.network && (
              <AnchorButton
                data-testid="network-compatibility-release"
                href="https://github.com/vegaprotocol/vegawallet-desktop/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get wallet app for ${networkData.retrievedVersion}
              </AnchorButton>
            )}
            {compatibleNetworksList.length === 0 && (
              <Button
                data-testid="network-compatibility-change"
                onClick={() => setSubview('change')}
              >
                Change network
              </Button>
            )}
          </ButtonGroup>
          <ButtonUnstyled
            data-testid="network-compatibility-continue"
            onClick={() =>
              dispatch({
                type: 'SET_NETWORK_COMPATIBILITY_MODAL',
                open: false,
              })
            }
          >
            Continue with existing network
          </ButtonUnstyled>
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
