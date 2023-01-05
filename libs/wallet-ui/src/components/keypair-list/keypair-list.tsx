import { ButtonUnstyled } from '../../components/button-unstyled'
import { CopyWithTooltip } from '../../components/copy-with-tooltip'
import { EyeOff } from '../../components/icons/eye-off'
import type { Wallet } from '../../contexts/global/global-context'

type KeypairListProps = {
  wallet: Wallet
  onClick: (publicKey: string) => void
}

export const KeypairList = ({ wallet, onClick }: KeypairListProps) => {
  return (
    <div className={wallet.keypairs ? 'border-b border-black' : ''}>
      {Object.keys(wallet.keypairs || {}).map((key) => {
        if (!wallet.keypairs) {
          return null
        }
        const { name, publicKey, publicKeyShort, isTainted } =
          wallet.keypairs[key] || {}
        return (
          <div
            data-testid="wallet-keypair"
            key={publicKey}
            className="border-t border-black py-[20px]"
          >
            <div>
              <ButtonUnstyled
                data-testid={`wallet-keypair-${publicKey}`}
                onClick={() => onClick(publicKey)}
              >
                {isTainted && <EyeOff className="w-[13px] mr-[6px]" />}
                {name}
              </ButtonUnstyled>
            </div>
            <div className="text-deemphasise">
              <CopyWithTooltip text={publicKey ?? ''}>
                <span>{publicKeyShort}</span>
              </CopyWithTooltip>
            </div>
          </div>
        )
      })}
    </div>
  )
}
