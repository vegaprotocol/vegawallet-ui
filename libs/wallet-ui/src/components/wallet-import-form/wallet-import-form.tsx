import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Button } from '@vegaprotocol/ui-toolkit'

import { Validation } from '../../lib/form-validation'
import { ButtonGroup } from '../button-group'
import { FormGroup } from '../form-group'
import { Select } from '../forms'
import { Input } from '../forms/input'
import { Textarea } from '../forms/textarea'
import { Intent } from '../../config/intent'

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
    <form data-testid="import-wallet-form" onSubmit={handleSubmit(submit)}>
      <FormGroup
        label="Name"
        labelFor="wallet"
        helperText={errors.wallet?.message}
        intent={errors.wallet ? Intent.DANGER : Intent.NONE}
      >
        <Input
          data-testid="wallet-import-form-name"
          type="text"
          {...register('wallet', { required: Validation.REQUIRED })}
        />
      </FormGroup>
      <FormGroup
        label="Recovery phrase"
        labelFor="recoveryPhrase"
        helperText={errors.recoveryPhrase?.message}
        intent={errors.recoveryPhrase ? Intent.DANGER : Intent.NONE}
      >
        <Textarea
          data-testid="wallet-import-form-recovery-phrase"
          {...register('recoveryPhrase', { required: Validation.REQUIRED })}
          className="min-h-[100px]"
        />
      </FormGroup>
      <FormGroup
        label="Version"
        labelFor="version"
        helperText={errors.version?.message}
        intent={errors.version ? Intent.DANGER : Intent.NONE}
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
        intent={errors.passphrase ? Intent.DANGER : Intent.NONE}
      >
        <Input
          data-testid="wallet-import-form-passphrase"
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
          data-testid="wallet-import-form-passphrase-confirm"
          type="password"
          {...register('confirmPassphrase', {
            required: Validation.REQUIRED,
            pattern: Validation.match(passphrase),
          })}
        />
      </FormGroup>
      <ButtonGroup inline>
        <div className="flex-1">
          <button
            data-testid="cancel"
            onClick={cancel}
            className="underline w-full"
          >
            Cancel
          </button>
        </div>
        <div className="flex-1">
          <Button
            data-testid="wallet-import-form-submit"
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
