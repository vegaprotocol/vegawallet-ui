import type { ReactNode } from 'react'
import { Settings } from '../icons/settings'
import { Wallet } from '../icons/wallet'
import type { To } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { LeftRightArrows } from '../icons/left-right-arrows'
import { Paths } from '../../routes'
import { useGlobal } from '../../contexts/global/global-context'
import type { Features } from '../../types'

export interface NavButtonProps {
  end?: boolean
  icon: ReactNode
  text: string
  to: To
  networkMode: Features['NETWORK_MODE']
}

const getTextColors = (networkMode: Features['NETWORK_MODE']) => {
  switch (networkMode) {
    case 'mainnet':
      return {
        active: 'text-white',
        inactive: 'text-dark-300',
      }
    default:
      return {
        active: 'text-black',
        inactive: 'text-dark-300',
      }
  }
}

export const NavButton = ({
  icon,
  text,
  to,
  end,
  networkMode,
}: NavButtonProps) => {
  const { dispatch, actions } = useGlobal()
  const textColors = getTextColors(networkMode)

  return (
    <NavLink
      end={end}
      data-testid="nav-button"
      to={to}
      className="text-center"
      onClick={() => {
        dispatch(actions.setDrawerAction(false))
      }}
    >
      {({ isActive }) => {
        const textColor = isActive ? textColors.active : textColors.inactive

        return (
          <div className="h-full grid gap-0 grid-rows-[1fr_auto_auto]">
            <div className={classnames('grid items-center mt-5', textColor)}>
              {icon}
            </div>
            <span className={classnames('uppercase mt-3 text-sm', textColor)}>
              {text}
            </span>
            <div
              data-testid="link-active"
              className={classnames('h-2 w-full mt-3', {
                'bg-vega-yellow': isActive && networkMode === 'mainnet',
                'bg-black':
                  isActive &&
                  (!networkMode ||
                    networkMode === 'dev' ||
                    networkMode === 'fairground'),
              })}
            />
          </div>
        )
      }}
    </NavLink>
  )
}

export const NAVBAR_HEIGHT = 88

const getSquareFill = (networkMode: Features['NETWORK_MODE']) => {
  switch (networkMode) {
    case 'mainnet':
      return 'black'
    // bg-vega-yellow
    case 'fairground':
      return '#D7FB50'
    // bg-gray-300
    default:
      return '#D1D5DB'
  }
}

export const NavBar = ({
  networkMode,
}: {
  networkMode: Features['NETWORK_MODE']
}) => {
  return (
    <nav
      data-testid="nav-bar"
      className={classnames(
        'w-full h-full grid gap-0 grid-cols-[1fr_1fr_1fr] border-t border-dark-200',
        {
          'bg-gray-300': !networkMode || networkMode === 'dev',
          'bg-black': networkMode === 'mainnet',
          'bg-vega-yellow-500': networkMode === 'fairground',
        }
      )}
    >
      <NavButton
        networkMode={networkMode}
        icon={
          <Wallet className="m-auto" squareFill={getSquareFill(networkMode)} />
        }
        to={{ pathname: Paths.Wallet.Home }}
        text="Wallets"
      />
      <NavButton
        networkMode={networkMode}
        icon={<LeftRightArrows className="m-auto" />}
        to={{ pathname: Paths.Transactions.Home }}
        text="Transactions"
      />
      <NavButton
        networkMode={networkMode}
        icon={<Settings className="m-auto" />}
        to={{ pathname: Paths.Settings.Home }}
        text="Settings"
      />
    </nav>
  )
}
