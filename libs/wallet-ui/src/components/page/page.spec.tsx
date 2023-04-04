import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Page } from './page'

describe('Page', () => {
  it('should header and content', () => {
    render(
      <MemoryRouter>
        <Page name="test">
          <span>Test content</span>
        </Page>
      </MemoryRouter>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
    expect(screen.getByTestId('test-header')).toHaveTextContent('test')
  })

  it('should render back button if back is present', () => {
    render(
      <MemoryRouter>
        <Page back={true} name="test">
          <span>Test content</span>
        </Page>
      </MemoryRouter>
    )
    expect(screen.getByTestId('page-back')).toBeInTheDocument()
  })
})
