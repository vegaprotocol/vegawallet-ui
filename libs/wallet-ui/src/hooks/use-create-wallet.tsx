import { useMemo, useCallback, useState } from 'react'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import { AppStatus, useGlobal } from '../contexts/global/global-context'
import { useVegaHome } from './use-vega-home'

export function useCreateWallet() {
  const vegaHome = useVegaHome()
  const { service, client, dispatch, actions, state, features } = useGlobal()
  const logger = useMemo(() => service.GetLogger('UseCreateWallet'), [service])
  const [response, setResponse] =
    useState<WalletModel.CreateWalletResult | null>(null)

  const submit = useCallback(
    async (values: { wallet: string; passphrase: string }) => {
      try {
        logger.debug('CreateWallet')
        const isInitialised = await service.IsAppInitialised()
        if (!isInitialised) {
          await service.InitialiseApp({ vegaHome })
        }

        const resp = await client.CreateWallet({
          wallet: values.wallet,
          passphrase: values.passphrase,
        })

        if (resp) {
          const keypair = await client.DescribeKey({
            wallet: values.wallet,
            publicKey: resp.key.publicKey,
          })

          if (state.status === AppStatus.Onboarding) {
            await dispatch(
              actions.completeOnboardAction(
                features.NETWORK_MODE,
                () => undefined
              )
            )
          }

          dispatch({
            type: 'ADD_WALLET',
            wallet: values.wallet,
            key: keypair,
            auth: true,
          })

          setResponse(resp)

          AppToaster.show({
            message: 'Wallet created!',
            intent: Intent.SUCCESS,
          })
        } else {
          AppToaster.show({ message: 'Error: Unknown', intent: Intent.DANGER })
        }
      } catch (err) {
        AppToaster.show({ message: `${err}`, intent: Intent.DANGER })
        logger.error(err)
      }
    },
    [
      logger,
      service,
      client,
      vegaHome,
      state.status,
      dispatch,
      features,
      actions,
    ]
  )

  return {
    response,
    submit,
  }
}
