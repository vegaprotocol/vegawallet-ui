import type { NetworkCompatibility } from '../../types'
import { AnchorButton, Button } from '../button'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'

export const NetworkIncompatible = ({
  networkData,
  supportedVersion,
  onChangeNetwork,
  onContinue,
}: {
  networkData: NetworkCompatibility
  supportedVersion: string
  onChangeNetwork: () => void
  onContinue: () => void
}) => {
  return (
    <div className="p-[20px]">
      {networkData.network && (
        <div data-testid="network-compatibility-info-text">
          <p className="mb-[20px]">
            This software and the network{' '}
            <code className="bg-dark-200 py-[1px] px-[5px]">
              {networkData.network}
            </code>{' '}
            are relying on different network software versions. You may
            encounter compatibility issues, such as transactions not being seen
            by the network.
          </p>
          <p>
            The network{' '}
            <code className="bg-dark-200 py-[1px] px-[5px]">
              {networkData.network}
            </code>{' '}
            is currently running on version "
            <code>{networkData.retrievedVersion}</code>", while this software is
            running on version "<code>{supportedVersion}</code>
            ".
          </p>
        </div>
      )}
      <ButtonGroup inline className="py-[20px]">
        {networkData.network && (
          <AnchorButton
            data-testid="network-compatibility-release"
            href="https://github.com/vegaprotocol/vegawallet-desktop/releases"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get wallet app for {networkData.retrievedVersion}
          </AnchorButton>
        )}
        <Button
          data-testid="network-compatibility-change"
          onClick={onChangeNetwork}
        >
          Change network
        </Button>
      </ButtonGroup>
      <ButtonUnstyled
        data-testid="network-compatibility-continue"
        onClick={onContinue}
      >
        Continue with existing network
      </ButtonUnstyled>
    </div>
  )
}
