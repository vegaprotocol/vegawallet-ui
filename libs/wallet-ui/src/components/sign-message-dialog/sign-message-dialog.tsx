import { useForm } from 'react-hook-form'
import { Button } from '@vegaprotocol/ui-toolkit'

import { useGlobal } from '../../contexts/global/global-context'
import { useCurrentKeypair } from '../../hooks/use-current-keypair'
import { useSign } from '../../hooks/use-sign'
import { BreakText } from '../break-text'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'
import { CopyWithTooltip } from '../copy-with-tooltip'
import { Dialog } from '../dialog'
import { FormGroup } from '../form-group'
import { Textarea } from '../forms/textarea'
import { Intent } from '../../config/intent'

interface FormFields {
  message: string
}

export const SignMessageDialog = () => {
  const { state, dispatch } = useGlobal()
  const { keypair, wallet } = useCurrentKeypair()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>()

  const { sign, signedData, setSignedData } = useSign(
    keypair?.publicKey,
    wallet?.name
  )

  return (
    <Dialog
      open={state.isSignMessageModalOpen}
      title={signedData ? 'Signed message' : 'Sign message'}
      size="lg"
    >
      <div data-testid="keypair-sign" className="px-[20px] pb-[20px]">
        {signedData ? (
          <>
            <div className="text-white mb-[32px]">
              <CopyWithTooltip text={signedData}>
                <BreakText>{signedData}</BreakText>
              </CopyWithTooltip>
            </div>
            <ButtonGroup inline>
              <ButtonUnstyled
                data-testid="sign-close"
                onClick={() =>
                  dispatch({ type: 'SET_SIGN_MESSAGE_MODAL', open: false })
                }
              >
                Close
              </ButtonUnstyled>
              <Button
                data-testid="sign-more"
                onClick={() => {
                  setValue('message', '')
                  setSignedData('')
                }}
              >
                Sign another
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <form onSubmit={handleSubmit(sign)}>
            <p className="mb-[32px]">
              Type a message and press sign to get a verifiable link to prove
              your identity from this key.
            </p>
            <FormGroup
              label="Message"
              labelFor="message"
              helperText={errors.message?.message}
              intent={errors.message ? Intent.DANGER : Intent.NONE}
            >
              <Textarea
                data-testid="message-field"
                {...register('message', { required: 'Required' })}
              />
            </FormGroup>
            <ButtonGroup inline>
              <div className="flex-1">
                <button
                  data-testid="sign-close"
                  onClick={() =>
                    dispatch({ type: 'SET_SIGN_MESSAGE_MODAL', open: false })
                  }
                  className="underline w-full"
                >
                  Cancel
                </button>
              </div>
              <div className="flex-1">
                <Button data-testid="sign" type="submit" fill={true}>
                  Sign
                </Button>
              </div>
            </ButtonGroup>
          </form>
        )}
      </div>
    </Dialog>
  )
}
