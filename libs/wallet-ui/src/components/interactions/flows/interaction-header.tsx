import { Icon } from '@vegaprotocol/ui-toolkit'
import { VegaIcon } from '../../icons/vega-icon'
import { useRef } from 'react'

export const InteractionHeader = ({
  hostname,
  reason,
}: {
  hostname: string | undefined
  reason?: string
}) => {
  const ref = useRef<HTMLParagraphElement>(null)

  if (reason) {
    /**
     * Example:
     *
     * The third-party application "bafybeifkwsvkyznqjbgu5446rv5pxwko7x6sx337fraaymh5jcwvuxglvy.ipfs.cf-ipfs.com" is attempting access to the locked wallet "ABC".
     * To unlock this wallet and allow access to all connected apps associated to it, enter its passphrase.
     */
    const URL_OR_WALLET_NAME = /"([^\s]+)"/g
    const formatted = reason.replace(
      URL_OR_WALLET_NAME,
      (substring) =>
        `<span class="${
          substring.length > 45 ? 'break-all' : ''
        } font-bold">${substring}</span>`
    )
    if (ref.current) {
      ref.current.innerHTML = formatted
    }
  }

  return (
    <>
      <div className="flex justify-center mt-16">
        <VegaIcon />
        <div className="flex flex-col justify-center mx-8">
          <Icon name="arrow-right" className="text-vega-yellow-500" />
        </div>
        <VegaIcon inverted={true} />
      </div>
      <div className="text-center mb-6 mt-10">
        <h1 className="mb-1 text-2xl">Connect to website</h1>
        {hostname && (
          <p data-testid="dapp-hostname" className="text-neutral-light">
            {hostname}
          </p>
        )}
        {reason && (
          <p
            ref={ref}
            data-testid="dapp-reason"
            className="text-neutral-light text-sm"
          >
            {/* filled by ref */}
          </p>
        )}
      </div>
    </>
  )
}
