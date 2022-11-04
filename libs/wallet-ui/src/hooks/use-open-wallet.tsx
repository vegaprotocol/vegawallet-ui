import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { requestPassphrase } from '../components/passphrase-modal'
import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import { useGlobal } from '../contexts/global/global-context'

export const useOpenWallet = () => {
  const navigate = useNavigate()
  const { dispatch, service, state } = useGlobal()

  const open = useCallback(
    async (wallet: string) => {
      const w = state.wallets[wallet]

      if (w?.auth) {
        dispatch({
          type: 'ACTIVATE_WALLET',
          wallet
        })
        navigate(`/wallet/${encodeURIComponent(wallet)}`)
        return
      }

      const passphrase = await requestPassphrase()

      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_w, { keys = [] }, { permissions }] = await Promise.all([
          service.WalletApi.DescribeWallet({ wallet, passphrase }),
          service.WalletApi.ListKeys({ wallet, passphrase }),
          service.WalletApi.ListPermissions({ wallet, passphrase })
        ])

        const keysWithMeta = await Promise.all(
          keys.map(key =>
            service.WalletApi.DescribeKey({
              wallet,
              passphrase,
              publicKey: key.publicKey ?? ''
            })
          )
        )

        const permissionDetails = await Promise.all(
          Object.keys(permissions).map(async hostname => {
            const result = await service.WalletApi.DescribePermissions({
              wallet,
              passphrase,
              hostname
            })
            return {
              hostname,
              active: false,
              permissions: result.permissions
            }
          })
        )

        dispatch({
          type: 'SET_KEYPAIRS',
          wallet,
          keypairs: keysWithMeta
        })
        dispatch({
          type: 'SET_CONNECTIONS',
          wallet,
          connections: permissionDetails
        })
        dispatch({
          type: 'ACTIVATE_WALLET',
          wallet
        })
        navigate(`/wallet/${encodeURIComponent(wallet)}`)
      } catch (err) {
        AppToaster.show({
          intent: Intent.DANGER,
          message: `${err}`
        })
      }
    },
    [navigate, state, service, dispatch]
  )

  return { open }
}
