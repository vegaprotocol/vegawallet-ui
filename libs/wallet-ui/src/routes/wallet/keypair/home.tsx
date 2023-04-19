import classnames from 'classnames'
import { useNavigate, useParams } from 'react-router-dom'
import { Paths } from '../..'

import { Button } from '../../../components/button'
import { ButtonUnstyled } from '../../../components/button-unstyled'
import { Header } from '../../../components/header'
import { EyeOff } from '../../../components/icons/eye-off'
import { PublicKey } from '../../../components/public-key'
import { Title } from '../../../components/title'
import { useGlobal } from '../../../contexts/global/global-context'
import { useCurrentKeypair } from '../../../hooks/use-current-keypair'

export function KeyPairHome() {
  const navigate = useNavigate()
  const { wallet, pubkey } = useParams<{ wallet: string; pubkey: string }>()
  const { dispatch } = useGlobal()
  const { wallet: currentWallet, keypair } = useCurrentKeypair()

  if (!keypair || !wallet || !pubkey) {
    return null
  }

  return (
    <>
      <Header
        title={keypair.name}
        breadcrumb={currentWallet?.name}
        onBack={() => {
          navigate(Paths.Wallet.Wallet(encodeURIComponent(wallet)))
        }}
      />
      <PublicKey publicKey={keypair.publicKey} />
      {keypair.isTainted && (
        <div
          data-testid="keypair-taint-notification"
          className={classnames(
            'flex gap-[12px] items-center',
            'p-[20px] mt-[20px] mx-[20px] mb-[12px]',
            'border border-pink'
          )}
        >
          <div>
            <EyeOff className="w-[24px]" />
          </div>
          <div>
            This key is marked as unsafe to use.{' '}
            <ButtonUnstyled
              data-testid="keypair-taint-toggle"
              onClick={() =>
                dispatch({ type: 'SET_TAINT_KEY_MODAL', open: true })
              }
            >
              Untaint
            </ButtonUnstyled>{' '}
            it to enable this key to be used to sign transactions.
          </div>
        </div>
      )}
      <div className="pt-[20px] px-[20px] pb-[48px]" data-testid="keypair-home">
        <Title className="mt-0">Actions</Title>
        <div className="py-[6px]">
          <div>
            <Button
              className="mb-[8px]"
              data-testid="keypair-sign"
              onClick={() =>
                dispatch({ type: 'SET_SIGN_MESSAGE_MODAL', open: true })
              }
            >
              Sign a message
            </Button>
          </div>
          <p className="mb-[20px] text-deemphasise">
            Verify your identity by providing a verifiable link from this key.
          </p>
        </div>
        {!keypair.isTainted && (
          <div className="pt-[6px]">
            <div>
              <Button
                className="mb-[8px]"
                data-testid="keypair-taint-toggle"
                onClick={() =>
                  dispatch({ type: 'SET_TAINT_KEY_MODAL', open: true })
                }
              >
                Taint key
              </Button>
            </div>
            <p className="mb-[20px] text-deemphasise">
              Mark as unsafe to use to ensure this key will not be used to sign
              transactions.
            </p>
          </div>
        )}
        <div className="py-[6px]">
          <div>
            <Button
              className="mb-[8px]"
              data-testid="keypair-transactions"
              onClick={() =>
                Paths.Wallet.Transactions(encodeURIComponent(wallet), pubkey)
              }
            >
              View transactions
            </Button>
          </div>
          <p className="mb-[20px] text-deemphasise">
            See transactions you have approved or rejected.
          </p>
        </div>
        <div className="py-[6px]">
          <div>
            <Button
              className="mb-[8px]"
              data-testid="keypair-update"
              onClick={() =>
                dispatch({ type: 'SET_UPDATE_KEY_MODAL', open: true })
              }
            >
              Update key
            </Button>
          </div>
          <p className="mb-[20px] text-deemphasise">
            Update / change the key name.
          </p>
        </div>
      </div>
    </>
  )
}
