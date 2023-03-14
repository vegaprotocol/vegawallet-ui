import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Intent } from '../../config/intent'
import { useGlobal } from '../../contexts/global/global-context'
import type {
  Features,
  TelemetryConfig,
  GetVersionResponse,
  NetworkCompatibility,
} from '../../types'
import { Dialog } from '../dialog'
import { Warning } from '../icons/warning'
import { AppToaster } from '../toaster'
import { AddNetwork } from './add-network'
import { ChangeNetwork } from './choose-network'
import { NetworkCompatibilityCheckFailed } from './network-compatibility-check-failed'
import { NetworkIncompatible } from './network-incompatible'

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

const getTitle = (subview: Subview, wasAbleToVerifyCompatibility: boolean) => {
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
          <Warning
            className={classNames('w-[20px] mr-[12px]', {
              'text-danger-light': !wasAbleToVerifyCompatibility,
            })}
          />
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
      wasAbleToCheck: !!networkData?.retrievedVersion, // TODO this is a hack an implementation specific. We should have a flag in the version endpoint.
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

  const title = useMemo(
    () => getTitle(subview, state.wasAbleToVerifyCompatibility),
    [state.wasAbleToVerifyCompatibility, subview]
  )

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
      {subview === null ? (
        !state.isNetworkCompatible && state.wasAbleToVerifyCompatibility ? (
          <NetworkIncompatible
            networkData={networkData}
            supportedVersion={supportedVersion}
            onChangeNetwork={() => setSubview('change')}
            onContinue={() => {
              dispatch({
                type: 'SET_NETWORK_COMPATIBILITY_MODAL',
                open: false,
              })
            }}
          />
        ) : (
          <NetworkCompatibilityCheckFailed
            onContinue={() => {
              dispatch({
                type: 'SET_NETWORK_COMPATIBILITY_MODAL',
                open: false,
              })
            }}
            onChangeNetwork={() => setSubview('change')}
          />
        )
      ) : null}
    </Dialog>
  )
}
