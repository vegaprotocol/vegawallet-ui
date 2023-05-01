import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { RadioGroup } from '../../../../radio-group'
import { ButtonGroup } from '../../../../button-group'
import { Button } from '@vegaprotocol/ui-toolkit'
import { useGlobal } from '../../../../../contexts/global/global-context'
import { Validation } from '../../../../../lib/form-validation'

import type { WalletConnectionProps } from '../'
import { Frame } from '../../../../frame'
import { InteractionHeader } from '../../interaction-header'

type Result = {
  wallet: string
}

export const SelectionView = ({
  data,
  onUpdate,
  onClose,
}: WalletConnectionProps) => {
  const [isLoading, setLoading] = useState(false)
  const { service } = useGlobal()
  const { control, handleSubmit, formState } = useForm<Result>()

  const onDeny = async () => {
    setLoading(true)
    try {
      await service.RespondToInteraction({
        traceID: data.traceID,
        name: 'CANCEL_REQUEST',
      })
    } catch (err) {
      // TODO: handle error
    } finally {
      setLoading(false)
    }
    onClose()
  }

  const onSubmit = async ({ wallet }: Result) => {
    setLoading(true)
    try {
      await service.RespondToInteraction({
        traceID: data.traceID,
        name: 'SELECTED_WALLET',
        data: {
          wallet,
        },
      })

      onUpdate({
        ...data,
        selectedWallet: wallet,
      })
    } catch (err) {
      onUpdate({
        ...data,
        error: {
          type: 'Backend error',
          error: `${err}`,
        },
      })
    }
  }

  return (
    <div data-testid="dapp-select-wallet-modal">
      <InteractionHeader hostname={data.hostname} />
      <form
        data-testid="dapp-select-wallet-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Frame>
          <p className="mb-1">Select a wallet to connect to:</p>
          <RadioGroup
            name="wallet"
            control={control}
            itemClass="mb-1"
            rules={{
              required: Validation.REQUIRED,
            }}
            options={(data.availableWallets || []).map((w) => ({
              label: w,
              value: w,
            }))}
          />
        </Frame>
        <ButtonGroup inline>
          <Button
            data-testid="dapp-select-deny-button"
            onClick={() => onDeny()}
          >
            Deny
          </Button>
          <Button
            data-testid="dapp-select-approve-button"
            variant="primary"
            type="submit"
            disabled={isLoading || !formState.isValid}
          >
            Approve
          </Button>
        </ButtonGroup>
      </form>
    </div>
  )
}
