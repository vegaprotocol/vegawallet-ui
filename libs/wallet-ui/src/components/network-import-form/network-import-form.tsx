import { useEffect, useState } from 'react'
import type { FieldError } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { Intent } from '../../config/intent'
import { FormStatus } from '../../hooks/use-form-state'
import { useImportNetwork } from '../../hooks/use-import-network'
import { Validation } from '../../lib/form-validation'
import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'
import { Checkbox } from '../checkbox'
import { FormGroup } from '../form-group'
import { Input } from '../forms/input'

interface FormFields {
  name: string
  fileOrUrl: string
  force: boolean
}

interface NetworkImportFormProps {
  onComplete?: (network: string) => void
  onCancel?: () => void
}

export function NetworkImportForm({
  onComplete,
  onCancel
}: NetworkImportFormProps) {
  const [isCheckboxVisible, setCheckboxVisible] = useState(false)
  const { status, submit, error } = useImportNetwork()

  const {
    control,
    register,
    handleSubmit,
    setError,
    reset,
    getValues,
    formState: { errors }
  } = useForm<FormFields>({
    defaultValues: {
      name: '',
      fileOrUrl: '',
      force: false
    }
  })

  useEffect(() => {
    const name = getValues('name')
    if (status === FormStatus.Success) {
      reset()
      setCheckboxVisible(false)
      if (typeof onComplete === 'function') {
        onComplete(name)
      }
    }
  }, [status, reset, getValues, onComplete])

  // If an error is set and its the 'wallet already exists' error, open the advanced fields section
  // set the name
  useEffect(() => {
    if (status === FormStatus.Error && error && /already exists/.test(error)) {
      setCheckboxVisible(true)
      setError(
        'name',
        {
          message:
            'Network with name already exists. Provide a new name or overwrite by checking the box below'
        },
        { shouldFocus: true }
      )
    }
  }, [error, status, setError])

  const renderFileOrUrlHelperText = (error: FieldError | undefined) => {
    if (error) {
      return error.message
    }

    return 'Enter a path to a configuration file for a new network, for example https://mynetwork.com/config.toml or /file/on/mysystem/config.toml'
  }

  return (
    <form
      onSubmit={handleSubmit(values => submit({ ...values, network: 'other' }))}
    >
      <FormGroup
        label='URL or path'
        labelFor='fileOrUrl'
        intent={errors.fileOrUrl?.message ? Intent.DANGER : Intent.NONE}
        helperText={renderFileOrUrlHelperText(errors.fileOrUrl)}
      >
        <Input
          id='fileOrUrl'
          type='text'
          data-testid='url-path'
          {...register('fileOrUrl', {
            required: Validation.REQUIRED
          })}
        />
      </FormGroup>
      <FormGroup
        label='Network name'
        labelFor='name'
        intent={errors.name?.message ? Intent.DANGER : Intent.NONE}
        helperText={
          errors.name
            ? errors.name?.message
            : 'Uses name specified in the config by default'
        }
      >
        <Input
          data-testid='network-name'
          type='text'
          id='name'
          {...register('name')}
        />
      </FormGroup>
      {isCheckboxVisible && (
        <FormGroup helperText='Overwrite existing network configuration'>
          <Checkbox name='force' control={control} label='Overwrite' />
        </FormGroup>
      )}
      <ButtonGroup inline>
        <Button
          data-testid='import-network'
          type='submit'
          loading={status === FormStatus.Pending}
        >
          Import
        </Button>
        {onCancel && <ButtonUnstyled onClick={onCancel}>Cancel</ButtonUnstyled>}
      </ButtonGroup>
    </form>
  )
}
