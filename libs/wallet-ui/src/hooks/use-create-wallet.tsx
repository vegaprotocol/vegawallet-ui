import { useMemo, useCallback, useState } from 'react'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import { AppStatus, useGlobal } from '../contexts/global/global-context'
import { useVegaHome } from './use-vega-home'

export function useCreateWallet() {
  const vegaHome = useVegaHome()
  const { service, client, dispatch, state } = useGlobal()
  const logger = useMemo(() => service.GetLogger('UseCreateWallet'), [service])
  const [response, setResponse] =
    useState<WalletModel.CreateWalletResult | null>(null)

  const submit = useCallback(
    async (values: { wallet: string; passphrase: string }) => {
      try {
        logger.debug('CreateWallet')
        if (state.status !== AppStatus.Initialised) {
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
            passphrase: values.passphrase,
            publicKey: resp.key.publicKey,
          })

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
    [dispatch, logger, service, client, state.status, vegaHome]
  )

  return {
    response,
    submit,
  }
}
