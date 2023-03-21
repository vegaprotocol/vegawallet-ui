import { render, screen } from '@testing-library/react'

import { ButtonGroup } from '.'

test('renders children', () => {
  const buttonText = 'Foo'
  render(
    <ButtonGroup>
      <button type="submit">{buttonText}</button>
    </ButtonGroup>
  )

  const button = screen.getByRole('button')
  expect(button).toBeInTheDocument()
  expect(button).toHaveTextContent(buttonText)
})

test('renders nothing if children are not valid', () => {
  render(<ButtonGroup>foo</ButtonGroup>)
  expect(screen.getByTestId('button-group')).toBeEmptyDOMElement()
})
