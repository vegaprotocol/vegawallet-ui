import type { WalletModel, WalletClient } from '@vegaprotocol/wallet-admin'

import type { Service, AppConfig } from '../../types/service'
import type { Logger } from '../../types/logger'
import { requestPassphrase } from '../../components/passphrase-modal'
import { AppToaster } from '../../components/toaster'
import { DataSources } from '../../config/data-sources'
import { Intent } from '../../config/intent'
import type { NetworkPreset } from '../../lib/networks'
import { fetchNetworkPreset } from '../../lib/networks'
import type { GlobalDispatch, GlobalState } from './global-context'
import { DrawerPanel, ServiceState } from './global-context'
import type { GlobalAction } from './global-reducer'

type ServiceAction = {
  getState: () => GlobalState
  service: Service
  logger: Logger
  dispatch: GlobalDispatch
}

const stopService = async ({ logger, service, dispatch }: ServiceAction) => {
  logger.debug('StopService')
  const { isRunning } = await service.GetCurrentServiceInfo()
  if (!isRunning) {
    dispatch({
      type: 'SET_SERVICE_STATUS',
      status: ServiceState.Stopped,
    })
    return
  }
  try {
    dispatch({
      type: 'SET_SERVICE_STATUS',
      status: ServiceState.Stopping,
    })
    await service.StopService()
  } catch (err) {
    dispatch({
      type: 'SET_SERVICE_STATUS',
      status: ServiceState.Error,
    })
    logger.error(err)
    AppToaster.show({
      message: `${err}`,
      intent: Intent.DANGER,
    })
  }
}

const startService = async ({
  logger,
  getState,
  service,
  dispatch,
}: ServiceAction) => {
  logger.debug('StartService')
  const state = getState()
  const { isRunning } = await service.GetCurrentServiceInfo()
  if (isRunning) {
    dispatch({
      type: 'SET_SERVICE_STATUS',
      status: ServiceState.Started,
    })
    return
  }
  try {
    if (state.network && state.networkConfig) {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Loading,
      })
      await service.StartService({ network: state.network })
    }
  } catch (err) {
    if (typeof err === 'string' && err.includes('already served')) {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Started,
      })
      return
    }
    logger.error(err)
    dispatch({
      type: 'SET_SERVICE_STATUS',
      status: ServiceState.Error,
    })
    AppToaster.show({
      message: `${err}`,
      intent: Intent.DANGER,
    })
  }
}

const getNetworks = async (client: WalletClient, preset?: NetworkPreset) => {
  const networks = await client.ListNetworks()

  if (preset && (!networks.networks || networks.networks.length === 0)) {
    await client.ImportNetwork({
      name: preset.name,
      url: preset.configFileUrl,
      filePath: '',
      overwrite: true,
    })

    return client.ListNetworks()
  }

  return networks
}

const getDefaultNetwork = (
  config: AppConfig,
  networks: WalletModel.ListNetworksResult
) => {
  if (config.defaultNetwork) {
    return config.defaultNetwork
  }
  return networks.networks?.[0]
}

export function createActions(service: Service, client: WalletClient) {
  const logger = service.GetLogger('GlobalActions')

  const actions = {
    initAppAction() {
      return async (dispatch: GlobalDispatch) => {
        try {
          logger.debug('StartApp')

          const isInit = await service.IsAppInitialised()

          if (!isInit) {
            const existingConfig =
              await service.SearchForExistingConfiguration()
            dispatch({ type: 'START_ONBOARDING', existing: existingConfig })
            return
          }

          // else continue with app setup, get wallets/networks
          logger.debug('InitApp')

          const [config, presets, presetsInternal] = await Promise.all([
            service.GetAppConfig(),
            fetchNetworkPreset(DataSources.NETWORKS, logger),
            fetchNetworkPreset(DataSources.NETWORKS_INTERNAL, logger),
          ])

          if (config.telemetry.enabled) {
            service.EnableTelemetry()
          }

          // should now have an app config
          const [wallets, networks] = await Promise.all([
            client.ListWallets(),
            getNetworks(client, presets[0]),
          ])

          const defaultNetwork = getDefaultNetwork(config, networks)

          const defaultNetworkConfig = defaultNetwork
            ? await client.DescribeNetwork({
                name: defaultNetwork,
              })
            : null

          dispatch({
            type: 'INIT_APP',
            config: config,
            wallets: wallets.wallets ?? [],
            network: defaultNetwork ?? '',
            networks: networks.networks ?? [],
            networkConfig: defaultNetworkConfig,
            presetNetworks: presets,
            presetNetworksInternal: presetsInternal,
          })
        } catch (err) {
          dispatch({ type: 'INIT_APP_FAILED' })
          logger.error(err)
        }
      }
    },

    updateTelemetry(telemetry: { enabled: boolean; consentAsked: boolean }) {
      return async (dispatch: GlobalDispatch, getState: () => GlobalState) => {
        if (telemetry.enabled) {
          service.EnableTelemetry()
        }

        logger.debug('UpdateTelemetry')
        try {
          const { config } = getState()
          if (config) {
            const newConfig = { ...config, telemetry }
            await service.UpdateAppConfig(newConfig)
            dispatch({
              type: 'SET_CONFIG',
              config: newConfig,
            })
          }
        } catch (err) {
          AppToaster.show({ message: `${err}`, intent: Intent.DANGER })
          logger.error(err)
        }
      }
    },

    completeOnboardAction(onComplete: () => void) {
      return async (dispatch: GlobalDispatch, getState: () => GlobalState) => {
        await startService({
          getState,
          logger,
          dispatch,
          service,
        })
        dispatch({
          type: 'COMPLETE_ONBOARD',
        })
        onComplete()
      }
    },

    addWalletAction(
      wallet: string,
      key: WalletModel.DescribeKeyResult
    ): GlobalAction {
      return { type: 'ADD_WALLET', wallet, key }
    },

    addKeypairAction(wallet: string) {
      return async (dispatch: GlobalDispatch) => {
        logger.debug('AddKeyPair')
        try {
          const passphrase = await requestPassphrase()
          const res = await client.GenerateKey({
            wallet,
            passphrase,
            metadata: [],
          })

          const keypair = await client.DescribeKey({
            wallet,
            passphrase,
            publicKey: res.publicKey ?? '',
          })

          dispatch({
            type: 'ADD_KEYPAIR',
            wallet,
            keypair,
          })
        } catch (err) {
          if (err !== 'dismissed') {
            AppToaster.show({ message: `${err}`, intent: Intent.DANGER })
            logger.error(err)
          }
        }
      }
    },

    updateKeyPairAction(
      wallet: string,
      keypair: WalletModel.DescribeKeyResult
    ): GlobalAction {
      return { type: 'UPDATE_KEYPAIR', wallet, keypair }
    },

    setDrawerAction(
      isOpen: boolean,
      panel?: DrawerPanel | null,
      editingNetwork?: string
    ): GlobalAction {
      return {
        type: 'SET_DRAWER',
        state: {
          isOpen,
          panel: panel ?? DrawerPanel.Network,
          editingNetwork: editingNetwork ?? null,
        },
      }
    },

    setPassphraseModalAction(open: boolean): GlobalAction {
      return { type: 'SET_PASSPHRASE_MODAL', open }
    },

    changeWalletAction(wallet: string): GlobalAction {
      return {
        type: 'CHANGE_WALLET',
        wallet,
      }
    },

    // Network actions

    changeNetworkAction(network: string) {
      return async (dispatch: GlobalDispatch, getState: () => GlobalState) => {
        logger.debug('ChangeNetwork')
        const state = getState()

        try {
          await stopService({
            getState,
            logger,
            dispatch,
            service,
          })

          if (state.config) {
            await service.UpdateAppConfig({
              ...state.config,
              defaultNetwork: network,
            })
          }

          const config = await client.DescribeNetwork({ name: network })

          dispatch({
            type: 'CHANGE_NETWORK',
            network,
            config,
          })

          await startService({
            getState,
            logger,
            dispatch,
            service,
          })
        } catch (err) {
          AppToaster.show({
            message: `${err}`,
            intent: Intent.DANGER,
          })
          logger.error(err)
        }
      }
    },

    updateNetworkConfigAction(
      editingNetwork: string,
      networkConfig: WalletModel.DescribeNetworkResult
    ) {
      return async (dispatch: GlobalDispatch, getState: () => GlobalState) => {
        const state = getState()

        logger.debug('UpdateNetworkConfig')

        // Stop main REST service if you are editing the active network config
        if (state.network === editingNetwork) {
          await stopService({
            getState,
            logger,
            dispatch,
            service,
          })
        }

        try {
          const isSuccessful = await client.UpdateNetwork(networkConfig)

          if (isSuccessful) {
            AppToaster.show({
              message: 'Configuration saved',
              intent: Intent.SUCCESS,
            })

            const updatedNetwork = await client.DescribeNetwork({
              name: networkConfig.name,
            })

            dispatch({ type: 'UPDATE_NETWORK_CONFIG', config: updatedNetwork })
          } else {
            AppToaster.show({
              message: 'Error: Failed updating network configuration.',
              intent: Intent.DANGER,
            })
          }
        } catch (err) {
          AppToaster.show({ message: `${err}`, intent: Intent.DANGER })
          logger.error(err)
        }

        if (state.network === editingNetwork) {
          await startService({
            getState,
            logger,
            dispatch,
            service,
          })
        }
      }
    },

    addNetworkAction(
      network: string,
      config: WalletModel.DescribeNetworkResult
    ) {
      return async (dispatch: GlobalDispatch, getState: () => GlobalState) => {
        const state = getState()

        dispatch({
          type: 'ADD_NETWORK',
          network,
          config,
        })

        if (!state.network) {
          dispatch(actions.changeNetworkAction(network))
        }
      }
    },

    removeNetwork(network: string) {
      return async (dispatch: GlobalDispatch, getState: () => GlobalState) => {
        const state = getState()
        logger.debug('RemoveNetwork')
        try {
          if (state.network === network) {
            await stopService({
              getState,
              logger,
              dispatch,
              service,
            })
          }
          await client.RemoveNetwork({ network })
          dispatch({
            type: 'REMOVE_NETWORK',
            network,
          })
          AppToaster.show({
            message: `Successfully removed network "${network}".`,
            intent: Intent.SUCCESS,
          })
        } catch (err) {
          logger.error(err)
          AppToaster.show({
            message: `Error removing network "${network}".`,
            intent: Intent.DANGER,
          })
        }
      }
    },

    startServiceAction() {
      return async (dispatch: GlobalDispatch, getState: () => GlobalState) => {
        await startService({
          logger,
          getState,
          service,
          dispatch,
        })
      }
    },

    stopServiceAction() {
      return async (dispatch: GlobalDispatch, getState: () => GlobalState) => {
        await stopService({
          logger,
          getState,
          service,
          dispatch,
        })
      }
    },
  }

  return actions
}

export type GlobalActions = ReturnType<typeof createActions>
