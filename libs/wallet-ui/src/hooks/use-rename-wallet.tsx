import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { requestPassphrase } from '../components/passphrase-modal'
import { useGlobal } from '../contexts/global/global-context'

export const useRenameWallet = () => {
  const navigate = useNavigate()
  const { dispatch, client } = useGlobal()

  const rename = useCallback(
    async (from: string, to: string) => {
      const passphrase = await requestPassphrase()

      await client.RenameWallet({
        wallet: from,
        newName: to,
        passphrase,
      })

      dispatch({
        type: 'RENAME_WALLET',
        from,
        to,
      })

      dispatch({
        type: 'ACTIVATE_WALLET',
        wallet: to,
      })

      navigate(`/wallet/${encodeURIComponent(to)}`)
    },
    [dispatch, client, navigate]
  )

  return {
    rename,
  }
}
