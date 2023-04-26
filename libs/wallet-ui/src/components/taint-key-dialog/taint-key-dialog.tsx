import { Button } from '@vegaprotocol/ui-toolkit'

import { useGlobal } from '../../contexts/global/global-context'
import { useCurrentKeypair } from '../../hooks/use-current-keypair'
import { useTaint } from '../../hooks/use-taint'
import { ButtonGroup } from '../button-group'
import { Dialog } from '../dialog'
import { Warning } from '../icons/warning'
import { PublicKey } from '../public-key'

export const TaintKeyDialog = () => {
  const { state, actions, dispatch } = useGlobal()
  const { keypair, wallet } = useCurrentKeypair()
  const { loading, taint, untaint } = useTaint(
    dispatch,
    actions,
    keypair?.publicKey,
    wallet?.name
  )

  if (!keypair) {
    return null
  }

  return (
    <Dialog
      size="lg"
      open={state.isTaintKeyModalOpen}
      title={keypair.isTainted ? 'Untaint key' : 'Taint key'}
    >
      <div data-testid="keypair-taint" className="px-[20px] pb-[20px]">
        {keypair.isTainted && (
          <div className="mb-[20px]">
            <p className="mb-[10px]">This key has been marked as tainted.</p>
            <p className="border boreder-pink p-[20px]">
              <Warning className="w-[13px] mr-[6px]" />
              If your key has been compromised or leaked, you should not untaint
              it as you will be exposing your assets.
            </p>
          </div>
        )}
        {!keypair.isTainted && (
          <div className="mb-[20px]">
            <p className="mb-[10px]">
              Tainting a key pair marks it as unsafe to use and ensures it will
              not be used to sign transactions. This mechanism is useful when
              the key pair has been compromised.
            </p>
            <p>You can choose to untaint the key at any time.</p>
          </div>
        )}
      </div>
      <PublicKey publicKey={keypair.publicKey} />
      <div className="pt-[32px] px-[20px] pb-[20px]">
        <ButtonGroup inline>
          <Button
            data-testid="taint-action"
            disabled={loading}
            onClick={() => {
              if (keypair.isTainted) {
                untaint()
              } else {
                taint()
              }
              dispatch({ type: 'SET_TAINT_KEY_MODAL', open: false })
            }}
            fill={true}
          >
            {keypair.isTainted ? 'Untaint this key' : 'Taint this key'}
          </Button>
          <button
            onClick={() =>
              dispatch({ type: 'SET_TAINT_KEY_MODAL', open: false })
            }
            className="underline w-full"
          >
            Cancel
          </button>
        </ButtonGroup>
      </div>
    </Dialog>
  )
}
