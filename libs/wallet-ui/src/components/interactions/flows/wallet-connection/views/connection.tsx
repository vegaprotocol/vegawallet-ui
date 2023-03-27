import { useState } from 'react'
import { Button } from '@vegaprotocol/ui-toolkit'
import { ButtonGroup } from '../../../../button-group'
import { Tick } from '../../../../icons/tick'
import { useGlobal } from '../../../../../contexts/global/global-context'
import { CONNECTION_RESPONSE } from '../../../../../types/interaction'

import type { WalletConnectionProps } from '../'
import { Frame } from '../../../../../components/frame'
import { InteractionHeader } from '../../interaction-header'

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
      <InteractionHeader hostname={data.hostname} />
      <Frame>
        <p className="mb-3" data-testid="dapp-connect-access-list-title">
          Allow this site to:
        </p>
        <ul className="list-none">
          <li className="flex">
            <Tick className="w-3 mr-2 text-success-light" />
            <p
              data-testid="dapp-connect-access-list-access"
              className="text-light-200"
            >
              Request access to your key(s)
            </p>
          </li>
        </ul>
      </Frame>
      <ButtonGroup inline>
        <Button
          data-testid="dapp-connect-approve-button"
          variant="primary"
          // TODO need a loading spinner but UI toolkit doesn't support this
          // rightIcon={isLoading === 'approve' ? '' : undefined}
          disabled={!!isLoading}
          onClick={() => handleDecision(true)}
        >
          Approve
        </Button>
        <Button
          data-testid="dapp-connect-deny-button"
          // TODO need a loading spinner but UI toolkit doesn't support this
          // loading={isLoading === 'reject'}
          disabled={!!isLoading}
          onClick={() => handleDecision(false)}
        >
          Deny
        </Button>
      </ButtonGroup>
    </div>
  )
}
