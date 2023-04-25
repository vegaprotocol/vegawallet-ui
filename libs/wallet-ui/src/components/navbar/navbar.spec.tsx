import { render, screen } from '@testing-library/react'
import type { NavButtonProps } from '.'
import { NavButton, NavBar } from '.'
import { MemoryRouter } from 'react-router-dom'
import type { Features } from '../../types'

const renderNavButton = (
  props: NavButtonProps,
  initialEntries: string[] = []
) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <NavButton {...props} />
    </MemoryRouter>
  )

const renderNav = ({
  networkMode,
}: {
  networkMode: Features['NETWORK_MODE']
}) =>
  render(
    <MemoryRouter>
      <NavBar networkMode={networkMode} />
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
        networkMode: 'mainnet',
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
        networkMode: 'mainnet',
      },
      ['/settings']
    )

    expect(screen.getByTestId('link-active')).toHaveClass('bg-vega-yellow')
  })

  it('changes style when in fairground mode', () => {
    const icon = <svg data-testid="test-icon" />
    renderNavButton(
      {
        icon: icon,
        text: 'Test Button',
        to: '/settings',
        end: false,
        networkMode: 'fairground',
      },
      ['/settings']
    )

    expect(screen.getByTestId('link-active')).toHaveClass('bg-black')
  })

  it('changes style when in dev mode', () => {
    const icon = <svg data-testid="test-icon" />
    renderNavButton(
      {
        icon: icon,
        text: 'Test Button',
        to: '/settings',
        end: false,
        networkMode: 'dev',
      },
      ['/settings']
    )

    expect(screen.getByTestId('link-active')).toHaveClass('bg-black')
  })
})

describe('NavBar', () => {
  it('renders with all three NavButtons', () => {
    renderNav({ networkMode: 'mainnet' })
    expect(screen.getByTestId('nav-bar')).toBeInTheDocument()
    expect(screen.getByTestId('nav-bar')).toHaveClass('bg-black')
    expect(screen.getAllByTestId('nav-button')).toHaveLength(3)
  })

  it('changes color if in fairground mode', () => {
    renderNav({ networkMode: 'fairground' })
    expect(screen.getByTestId('nav-bar')).toHaveClass('bg-vega-yellow-500')
  })

  it('changes color if in dev mode', () => {
    renderNav({ networkMode: 'dev' })
    expect(screen.getByTestId('nav-bar')).toHaveClass('bg-gray-300')
  })
})
