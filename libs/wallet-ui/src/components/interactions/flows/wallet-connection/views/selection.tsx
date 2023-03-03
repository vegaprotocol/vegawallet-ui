import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Title } from '../../../../title'
import { RadioGroup } from '../../../../radio-group'
import { ButtonGroup } from '../../../../button-group'
import { Button } from '../../../../button'
import { useGlobal } from '../../../../../contexts/global/global-context'
import { Validation } from '../../../../../lib/form-validation'

import type { WalletConnectionProps } from '../'

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
    await service.RespondToInteraction({
      traceID: data.traceID,
      name: 'CANCEL_REQUEST',
    })
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
    <div>
      <div className="text-center mt-[100px] mb-[32px]">
        <Title>Connect to website</Title>
        <p className="text-neutral-light">{data.hostname}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border border-neutral rounded p-[10px] mb-[20px]">
          <p className="mb-[5px]">Select a wallet to connect to:</p>
          <RadioGroup
            name="wallet"
            control={control}
            itemClass="mb-[5px]"
            rules={{
              required: Validation.REQUIRED,
            }}
            options={(data.availableWallets || []).map((w) => ({
              label: w,
              value: w,
            }))}
          />
        </div>
        <ButtonGroup inline>
          <Button type="submit" disabled={isLoading || !formState.isValid}>
            Approve
          </Button>
          <Button onClick={() => onDeny()}>Deny</Button>
        </ButtonGroup>
      </form>
    </div>
  )
}
