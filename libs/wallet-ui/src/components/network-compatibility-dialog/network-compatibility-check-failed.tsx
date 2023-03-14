import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'
import { CodeWindow } from '../code-window'

export const NetworkCompatibilityCheckFailed = ({
  onContinue,
  onChangeNetwork,
  error,
}: {
  onContinue: () => void
  onChangeNetwork: () => void
  error?: string
}) => {
  return (
    <div className="p-[20px]">
      <p className="mb-[20px]" data-testid="network-compatibility-failed-info">
        We were unable to verify network compatibility. Your connection may not
        work as expected, and transactions may not be seen by the network.
      </p>
      {error && <CodeWindow text={error} />}
      <ButtonGroup inline className="py-[20px]">
        <Button
          data-testid="network-compatibility-failed-edit"
          onClick={onChangeNetwork}
        >
          Change Network
        </Button>
        <ButtonUnstyled
          data-testid="network-compatibility-failed-change"
          onClick={onContinue}
        >
          Continue with existing network
        </ButtonUnstyled>
      </ButtonGroup>
    </div>
  )
}
