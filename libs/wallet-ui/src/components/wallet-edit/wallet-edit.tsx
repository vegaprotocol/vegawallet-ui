import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { Intent } from '../../config/intent'
import { useCurrentWallet } from '../../hooks/use-current-wallet'
import { useRenameWallet } from '../../hooks/use-rename-wallet'
import { Validation } from '../../lib/form-validation'
import { ButtonGroup } from '../button-group'
import { FormGroup } from '../form-group'
import { Input } from '../forms/input'
import { Button } from '@vegaprotocol/ui-toolkit'

type WalletEditProps = {
  onClose: () => void
}

type FormData = {
  name: string
}

export const WalletEdit = ({ onClose }: WalletEditProps) => {
  const { rename } = useRenameWallet()
  const { wallet } = useCurrentWallet()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: wallet?.name ?? '',
    },
  })

  const onSubmit = useCallback(
    (data: FormData) => {
      if (wallet?.name) {
        rename(wallet.name, data.name)
        onClose()
      }
    },
    [rename, onClose, wallet?.name]
  )

  return (
    <form
      data-testid="edit-wallet-form"
      className="p-[20px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormGroup
        label="Name"
        labelFor="name"
        intent={errors.name?.message ? Intent.DANGER : Intent.NONE}
        helperText={errors.name?.message}
      >
        <Input
          {...register('name', {
            required: Validation.REQUIRED,
          })}
        />
      </FormGroup>
      <ButtonGroup orientation="horizontal">
        <Button fill={true} onClick={onClose}>
          Cancel
        </Button>
        <Button fill={true} variant="primary" type="submit">
          Update
        </Button>
      </ButtonGroup>
    </form>
  )
}
