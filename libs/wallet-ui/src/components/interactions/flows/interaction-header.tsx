import { Icon } from '@vegaprotocol/ui-toolkit'
import { VegaIcon } from '../../icons/vega-icon'

export const InteractionHeader = ({
  hostname,
}: {
  hostname: string | undefined
}) => {
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
        <p data-testid="dapp-hostname" className="text-neutral-light">
          {hostname}
        </p>
      </div>
    </>
  )
}
