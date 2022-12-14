import { useMemo } from 'react'

import { Intent } from '../../../config/intent'
import { useGlobal } from '../../../contexts/global/global-context'
import { Button } from '../../button'
import { ButtonGroup } from '../../button-group'
import { ButtonUnstyled } from '../../button-unstyled'
import { Dialog } from '../../dialog'
import { ChevronLeft } from '../../icons/chevron-left'
import { AppToaster } from '../../toaster'
import type {
  InteractionContentProps,
  RequestPermissions,
  RequestPermissionsContent,
} from '../../../types/interaction'
import { PermissionTarget, PermissionType } from '../../../types/interaction'
import { INTERACTION_RESPONSE_TYPE } from '../../../types/interaction'

const getPermissionAction = (
  data: RequestPermissionsContent,
  target: PermissionTarget,
  type: PermissionType
) => {
  switch (`${type}:${target}`) {
    case `${PermissionType.READ}:${PermissionTarget.PUBLIC_KEYS}`: {
      return `access to see all your public keys for ${data.wallet}.`
    }
    default: {
      return `to ${type} your ${target.replace('_', ' ')} for ${data.wallet}.`
    }
  }
}

const getDisplayDetails = (data: RequestPermissionsContent) => {
  const targets = Object.keys(data.permissions) as PermissionTarget[]
  const requestText = (
    <>
      <strong>{data.hostname}</strong> is requesting
    </>
  )

  if (targets.length === 1) {
    return (
      <p className="pb-[20px]">
        {requestText}{' '}
        {getPermissionAction(data, targets[0], data.permissions[targets[0]])}
      </p>
    )
  }

  return (
    <div className="pb-[20px]">
      <p>{requestText}</p>
      <ul className="my-[12px] mx-0">
        {targets.map((target) => (
          <li key={target} className="ml-[12px]">
            <ChevronLeft
              className="mr-[6px] w-[13px]"
              style={{ transform: 'scale(-1, 1)' }}
            />
            {getPermissionAction(data, target, data.permissions[target])}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Permissions = ({
  event,
}: InteractionContentProps<RequestPermissions>) => {
  const { service } = useGlobal()
  const message = useMemo(() => {
    return getDisplayDetails(event.data)
  }, [event])

  const onAccept = async (decision: boolean) => {
    try {
      // @ts-ignore: wails generates the wrong type signature for this handler
      await service.RespondToInteraction({
        traceID: event.traceID,
        name: INTERACTION_RESPONSE_TYPE.DECISION,
        data: {
          approved: decision,
        },
      })
    } catch (err: unknown) {
      AppToaster.show({
        message: `${err}`,
        intent: Intent.DANGER,
      })
    }
  }

  return (
    <Dialog open={true} title="Wallet permissions">
      <div
        data-testid="wallet-request-permissions"
        className="px-[20px] pb-[20px]"
      >
        {message}
        <ButtonGroup inline>
          <Button
            data-testid="wallet-request-permissions-approve"
            onClick={() => onAccept(true)}
          >
            Approve
          </Button>
          <ButtonUnstyled
            data-testid="wallet-request-permissions-reject"
            onClick={() => onAccept(false)}
          >
            Cancel
          </ButtonUnstyled>
        </ButtonGroup>
      </div>
    </Dialog>
  )
}
