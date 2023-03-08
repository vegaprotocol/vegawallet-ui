import { useState, useMemo } from 'react'

import { Button } from '../../../button'
import { ButtonGroup } from '../../../button-group'
import { Tick } from '../../../icons/tick'
import { useGlobal } from '../../../../contexts/global/global-context'
import { PermissionTarget, PermissionType } from '../../../../types/interaction'
import type {
  PermissionTargetType,
  PermissionTypes,
} from '../../../../types/interaction'
import { Title } from '../../../title'
import type { InteractionErrorType } from '../../views/error'
import { InteractionError } from '../../views/error'
import { InteractionSuccess } from '../../views/success'

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
        onReset={() =>
          onUpdate({
            ...data,
            error: undefined,
          })
        }
        onClose={onClose}
      />
    )
  }

  if (data.view === 'success') {
    return <InteractionSuccess title="Permissions updated" onClose={onClose} />
  }

  return (
    <div>
      <div className="text-center mt-[100px] mb-[32px]">
        <Title className="mb-[5px]">Website permissions</Title>
        <p className="text-neutral-light">{data.hostname}</p>
      </div>
      <div className="border border-neutral rounded p-[10px] mb-[20px]">
        <p className="mb-[5px]">Allows this site to:</p>
        <ul>
          {permissions.map((permissionText, i) => (
            <li key={i} className="mb-[5px]">
              <Tick className="w-[10px] mr-[6px] text-success-light" />
              {permissionText}
            </li>
          ))}
        </ul>
      </div>
      <ButtonGroup inline>
        <Button
          data-testid="wallet-request-permissions-approve"
          loading={isLoading === 'approve'}
          disabled={!!isLoading}
          onClick={() => handleDecision(true)}
        >
          Approve
        </Button>
        <Button
          data-testid="wallet-request-permissions-reject"
          loading={isLoading === 'reject'}
          disabled={!!isLoading}
          onClick={() => handleDecision(false)}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  )
}
