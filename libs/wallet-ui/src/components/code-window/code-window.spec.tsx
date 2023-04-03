import { render, screen } from '@testing-library/react'
import { CodeWindow } from './code-window'

jest.mock('../copy-with-tooltip', () => ({
  CopyWithTooltip: () => <div data-testid="copy-button" />,
}))

const renderComponent = () => {
  return render(
    <CodeWindow
      text="Title"
      content={JSON.stringify({ foo: 'bar', baz: 'qux' }, null, 2)}
    />
  )
}

describe('Code window', () => {
  it('Renders content and copy with tooltip', () => {
    renderComponent()
    expect(screen.getByTestId('code-window')).toBeInTheDocument()
    expect(screen.getByTestId('code-window-content')).toHaveTextContent(
      '{ "foo": "bar", "baz": "qux" }'
    )
    expect(screen.getByTestId('copy-button')).toBeInTheDocument()
  })
})
