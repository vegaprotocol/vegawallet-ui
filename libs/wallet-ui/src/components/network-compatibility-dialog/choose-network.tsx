import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { Validation } from '../../lib/form-validation'
import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'
import { RadioGroup } from '../radio-group'

type FormData = {
  network?: string
}

type ChangeNetworkProps = {
  networks: string[]
  onAddNetwork: () => void
  onSubmit: (data: FormData) => void
  onCancel: () => void
}

export const ChangeNetwork = ({
  networks,
  onSubmit,
  onCancel,
  onAddNetwork,
}: ChangeNetworkProps) => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      network: undefined,
    },
  })

  const networkOptions = useMemo(() => {
    return networks.map((n) => ({ label: n, value: n }))
  }, [networks])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-[20px]">
      <RadioGroup
        name="network"
        control={control}
        options={networkOptions}
        rules={{
          required: Validation.REQUIRED,
        }}
      />
      <ButtonUnstyled onClick={onAddNetwork} className="mt-[12px]">
        Add network
      </ButtonUnstyled>
      <ButtonGroup inline className="py-[20px]">
        <ButtonUnstyled onClick={onCancel}>Cancel</ButtonUnstyled>
        <Button type="submit">Select network</Button>
      </ButtonGroup>
    </form>
  )
}
