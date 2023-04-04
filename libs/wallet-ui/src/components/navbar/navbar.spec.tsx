import { render, screen } from '@testing-library/react'
import type { NavButtonProps } from '.'
import { NavButton, NavBar } from '.'
import { MemoryRouter } from 'react-router-dom'

const renderNavButton = (
  props: NavButtonProps,
  initialEntries: string[] = []
) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <NavButton {...props} />
    </MemoryRouter>
  )

const renderNav = () =>
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  )

describe('NavButton', () => {
  it('renders with text and icon', () => {
    const icon = <svg data-testid="test-icon" />
    renderNavButton(
      {
        icon: icon,
        text: 'Test Button',
        to: '/',
        end: false,
      },
      ['/foo']
    )

    expect(screen.getByTestId('nav-button')).toBeInTheDocument()
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    expect(screen.getByText('Test Button')).toBeInTheDocument()
    expect(screen.getByTestId('link-active')).not.toHaveClass('bg-vega-yellow')
  })

  it('renders with active link styles when active', () => {
    const icon = <svg data-testid="test-icon" />
    renderNavButton(
      {
        icon: icon,
        text: 'Test Button',
        to: '/settings',
        end: false,
      },
      ['/settings']
    )

    expect(screen.getByTestId('link-active')).toHaveClass('bg-vega-yellow')
  })
})

describe('NavBar', () => {
  it('renders with two NavButtons', () => {
    renderNav()
    expect(screen.getByTestId('nav-bar')).toBeInTheDocument()
    expect(screen.getAllByTestId('nav-button')).toHaveLength(3)
  })
})
