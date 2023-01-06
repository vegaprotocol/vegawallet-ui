import type { ReactNode } from 'react'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { Callout } from '../callout'
import { CodeBlock } from '../code-block'
import { CopyWithTooltip } from '../copy-with-tooltip'
import { Warning } from '../icons/warning'

interface WalletCreateFormSuccessProps {
  response: WalletModel.CreateWalletResult
  callToAction?: React.ReactNode
}

export function WalletCreateFormSuccess({
  response,
  callToAction,
}: WalletCreateFormSuccessProps) {
  const version = response?.wallet?.keyDerivationVersion
  return (
    <>
      <SuccessSection>
        <Callout
          title="Warning"
          icon={<Warning className="w-[15px] h-[15px]" />}
          className="text-black bg-white"
          data-testid="recovery-phrase-warning"
        >
          <p data-testid="wallet-warning">
            Save your recovery phrase now, you will need it to recover your
            wallet. Keep it secure and secret. Your recovery phrase is only
            shown once and cannot be recovered.
          </p>
        </Callout>
      </SuccessSection>
      <SuccessSection>
        <p data-testid="wallet-version">Wallet version</p>
        <p>
          <CodeBlock>{version}</CodeBlock>
        </p>
      </SuccessSection>
      <SuccessSection>
        <p>Recovery phrase</p>
        <p className="relative" data-testid="wallet-recovery-phrase">
          <CodeBlock data-testid="recovery-phrase">
            {response?.wallet?.recoveryPhrase}
          </CodeBlock>
          <span className="absolute top-[7px] right-[10px]">
            <CopyWithTooltip text={response?.wallet?.recoveryPhrase ?? ''} />
          </span>
        </p>
      </SuccessSection>
      {callToAction}
    </>
  )
}

function SuccessSection({ children }: { children: ReactNode }) {
  return <div className="mb-[20px]">{children}</div>
}
