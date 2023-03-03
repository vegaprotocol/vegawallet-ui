import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { requestPassphrase } from '../components/passphrase-modal'
import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import type { Connection } from '../contexts/global/global-context'
import { useGlobal } from '../contexts/global/global-context'
import { indexBy } from '../lib/index-by'

export const useOpenWallet = () => {
  const navigate = useNavigate()
  const { dispatch, client, state } = useGlobal()

  const getWalletData = useCallback(
    async (wallet: string, passphrase: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_w, { keys = [] }, { permissions }, { activeConnections }] =
        await Promise.all([
          client.DescribeWallet({ wallet, passphrase }),
          client.ListKeys({ wallet, passphrase }),
          client.ListPermissions({ wallet, passphrase }),
          client.ListConnections({}),
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

      const walletConnections = activeConnections.reduce<string[]>(
        (acc, connection) => {
          if (connection.wallet === wallet) {
            acc.push(connection.hostname)
          }
          return acc
        },
        []
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
            active: walletConnections.includes(hostname),
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
        connections: permissionDetails.reduce<Record<string, Connection>>(
          indexBy('hostname'),
          {}
        ),
      })
      dispatch({
        type: 'ACTIVATE_WALLET',
        wallet,
      })
    },
    [client, dispatch]
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
    [getWalletData, state, navigate, dispatch]
  )

  return { open, getWalletData }
}
