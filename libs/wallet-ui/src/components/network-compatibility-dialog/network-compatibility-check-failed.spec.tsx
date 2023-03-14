import { fireEvent, render, screen } from '@testing-library/react'
import { NetworkCompatibilityCheckFailed } from './network-compatibility-check-failed'

describe('NetworkCompatibilityCheckFailed', () => {
  it('should render description message', () => {
    const onContinue = jest.fn()
    const onChangeNetwork = jest.fn()
    render(
      <NetworkCompatibilityCheckFailed
        onContinue={onContinue}
        onChangeNetwork={onChangeNetwork}
      />
    )
    expect(
      screen.getByTestId('network-compatibility-failed-info')
    ).toHaveTextContent(
      'We were unable to verify network compatibility. Your connection may not work as expected, and transactions may not be seen by the network.'
    )
  })
  it('should render call onChangeNetwork when edit button is pressed', () => {
    const onContinue = jest.fn()
    const onChangeNetwork = jest.fn()
    render(
      <NetworkCompatibilityCheckFailed
        onContinue={onContinue}
        onChangeNetwork={onChangeNetwork}
      />
    )
    expect(
      screen.getByTestId('network-compatibility-failed-edit')
    ).toHaveTextContent('Change Network')
    fireEvent.click(screen.getByTestId('network-compatibility-failed-edit'))
    expect(onChangeNetwork).toHaveBeenCalled()
  })
  it('should render call onContinue when continue button is pressed', () => {
    const onContinue = jest.fn()
    const onChangeNetwork = jest.fn()
    render(
      <NetworkCompatibilityCheckFailed
        onContinue={onContinue}
        onChangeNetwork={onChangeNetwork}
      />
    )
    expect(
      screen.getByTestId('network-compatibility-failed-change')
    ).toHaveTextContent('Continue with existing network')
    fireEvent.click(screen.getByTestId('network-compatibility-failed-change'))
    expect(onContinue).toHaveBeenCalled()
  })
})
