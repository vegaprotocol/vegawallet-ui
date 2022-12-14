import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import { useGlobal } from '../contexts/global/global-context'
import { FormStatus, useFormState } from '../hooks/use-form-state'
import { Paths } from '../routes'

export const useRemoveWallet = () => {
  const navigate = useNavigate()
  const { dispatch, client, service } = useGlobal()
  const logger = useMemo(() => service.GetLogger('RemoveWallet'), [service])
  const [status, setStatus] = useFormState()
  const submit = useCallback(
    async (walletName: string) => {
      try {
        setStatus(FormStatus.Pending)
        logger.debug(`Removing: ${walletName}`)
        await client.RemoveWallet({ wallet: walletName })
        AppToaster.show({ message: 'Wallet removed', intent: Intent.SUCCESS })
        setStatus(FormStatus.Success)
        dispatch({ type: 'REMOVE_WALLET', wallet: walletName })
        navigate(Paths.Home)
      } catch (err) {
        AppToaster.show({
          message: 'Failed to remove wallet',
          intent: Intent.DANGER,
        })
        setStatus(FormStatus.Error)
        logger.error(err)
      }
    },
    [dispatch, navigate, client, logger, setStatus]
  )

  return { status, submit }
}
