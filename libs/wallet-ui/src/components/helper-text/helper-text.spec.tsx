import { render, screen } from '@testing-library/react'
import { HelperText } from './helper-text'

describe('HelperText', () => {
  it('should render text', () => {
    render(<HelperText text="Some random helper text" />)
    expect(screen.getByText('Some random helper text')).toBeInTheDocument()
  })
})
