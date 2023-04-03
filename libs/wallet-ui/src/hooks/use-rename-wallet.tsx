import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGlobal } from '../contexts/global/global-context'
import { Paths } from '../routes'

export const useRenameWallet = () => {
  const navigate = useNavigate()
  const { dispatch, client } = useGlobal()

  const rename = useCallback(
    async (from: string, to: string) => {
      await client.RenameWallet({
        wallet: from,
        newName: to,
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

      navigate(Paths.Wallet.Wallet(encodeURIComponent(to)))
    },
    [dispatch, client, navigate]
  )

  return {
    rename,
  }
}
