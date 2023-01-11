import { useMemo, useState, useCallback } from 'react'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import { AppStatus, useGlobal } from '../contexts/global/global-context'
import { useVegaHome } from './use-vega-home'

export function useImportWallet() {
  const vegaHome = useVegaHome()
  const { actions, service, client, dispatch, state } = useGlobal()
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
        if (state.status !== AppStatus.Initialised) {
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
            passphrase: values.passphrase,
            publicKey: resp.key.publicKey,
          })

          dispatch({
            type: 'ADD_WALLET',
            wallet: values.wallet,
            key: keypair,
          })
          AppToaster.show({
            message: `Wallet imported to: ${resp.wallet.filePath}`,
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
    [dispatch, actions, logger, service, client, state.status, vegaHome]
  )

  return {
    response,
    submit,
    error,
  }
}
