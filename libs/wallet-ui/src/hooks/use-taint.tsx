import { useCallback, useState, useMemo } from 'react'

import { requestPassphrase } from '../components/passphrase-modal'
import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import type { GlobalActions } from '../contexts/global/global-actions'
import type { GlobalDispatch } from '../contexts/global/global-context'
import { useGlobal } from '../contexts/global/global-context'

export const useTaint = (
  dispatch: GlobalDispatch,
  actions: GlobalActions,
  publicKey?: string,
  wallet?: string
) => {
  const { service, client } = useGlobal()
  const logger = useMemo(() => service.GetLogger('Taint'), [service])
  const [loading, setLoading] = useState(false)

  const taint = useCallback(async () => {
    setLoading(true)
    try {
      if (!publicKey || !wallet) {
        return
      }

      const passphrase = await requestPassphrase()
      await client.TaintKey({
        wallet,
        passphrase,
        publicKey: publicKey,
      })

      const keypair = await client.DescribeKey({
        wallet,
        passphrase,
        publicKey,
      })

      dispatch(actions.updateKeyPairAction(wallet, keypair))

      setLoading(false)
      AppToaster.show({
        message: `This key has been tainted`,
        intent: Intent.SUCCESS,
      })
    } catch (err) {
      setLoading(false)
      AppToaster.show({ message: `${err}`, intent: Intent.DANGER })
      logger.error(err)
    }
  }, [dispatch, client, logger, actions, publicKey, wallet])

  const untaint = useCallback(async () => {
    setLoading(true)
    try {
      if (!publicKey || !wallet) {
        return
      }

      const passphrase = await requestPassphrase()
      await client.UntaintKey({ wallet, passphrase, publicKey })

      const keypair = await client.DescribeKey({
        wallet,
        passphrase,
        publicKey,
      })

      dispatch(actions.updateKeyPairAction(wallet, keypair))

      setLoading(false)
      AppToaster.show({
        message: `This key has been untainted`,
        intent: Intent.SUCCESS,
      })
    } catch (err) {
      setLoading(false)
      AppToaster.show({ message: `${err}`, intent: Intent.DANGER })
      logger.error(err)
    }
  }, [dispatch, client, logger, actions, publicKey, wallet])

  return {
    loading,
    taint,
    untaint,
  }
}
