import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormGroup } from '../../../../form-group'
import { Input } from '../../../../forms/input'
import { Button, ButtonLink } from '@vegaprotocol/ui-toolkit'
import { ButtonGroup } from '../../../../button-group'
import { Validation } from '../../../../../lib/form-validation'
import { useGlobal } from '../../../../../contexts/global/global-context'
import { Intent } from '../../../../../config/intent'

import type { WalletConnectionProps } from '../'
import { Frame } from '../../../../frame'
import { InteractionHeader } from '../../interaction-header'

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
  } = useForm<Result>({
    reValidateMode: 'onChange',
  })

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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div data-testid="dapp-passphrase-modal">
      <InteractionHeader hostname={data.hostname} />
      <form
        data-testid="dapp-passphrase-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Frame>
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
              className="mt-2"
              {...register('passphrase', { required: Validation.REQUIRED })}
            />
          </FormGroup>
        </Frame>
        <ButtonGroup inline>
          <Button
            data-testid="dapp-passphrase-approve-button"
            variant="primary"
            // TODO: add loading state
            // loading={isLoading}
            disabled={!!errors.passphrase || isLoading}
            type="submit"
          >
            Unlock
          </Button>
          <ButtonLink
            data-testid="dapp-passphrase-cancel-button"
            onClick={() => onDeny()}
          >
            Cancel
          </ButtonLink>
        </ButtonGroup>
      </form>
    </div>
  )
}
