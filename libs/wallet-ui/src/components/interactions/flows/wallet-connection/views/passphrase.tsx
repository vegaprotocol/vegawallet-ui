import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormGroup } from '../../../../form-group'
import { Input } from '../../../../forms/input'
import { Button } from '../../../../button'
import { ButtonGroup } from '../../../../button-group'
import { Title } from '../../../../title'
import { Validation } from '../../../../../lib/form-validation'
import { useGlobal } from '../../../../../contexts/global/global-context'
import { Intent } from '../../../../../config/intent'

import type { WalletConnectionProps } from '../'

type Result = {
  passphrase: string
}

export const PassphraseView = ({
  data,
  onUpdate,
  onClose,
}: WalletConnectionProps) => {
  const [isLoading, setLoading] = useState(false)
  const { service } = useGlobal()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Result>()

  const onDeny = async () => {
    await service.RespondToInteraction({
      traceID: data.traceID,
      name: 'CANCEL_REQUEST',
    })
    onClose()
  }

  const onSubmit = async ({ passphrase }: Result) => {
    setLoading(true)
    try {
      await service.RespondToInteraction({
        traceID: data.traceID,
        name: 'ENTERED_PASSPHRASE',
        data: {
          passphrase,
        },
      })
    } catch (err) {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          label="Passphrase"
          labelFor="passphrase"
          helperText={errors.passphrase?.message}
          intent={errors.passphrase?.message ? Intent.DANGER : Intent.NONE}
        >
          <Input
            data-testid="input-passphrase"
            type="password"
            autoComplete="off"
            {...register('passphrase', { required: Validation.REQUIRED })}
          />
        </FormGroup>
        <ButtonGroup inline>
          <Button loading={isLoading} type="submit">
            Approve
          </Button>
          <Button onClick={() => onDeny()}>Cancel</Button>
        </ButtonGroup>
      </form>
    </div>
  )
}
