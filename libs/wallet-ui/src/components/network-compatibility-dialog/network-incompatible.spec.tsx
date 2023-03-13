import { fireEvent, render, screen } from '@testing-library/react'
import { NetworkIncompatible } from './network-incompatible'

const renderComponent = () => {
  const onContinue = jest.fn()
  const onChangeNetwork = jest.fn()
  render(
    <NetworkIncompatible
      supportedVersion="0.0.1"
      networkData={{
        network: 'testnet',
        isCompatible: false,
        retrievedVersion: '0.0.2',
      }}
      onContinue={onContinue}
      onChangeNetwork={onChangeNetwork}
    />
  )
  return {
    onChangeNetwork,
    onContinue,
  }
}

describe('NetworkIncompatible', () => {
  it('should render description message', () => {
    renderComponent()
    expect(
      screen.getByTestId('network-compatibility-info-text')
    ).toHaveTextContent(
      `This software and the network testnet are relying on different network software versions. You may encounter compatibility issues, such as transactions not being seen by the network.The network testnet is currently running on version "0.0.2", while this software is running on version "0.0.1".`
    )
  })
  it('should render download new release button', () => {
    renderComponent()
    expect(
      screen.getByTestId('network-compatibility-release')
    ).toHaveTextContent('Get wallet app for 0.0.2')
    expect(screen.getByTestId('network-compatibility-release')).toHaveAttribute(
      'href',
      'https://github.com/vegaprotocol/vegawallet-desktop/releases'
    )
  })
  it('should render call onChangeNetwork when edit button is pressed', () => {
    const { onChangeNetwork } = renderComponent()
    expect(
      screen.getByTestId('network-compatibility-change')
    ).toHaveTextContent('Change network')
    fireEvent.click(screen.getByTestId('network-compatibility-change'))
    expect(onChangeNetwork).toHaveBeenCalled()
  })
  it('should render call onContinue when continue button is pressed', () => {
    const { onContinue } = renderComponent()

    expect(
      screen.getByTestId('network-compatibility-continue')
    ).toHaveTextContent('Continue with existing network')
    fireEvent.click(screen.getByTestId('network-compatibility-continue'))
    expect(onContinue).toHaveBeenCalled()
  })
})
