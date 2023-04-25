import { useState, useMemo } from 'react'

import { Button } from '@vegaprotocol/ui-toolkit'
import { ButtonGroup } from '../../../button-group'
import { Tick } from '../../../icons/tick'
import { useGlobal } from '../../../../contexts/global/global-context'
import { PermissionTarget, PermissionType } from '../../../../types/interaction'
import type {
  PermissionTargetType,
  PermissionTypes,
} from '../../../../types/interaction'
import type { InteractionErrorType } from '../../views/error'
import { InteractionError } from '../../views/error'
import { InteractionSuccess } from '../../views/success'
import { InteractionHeader } from '../interaction-header'
import { Frame } from '../../../frame'
import { useOpenWallet } from '../../../../hooks/use-open-wallet'

export type PermissionRequestData = {
  traceID: string
  workflow: 'PERMISSION_REQUEST'
  error?: InteractionErrorType
  hostname?: string
  wallet?: string
  view?: 'success'
  permissions?: Record<PermissionTargetType, PermissionTypes>
}

export type PermissionRequestProps = {
  data: PermissionRequestData
  onUpdate: (q: PermissionRequestData) => void
  onClose: () => void
}

const getPermissionAction = (
  target: PermissionTargetType,
  type?: PermissionTypes
) => {
  switch (`${type}:${target}`) {
    case `${PermissionType.READ}:${PermissionTarget.PUBLIC_KEYS}`: {
      return [`See wallet's public keys`, 'Send transaction requests']
    }
    default: {
      return []
    }
  }
}

const getDisplayDetails = (data: PermissionRequestData): string[] => {
  const targets = Object.keys(data.permissions || {}) as PermissionTargetType[]

  return targets
    .map((target) => {
      return getPermissionAction(target, data.permissions?.[target])
    })
    .flat()
}

export const PermissionRequest = ({
  data,
  onUpdate,
  onClose,
}: PermissionRequestProps) => {
  const [isLoading, setLoading] = useState<'approve' | 'reject' | false>(false)
  const { service } = useGlobal()
  const { getWalletData } = useOpenWallet()
  const permissions = useMemo(() => {
    return getDisplayDetails(data)
  }, [data])

  const handleDecision = async (decision: boolean) => {
    setLoading(decision ? 'approve' : 'reject')
    try {
      await service.RespondToInteraction({
        traceID: data.traceID,
        name: 'DECISION',
        data: {
          approved: decision,
        },
      })

      if (data.wallet && data.hostname) {
        await getWalletData(data.wallet)
      }
    } catch (err: unknown) {
      onUpdate({
        ...data,
        error: {
          type: 'Backend error',
          error: `${err}`,
        },
      })
    }

    if (!decision) {
      onClose()
    }
  }

  if (data.error) {
    return (
      <InteractionError
        title="Failed to update permissions"
        type={data.error.type}
        message={data.error.error}
        onClose={onClose}
      />
    )
  }

  if (data.view === 'success') {
    return <InteractionSuccess title="Permissions updated" onClose={onClose} />
  }

  return (
    <div>
      <InteractionHeader hostname={data.hostname} />
      <Frame>
        <p data-testid="dapp-connect-access-list" className="mb-1">
          Allows this site to:
        </p>
        <ul>
          {permissions.map((permissionText, i) => (
            <li key={i} className="mb-1">
              <Tick className="w-2 mr-2 text-success-light" />
              {permissionText}
            </li>
          ))}
        </ul>
      </Frame>
      <ButtonGroup inline>
        <Button
          data-testid="wallet-request-permissions-approve"
          // TODO loading spinner
          // loading={isLoading === 'approve'}
          disabled={!!isLoading}
          variant="primary"
          onClick={() => handleDecision(true)}
        >
          Approve
        </Button>
        <Button
          data-testid="wallet-request-permissions-reject"
          // TODO loading spinner
          // loading={isLoading === 'rejecßt'}
          disabled={!!isLoading}
          onClick={() => handleDecision(false)}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  )
}
