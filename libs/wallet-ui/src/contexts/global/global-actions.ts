import type { WalletModel, WalletAdmin } from '@vegaprotocol/wallet-admin'

import type { Service, AppConfig } from '../../types/service'
import type { Logger } from '../../types/logger'
import { requestPassphrase } from '../../components/passphrase-modal'
import { AppToaster } from '../../components/toaster'
import { Intent } from '../../config/intent'
import type { GlobalDispatch, GlobalState } from './global-context'
import { DrawerPanel, ServiceState } from './global-context'
import type { GlobalAction } from './global-reducer'
import { indexBy } from '../../lib/index-by'

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
  const res = await service.GetCurrentServiceInfo()

  console.log('SERVICE STATUS', res)
  if (res.isRunning) {
    if ('url' in res) {
      dispatch({
        type: 'SET_SERVICE_URL',
        url: res.url,
      })
    }
    dispatch({
      type: 'SET_SERVICE_STATUS',
      status: ServiceState.Started,
    })
    return
  }
  try {
    console.log('CURRENT NET:', state.currentNetwork)
    if (state.currentNetwork) {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Loading,
      })
      await service.StartService({ network: state.currentNetwork })
      const res = await service.GetCurrentServiceInfo()
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Started,
      })
      if ('url' in res) {
        dispatch({
          type: 'SET_SERVICE_URL',
          url: res.url,
        })
      }
      console.log('STARTED SERVICE ON', res)
    }
  } catch (err) {
    console.log('START SERVICE ERROR!', err)
    if (typeof err === 'string' && err.includes('already running')) {
      const res = await service.GetCurrentServiceInfo()
      if ('url' in res) {
        dispatch({
          type: 'SET_SERVICE_URL',
          url: res.url,
        })
      }
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

const isMainnet = (config: WalletModel.DescribeNetworkResult) => {
  return !!config.metadata?.find(
    ({ key, value }) => key === 'network' && value === 'mainnet'
  )
}

const compileNetworks = (
  config: AppConfig,
  networkConfigs: WalletModel.DescribeNetworkResult[]
) => {
  const networks = networkConfigs.reduce(indexBy('name'), {})

  const currentNetwork =
    config.defaultNetwork ||
    // @TODO: remove this ugly nonsense when metadata is fixed on the backend
    (networks['mainnet1'] && 'mainnet1') ||
    networkConfigs.find(isMainnet)?.name ||
    networkConfigs[0]?.name ||
    null

  return {
    currentNetwork,
    networks,
  }
}

export function createActions(service: Service, client: WalletAdmin) {
  const logger = service.GetLogger('GlobalActions')

  const actions = {
    initAppAction() {
      return async (dispatch: GlobalDispatch) => {
        try {
          logger.debug('StartApp')

          await service.StartupBackend()
          const isInit = await service.IsAppInitialised()

          if (!isInit) {
            const existingConfig =
              await service.SearchForExistingConfiguration()
            dispatch({ type: 'START_ONBOARDING', existing: existingConfig })
            return
          }

          // else continue with app setup, get wallets/networks
          logger.debug('InitApp')

          const config = await service.GetAppConfig()

          if (config.telemetry.enabled) {
            service.EnableTelemetry()
          }

          // should now have an app config
          const [wallets, networkNames] = await Promise.all([
            client.ListWallets(),
            client.ListNetworks(),
          ])

          const networkConfigs = await Promise.all(
            networkNames.networks
              .filter(({ name }) => !!name)
              .map(({ name }) =>
                client.DescribeNetwork({ name: name as string })
              )
          )

          const { currentNetwork, networks } = compileNetworks(
            config,
            networkConfigs
          )

          dispatch({
            type: 'INIT_APP',
            config: config,
            wallets: wallets.wallets ?? [],
            currentNetwork,
            networks,
          })
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : typeof err === 'string'
              ? err
              : undefined
          dispatch({ type: 'INIT_APP_FAILED', message })
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

    setDrawerAction(
      isOpen: boolean,
      panel?: DrawerPanel | null,
      selectedNetwork?: string
    ): GlobalAction {
      return {
        type: 'SET_DRAWER',
        state: {
          isOpen,
          panel: panel ?? DrawerPanel.Network,
          selectedNetwork: selectedNetwork ?? null,
        },
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

          dispatch({
            type: 'CHANGE_NETWORK',
            network,
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
        if (state.currentNetwork === editingNetwork) {
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

        if (state.currentNetwork === editingNetwork) {
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
          config,
        })

        if (!state.currentNetwork) {
          dispatch(actions.changeNetworkAction(network))
        }
      }
    },

    removeNetwork(network: string) {
      return async (dispatch: GlobalDispatch, getState: () => GlobalState) => {
        const state = getState()
        logger.debug('RemoveNetwork')
        try {
          if (state.currentNetwork === network) {
            await stopService({
              getState,
              logger,
              dispatch,
              service,
            })
          }
          await client.RemoveNetwork({ name: network })
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
