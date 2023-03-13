import { Button } from '../button'
import { ButtonGroup } from '../button-group'

export const NetworkCompatibilityCheckFailed = ({
  onContinue,
  onChangeNetwork,
}: {
  onContinue: () => void
  onChangeNetwork: () => void
}) => {
  return (
    <div className="p-[20px]">
      <p className="mb-[20px]" data-testid="network-compatibility-failed-info">
        Couldn't retrieve the network compatibility information from the nodes
        you are trying to connect to.
      </p>
      <ButtonGroup inline className="py-[20px]">
        <Button
          data-testid="network-compatibility-failed-edit"
          onClick={onChangeNetwork}
        >
          Change Network
        </Button>
        <Button
          data-testid="network-compatibility-failed-change"
          onClick={onContinue}
        >
          Continue with existing network
        </Button>
      </ButtonGroup>
    </div>
  )
}
