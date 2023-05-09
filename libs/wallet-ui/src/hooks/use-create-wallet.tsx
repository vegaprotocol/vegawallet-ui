import { useMemo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import { AppStatus, useGlobal } from '../contexts/global/global-context'
import { useVegaHome } from './use-vega-home'
import { Paths } from '../routes'

export function useCreateWallet() {
  const navigate = useNavigate()
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
          setResponse(resp)

          const keypair = await client.DescribeKey({
            wallet: values.wallet,
            publicKey: resp.key.publicKey,
          })
          if (state.status === AppStatus.Onboarding) {
            const targetPath = Paths.Wallet.Wallet(
              encodeURIComponent(resp.wallet.name)
            )
            dispatch(
              actions.completeOnboardAction(features.NETWORK_MODE, () =>
                navigate(targetPath)
              )
            )
          }

          AppToaster.show({
            message: 'Wallet created!',
            intent: Intent.SUCCESS,
          })
          dispatch({
            type: 'ADD_WALLET',
            wallet: values.wallet,
            key: keypair,
          })
          dispatch({
            type: 'ACTIVATE_WALLET',
            wallet: values.wallet,
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
      navigate,
      actions,
    ]
  )

  return {
    response,
    submit,
  }
}
