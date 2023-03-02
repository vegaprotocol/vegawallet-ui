import { useState } from 'react'
import { Title } from '../../../../title'
import { Button } from '../../../../button'
import { ButtonGroup } from '../../../../button-group'
import { Tick } from '../../../../icons/tick'
import { useGlobal } from '../../../../../contexts/global/global-context'
import { CONNECTION_RESPONSE } from '../../../../../types/interaction'

import type { WalletConnectionProps } from '../'

export const ConnectionView = ({ data, onUpdate }: WalletConnectionProps) => {
  const { service } = useGlobal()
  const [isLoading, setLoading] = useState(false)

  const handleDecision = async (decision: boolean) => {
    setLoading(true)
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
        error: `${err}`,
      })
    }
  }

  return (
    <div>
      <div className="my-[20px]">
        <Title>
          WALLET {'->'} {data.hostname}
        </Title>
      </div>
      <p>Connect to website</p>
      <p className="text-neutral-light">{data.hostname}</p>
      <div className="border border-neutral rounded p-[10px]">
        <p>Allow this site to:</p>
        <ul className="list-none">
          <li>
            <Tick className="w-[10px] mr-[6px] text-success-light" />
            <p>Request access to your wallets</p>
          </li>
        </ul>
      </div>
      <ButtonGroup inline>
        <Button loading={isLoading} onClick={() => handleDecision(true)}>
          Approve
        </Button>
        <Button onClick={() => handleDecision(false)}>Deny</Button>
      </ButtonGroup>
    </div>
  )
}
