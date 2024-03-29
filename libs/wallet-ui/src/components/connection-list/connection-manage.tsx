import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { Intent } from '../../config/intent'
import type { Wallet } from '../../contexts/global/global-context'
import { useGlobal } from '../../contexts/global/global-context'
import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'
import { AppToaster } from '../toaster'
import { PermissionSection } from './connection-manage-section'

type KeyItem = {
  key: string
  name: string
  value: boolean
}

export type Permission = 'none' | 'read' | 'read-all'

export type NormalizedPermission = {
  access: Permission
  allowedKeys: KeyItem[]
}

export type NormalizedPermissionMap = Record<
  keyof WalletModel.Permissions,
  Partial<NormalizedPermission>
>

type CompileResult = {
  permissions: NormalizedPermissionMap
}

const permissionAccessKeys: Array<keyof WalletModel.Permissions> = [
  'publicKeys',
]

const compileDefaultValues = (
  wallet: Wallet,
  walletPermissions?: Partial<WalletModel.Permissions>
): CompileResult => {
  if (!walletPermissions) {
    throw new Error(`Missing permissions for wallet ${wallet.name}.`)
  }

  const keyList = Object.keys(wallet.keypairs || {})

  const permissions = permissionAccessKeys.reduce<NormalizedPermissionMap>(
    (acc, key) => {
      const p = walletPermissions[key]
      const allowedKeys = keyList
        .filter((key) => !wallet.keypairs?.[key].isTainted)
        .map((key) => ({
          key,
          name: wallet.keypairs?.[key].name,
          value: p?.allowedKeys?.length ? p?.allowedKeys.includes(key) : true,
        }))

      return {
        ...acc,
        [key]: {
          access:
            p?.allowedKeys?.length === 0 && p.access === 'read'
              ? 'read-all'
              : p?.access,
          allowedKeys,
        },
      }
    },
    {} as NormalizedPermissionMap
  )

  return {
    permissions,
  }
}

const compileSubmissionData = (
  formData: NormalizedPermissionMap
): WalletModel.Permissions => {
  const dataKeys = Object.keys(formData) as Array<keyof WalletModel.Permissions>
  return dataKeys.reduce<WalletModel.Permissions>((acc, key) => {
    const p = formData[key] as NormalizedPermission
    return {
      ...acc,
      [key]: {
        access: p.access === 'read-all' ? 'read' : p.access,
        allowedKeys:
          p.access === 'none' || p.access === 'read-all'
            ? []
            : p.allowedKeys.reduce<string[]>((acc, item) => {
                if (item.value) {
                  acc.push(item.key)
                }
                return acc
              }, []),
      },
    }
  }, {} as WalletModel.Permissions)
}

type ManageDialogProps = {
  wallet: Wallet
  hostname: string
  onClose: () => void
}

export const ManagePermissions = ({
  wallet,
  hostname,
  onClose,
}: ManageDialogProps) => {
  const { client, dispatch } = useGlobal()
  const { permissions } = useMemo(
    () =>
      compileDefaultValues(wallet, wallet.connections?.[hostname]?.permissions),
    [wallet, hostname]
  )
  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...permissions,
    },
  })

  const onUpdate = useCallback(
    async (formData: NormalizedPermissionMap) => {
      try {
        const permissions = compileSubmissionData(formData)

        const { permissions: result } = await client.UpdatePermissions({
          wallet: wallet.name,
          hostname,
          permissions,
        })

        dispatch({
          type: 'SET_PERMISSONS',
          wallet: wallet.name,
          hostname,
          permissions: result,
        })

        onClose()
      } catch (err) {
        if (err !== 'dismissed') {
          AppToaster.show({
            message: `${err}`,
            intent: Intent.DANGER,
          })
        }
      }
    },
    [client, dispatch, wallet.name, hostname, onClose]
  )

  if (permissionAccessKeys.length === 0) {
    return (
      <div className="p-5">
        <p className="mb-[20px]">
          <code>{hostname}</code> has not yet requested for any permissions.
        </p>
        <ButtonGroup className="pb-[20px]">
          <button className="underline" onClick={onClose}>
            Cancel
          </button>
        </ButtonGroup>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <div className="p-[20px]">
        <div>
          {permissionAccessKeys.map((key) => (
            <PermissionSection
              key={key}
              title={
                <p className="mb-[20px]">
                  Choose how much access <code>{hostname}</code> has to the keys
                  in the wallet "<code>{wallet.name}</code>":
                </p>
              }
              accessType={key}
              control={control}
            />
          ))}
        </div>
      </div>
      <ButtonGroup inline className="px-[20px] pb-[20px]">
        <ButtonUnstyled onClick={onClose}>Cancel</ButtonUnstyled>
        <Button type="submit">Update</Button>
      </ButtonGroup>
    </form>
  )
}
