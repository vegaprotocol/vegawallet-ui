import { render, screen } from '@testing-library/react'
import type { NavButtonProps } from '.'
import { NavButton, NavBar } from '.'
import { MemoryRouter } from 'react-router-dom'
import type { HTMLAttributes } from 'react'
import type { GlobalContextShape } from '../../contexts/global/global-context'
import { GlobalContext } from '../../contexts/global/global-context'
import type { Features } from '../../types'

jest.mock('@vegaprotocol/ui-toolkit', () => ({
  Button: (props: HTMLAttributes<HTMLButtonElement>) => <button {...props} />,
}))

const renderNavButton = (
  props: NavButtonProps,
  initialEntries: string[] = []
) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <GlobalContext.Provider
        value={
          {
            actions: { setDrawerAction: jest.fn() },
            dispatch: jest.fn(),
          } as unknown as GlobalContextShape
        }
      >
        <NavButton {...props} />
      </GlobalContext.Provider>
    </MemoryRouter>
  )

const renderNav = ({
  networkMode,
}: {
  networkMode: Features['NETWORK_MODE']
}) =>
  render(
    <MemoryRouter>
      <GlobalContext.Provider
        value={
          {
            actions: { setDrawerAction: jest.fn() },
            dispatch: jest.fn(),
          } as unknown as GlobalContextShape
        }
      >
        <NavBar networkMode={networkMode} />
      </GlobalContext.Provider>
    </MemoryRouter>
  )

// eslint-disable-next-line jest/no-disabled-tests
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

// eslint-disable-next-line jest/no-disabled-tests
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
