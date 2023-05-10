import { useMemo, useState, useCallback } from 'react'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import { AppStatus, useGlobal } from '../contexts/global/global-context'
import { useVegaHome } from './use-vega-home'

export function useImportWallet() {
  const vegaHome = useVegaHome()
  const { service, client, dispatch, actions, state, features } = useGlobal()
  const logger = useMemo(() => service.GetLogger('UseImportWallet'), [service])
  const [response, setResponse] =
    useState<WalletModel.ImportWalletResult | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const submit = useCallback(
    async (values: {
      wallet: string
      passphrase: string
      recoveryPhrase: string
      version: number
    }) => {
      logger.debug('ImportWallet')
      try {
        const isInitialised = await service.IsAppInitialised()
        if (!isInitialised) {
          await service.InitialiseApp({ vegaHome })
        }

        const resp = await client.ImportWallet({
          wallet: values.wallet,
          passphrase: values.passphrase,
          recoveryPhrase: values.recoveryPhrase,
          keyDerivationVersion: Number(values.version),
        })

        if (resp && resp.key && resp.wallet) {
          setResponse(resp)

          const keypair = await client.DescribeKey({
            wallet: values.wallet,
            publicKey: resp.key.publicKey,
          })

          if (state.status === AppStatus.Onboarding) {
            dispatch(
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
          AppToaster.show({
            message: `Wallet imported`,
            intent: Intent.SUCCESS,
            timeout: 0,
          })
        } else {
          AppToaster.show({ message: 'Error: Unknown', intent: Intent.DANGER })
          setError(new Error('Something went wrong'))
        }
      } catch (err) {
        AppToaster.show({ message: `${err}`, intent: Intent.DANGER })
        setError(err as Error)
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
      actions,
      features,
    ]
  )

  return {
    response,
    submit,
    error,
  }
}
