import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@vegaprotocol/ui-toolkit'

import { Intent } from '../../config/intent'
import { useGlobal } from '../../contexts/global/global-context'
import { Validation } from '../../lib/form-validation'
import { ButtonGroup } from '../button-group'
import { Dialog } from '../dialog'
import { FormGroup } from '../form-group'
import { Input } from '../forms/input'
import { Spinner } from '../spinner'

interface ModalHandler {
  open: () => void
  resolve: (passphrase: string) => void
  close: () => void
}

const handler: ModalHandler = {
  open: () => undefined,
  resolve: () => undefined,
  close: () => undefined,
}

interface FormFields {
  passphrase: string
}

export function PassphraseModal() {
  const [loading, setLoading] = useState(false)
  const { state, actions, dispatch } = useGlobal()

  // Register handler.open to open the passphrase modal
  useEffect(() => {
    handler.open = () => {
      dispatch({ type: 'SET_PASSPHRASE_MODAL', open: true })
    }
  }, [dispatch, actions])

  function onSubmit({ passphrase }: { passphrase: string }) {
    setLoading(true)
    handler.resolve(passphrase)

    // Show spinner and prevent modal closing before route change which causes
    // causes some slight jankiness.
    dispatch({ type: 'SET_PASSPHRASE_MODAL', open: false })
    setLoading(false)
  }

  function close() {
    handler.close()
    dispatch({ type: 'SET_PASSPHRASE_MODAL', open: false })
    setLoading(false)
  }

  return (
    <Dialog open={state.isPassphraseModalOpen}>
      <PassphraseModalForm
        onSubmit={onSubmit}
        onCancel={close}
        loading={loading}
      />
    </Dialog>
  )
}

interface PassphraseModalFormProps {
  onSubmit: (props: { passphrase: string }) => void
  onCancel: () => void
  loading: boolean
}

function PassphraseModalForm({
  onSubmit,
  onCancel,
  loading,
}: PassphraseModalFormProps) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormFields>()

  useEffect(() => {
    setFocus('passphrase')
  }, [setFocus])

  return (
    <form
      className="p-[20px]"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="passphrase-form"
    >
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
        <div className="flex-1">
          <Button data-testid="input-submit" type="submit" fill={true}>
            {loading ? <Spinner /> : 'Submit'}
          </Button>
        </div>
        <div className="flex-1">
          <button
            data-testid="input-cancel"
            onClick={onCancel}
            type="button"
            className="underline w-full"
          >
            Cancel
          </button>
        </div>
      </ButtonGroup>
    </form>
  )
}

export function requestPassphrase(): Promise<string> {
  return new Promise((resolve, reject) => {
    handler.open()
    handler.resolve = (passphrase: string) => {
      resolve(passphrase)
    }
    handler.close = () => {
      reject('dismissed')
    }
  })
}
