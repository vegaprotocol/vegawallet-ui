import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { requestPassphrase } from '../components/passphrase-modal'
import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import { useGlobal } from '../contexts/global/global-context'

export const useOpenWallet = () => {
  const navigate = useNavigate()
  const { dispatch, client, state } = useGlobal()

  const getWalletData = useCallback(
    async (wallet: string, passphrase: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_w, { keys = [] }, { permissions }] = await Promise.all([
        client.DescribeWallet({ wallet, passphrase }),
        client.ListKeys({ wallet, passphrase }),
        client.ListPermissions({ wallet, passphrase }),
      ])

      const keysWithMeta = await Promise.all(
        keys.map((key) =>
          client.DescribeKey({
            wallet,
            passphrase,
            publicKey: key.publicKey ?? '',
          })
        )
      )

      const permissionDetails = await Promise.all(
        Object.keys(permissions).map(async (hostname) => {
          const result = await client.DescribePermissions({
            wallet,
            passphrase,
            hostname,
          })
          return {
            hostname,
            active: false,
            permissions: result.permissions,
          }
        })
      )

      dispatch({
        type: 'SET_KEYPAIRS',
        wallet,
        keypairs: keysWithMeta,
      })
      dispatch({
        type: 'SET_CONNECTIONS',
        wallet,
        connections: permissionDetails,
      })
      dispatch({
        type: 'ACTIVATE_WALLET',
        wallet,
      })
    },
    [state, client, dispatch]
  )

  const open = useCallback(
    async (wallet: string) => {
      const w = state.wallets[wallet]

      if (w?.auth) {
        dispatch({
          type: 'ACTIVATE_WALLET',
          wallet,
        })
        navigate(`/wallet/${encodeURIComponent(wallet)}`)
        return
      }

      const passphrase = await requestPassphrase()

      try {
        await getWalletData(wallet, passphrase)
        navigate(`/wallet/${encodeURIComponent(wallet)}`)
      } catch (err) {
        AppToaster.show({
          intent: Intent.DANGER,
          message: `${err}`,
        })
      }
    },
    [getWalletData, navigate, state, client, dispatch]
  )

  return { open, getWalletData }
}
