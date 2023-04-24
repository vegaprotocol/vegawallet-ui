import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { WalletAdmin, WalletModel } from '@vegaprotocol/wallet-admin'

import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import type { Connection } from '../contexts/global/global-context'
import { useGlobal } from '../contexts/global/global-context'
import { requestPassphrase } from '../components/passphrase-modal'

const unlockWalletLoop = async (
  client: WalletAdmin,
  wallet: string,
  passphrase?: string
) => {
  const pass = passphrase || (await requestPassphrase())

  try {
    await client.UnlockWallet({
      wallet,
      passphrase: pass,
    })
  } catch (err) {
    AppToaster.show({
      intent: Intent.DANGER,
      message: `${err}`,
    })

    await unlockWalletLoop(client, wallet)
  }
}

const getConnections = (
  wallet: string,
  connections: WalletModel.ListConnectionsResult['activeConnections'],
  permissionDetails: Connection[]
) => {
  const mapping: Record<string, Connection> = {}

  connections.forEach((connection) => {
    if (wallet === connection.wallet) {
      mapping[connection.hostname] = {
        hostname: connection.hostname,
        active: true,
        permissions: {},
      }
    }
  })

  permissionDetails.forEach((permission) => {
    mapping[permission.hostname] = {
      hostname: permission.hostname,
      active: !!mapping[permission.hostname],
      permissions: permission.permissions,
    }
  })

  return mapping
}

export const useOpenWallet = () => {
  const navigate = useNavigate()
  const { dispatch, client, state } = useGlobal()

  const getWalletData = useCallback(
    async (wallet: string, passphrase?: string) => {
      if (!state.wallets[wallet]?.auth) {
        if (!passphrase) {
          await unlockWalletLoop(client, wallet)
        } else {
          await client.UnlockWallet({
            wallet,
            passphrase,
          })
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_w, { keys = [] }, { permissions }, { activeConnections }] =
        await Promise.all([
          client.DescribeWallet({ wallet }),
          client.ListKeys({ wallet }),
          client.ListPermissions({ wallet }),
          client.ListConnections({}),
        ])

      const keysWithMeta = await Promise.all(
        keys.map((key) =>
          client.DescribeKey({
            wallet,
            publicKey: key.publicKey ?? '',
          })
        )
      )

      const permissionDetails = await Promise.all(
        Object.keys(permissions).map(async (hostname) => {
          const result = await client.DescribePermissions({
            wallet,
            hostname,
          })
          return {
            hostname,
            active: false,
            permissions: result.permissions,
          }
        })
      )

      const connections = getConnections(
        wallet,
        activeConnections,
        permissionDetails
      )

      dispatch({
        type: 'SET_KEYPAIRS',
        wallet,
        keypairs: keysWithMeta,
      })
      dispatch({
        type: 'SET_CONNECTIONS',
        wallet,
        connections,
      })
      dispatch({
        type: 'ACTIVATE_WALLET',
        wallet,
      })
    },
    [client, state.wallets, dispatch]
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

      try {
        await getWalletData(wallet)
        navigate(`/wallet/${encodeURIComponent(wallet)}`)
      } catch (err) {
        if (err !== 'dismissed') {
          AppToaster.show({
            intent: Intent.DANGER,
            message: `${err}`,
          })
        }
      }
    },
    [getWalletData, state, navigate, dispatch]
  )

  return { open, getWalletData }
}
