import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Button } from '@vegaprotocol/ui-toolkit'

import { Validation } from '../../lib/form-validation'
import { ButtonGroup } from '../button-group'
import { FormGroup } from '../form-group'
import { Input } from '../forms/input'
import { Intent } from '../../config/intent'

interface FormFields {
  wallet: string
  passphrase: string
  confirmPassphrase: string
}

interface WalletCreateFormProps {
  submit: (fields: { wallet: string; passphrase: string }) => void
  cancel: () => void
}

export function WalletCreateForm({ submit, cancel }: WalletCreateFormProps) {
  const {
    control,
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormFields>()

  const passphrase = useWatch({ control, name: 'passphrase' })

  useEffect(() => {
    setFocus('wallet')
  }, [setFocus])

  return (
    <form data-testid="create-wallet-form" onSubmit={handleSubmit(submit)}>
      <FormGroup
        label="Name"
        labelFor="wallet"
        helperText={errors.wallet?.message}
        intent={errors.wallet ? Intent.DANGER : Intent.NONE}
      >
        <Input
          data-testid="create-wallet-form-name"
          type="text"
          {...register('wallet', { required: Validation.REQUIRED })}
          autoComplete="off"
        />
      </FormGroup>
      <FormGroup
        label="Passphrase"
        labelFor="passphrase"
        helperText={errors.passphrase?.message}
        intent={errors.passphrase ? Intent.DANGER : Intent.NONE}
      >
        <Input
          data-testid="create-wallet-form-passphrase"
          type="password"
          {...register('passphrase', { required: Validation.REQUIRED })}
        />
      </FormGroup>
      <FormGroup
        label="Confirm passphrase"
        labelFor="confirmPassphrase"
        helperText={errors.confirmPassphrase?.message}
        intent={errors.confirmPassphrase ? Intent.DANGER : Intent.NONE}
      >
        <Input
          data-testid="create-wallet-form-passphrase-confirm"
          type="password"
          {...register('confirmPassphrase', {
            required: Validation.REQUIRED,
            pattern: Validation.match(passphrase),
          })}
        />
      </FormGroup>
      <ButtonGroup inline>
        <div className="flex-1">
          <button className="underline w-full" onClick={cancel}>
            Cancel
          </button>
        </div>
        <div className="flex-1">
          <Button
            data-testid="create-wallet-form-submit"
            type="submit"
            fill={true}
          >
            Submit
          </Button>
        </div>
      </ButtonGroup>
    </form>
  )
}
