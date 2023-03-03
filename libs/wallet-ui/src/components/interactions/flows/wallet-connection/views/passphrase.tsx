import { useEffect, useState } from 'react'
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
    setError,
  } = useForm<Result>()

  useEffect(() => {
    if (data.error?.type === 'User error') {
      setError(
        'passphrase',
        {
          message: `Error: ${data.error.error}`,
        },
        {
          shouldFocus: true,
        }
      )
    }
  }, [data.error, setError])

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
          <FormGroup
            label="Unlock with your passphrase to complete connection"
            labelFor="passphrase"
            helperText={errors.passphrase?.message}
            intent={errors.passphrase?.message ? Intent.DANGER : Intent.NONE}
          >
            <Input
              data-testid="input-passphrase"
              type="password"
              autoComplete="off"
              aria-invalid={errors.passphrase?.message ? 'true' : undefined}
              className="mt-[10px]"
              {...register('passphrase', { required: Validation.REQUIRED })}
            />
          </FormGroup>
        </div>
        <ButtonGroup inline>
          <Button
            loading={isLoading}
            disabled={!!errors.passphrase}
            type="submit"
          >
            Approve
          </Button>
          <Button onClick={() => onDeny()}>Cancel</Button>
        </ButtonGroup>
      </form>
    </div>
  )
}
