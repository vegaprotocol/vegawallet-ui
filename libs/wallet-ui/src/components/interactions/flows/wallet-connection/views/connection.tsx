import { useState } from 'react'
import { Title } from '../../../../title'
import { Button } from '../../../../button'
import { ButtonGroup } from '../../../../button-group'
import { Tick } from '../../../../icons/tick'
import { useGlobal } from '../../../../../contexts/global/global-context'
import { CONNECTION_RESPONSE } from '../../../../../types/interaction'

import type { WalletConnectionProps } from '../'

export const ConnectionView = ({
  data,
  onUpdate,
  onClose,
}: WalletConnectionProps) => {
  const { service } = useGlobal()
  const [isLoading, setLoading] = useState<'approve' | 'reject' | false>(false)

  const handleDecision = async (decision: boolean) => {
    setLoading(decision ? 'approve' : 'reject')
    try {
      await service.RespondToInteraction({
        traceID: data.traceID,
        name: 'WALLET_CONNECTION_DECISION',
        data: {
          connectionApproval: decision
            ? CONNECTION_RESPONSE.APPROVED_ONCE
            : CONNECTION_RESPONSE.REJECTED_ONCE,
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

  return (
    <div data-testid="dapp-connect-modal">
      <div className="text-center mt-[100px] mb-[32px]">
        <Title className="mb-[5px]">Connect to website</Title>
        <p data-testid="dapp-connect-hostname" className="text-neutral-light">
          {data.hostname}
        </p>
      </div>
      <div
        data-testid="dapp-connect-access-list"
        className="border border-neutral rounded p-[10px] mb-[20px]"
      >
        <p className="mb-[5px]">Allow this site to:</p>
        <ul className="list-none">
          <li className="flex mb-[5px]">
            <Tick className="w-[12px] mr-[10px] text-success-light" />
            <p className="text-light-200">Request access to your key(s)</p>
          </li>
        </ul>
      </div>
      <ButtonGroup inline>
        <Button
          data-testid="dapp-connect-approve-button"
          loading={isLoading === 'approve'}
          disabled={!!isLoading}
          onClick={() => handleDecision(true)}
        >
          Approve
        </Button>
        <Button
          data-testid="dapp-connect-deny-button"
          loading={isLoading === 'reject'}
          onClick={() => handleDecision(false)}
        >
          Deny
        </Button>
      </ButtonGroup>
    </div>
  )
}
