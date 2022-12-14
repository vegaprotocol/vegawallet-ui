import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { Validation } from '../../lib/form-validation'
import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'
import { FormGroup } from '../form-group'
import { Select } from '../forms'
import { Input } from '../forms/input'
import { Textarea } from '../forms/textarea'

interface FormFields {
  wallet: string
  version: number
  passphrase: string
  confirmPassphrase: string
  recoveryPhrase: string
}

interface WalletImportFormProps {
  submit: (values: {
    wallet: string
    passphrase: string
    recoveryPhrase: string
    version: number
  }) => Promise<void>
  cancel: () => void
}

export function WalletImportForm({ submit, cancel }: WalletImportFormProps) {
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
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup
        label="Name"
        labelFor="wallet"
        helperText={errors.wallet?.message}
      >
        <Input
          data-testid="wallet-name"
          type="text"
          {...register('wallet', { required: Validation.REQUIRED })}
        />
      </FormGroup>
      <FormGroup
        label="Recovery phrase"
        labelFor="recoveryPhrase"
        helperText={errors.recoveryPhrase?.message}
      >
        <Textarea
          data-testid="recovery-phrase"
          {...register('recoveryPhrase', { required: Validation.REQUIRED })}
          className="min-h-[100px]"
        />
      </FormGroup>
      <FormGroup
        label="Version"
        labelFor="version"
        helperText={errors.version?.message}
      >
        <Select
          data-testid="version"
          defaultValue={2}
          {...register('version', { required: Validation.REQUIRED })}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </Select>
      </FormGroup>
      <FormGroup
        label="Choose passphrase"
        labelFor="passphrase"
        helperText={errors.passphrase?.message}
      >
        <Input
          data-testid="passphrase"
          type="password"
          {...register('passphrase', { required: Validation.REQUIRED })}
        />
      </FormGroup>
      <FormGroup
        data-testid="confirm-passphrase"
        label="Confirm passphrase"
        labelFor="confirmPassphrase"
        helperText={errors.confirmPassphrase?.message}
      >
        <Input
          data-testid="confirm-passphrase"
          type="password"
          {...register('confirmPassphrase', {
            required: Validation.REQUIRED,
            pattern: Validation.match(passphrase),
          })}
        />
      </FormGroup>
      <ButtonGroup inline>
        <Button data-testid="submit" type="submit">
          Submit
        </Button>
        <ButtonUnstyled data-testid="cancel" onClick={cancel}>
          Cancel
        </ButtonUnstyled>
      </ButtonGroup>
    </form>
  )
}
