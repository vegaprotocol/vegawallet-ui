import type { ReactNode } from 'react'
import { Settings } from '../icons/settings'
import { Wallet } from '../icons/wallet'
import type { To } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { LeftRightArrows } from '../icons/left-right-arrows'

export interface NavButtonProps {
  end?: boolean
  icon: ReactNode
  text: string
  to: To
  isFairground: boolean
}

const TEXT_COLOR = {
  fairground: {
    active: 'text-black',
    inactive: 'text-dark-300',
  },
  default: {
    active: 'text-white',
    inactive: 'text-dark-300',
  },
}

export const NavButton = ({
  icon,
  text,
  to,
  end,
  isFairground,
}: NavButtonProps) => {
  const textColors = isFairground ? TEXT_COLOR.fairground : TEXT_COLOR.default
  return (
    <NavLink end={end} data-testid="nav-button" to={to} className="text-center">
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
                'bg-vega-yellow': isActive && !isFairground,
                'bg-black': isActive && isFairground,
              })}
            />
          </div>
        )
      }}
    </NavLink>
  )
}

export const NAVBAR_HEIGHT = 88

export const NavBar = ({ isFairground }: { isFairground: boolean }) => {
  return (
    <nav
      data-testid="nav-bar"
      className={classnames(
        'absolute z-10 w-full h-[88px] grid gap-0 grid-cols-[1fr_1fr_1fr] border-t border-dark-200',
        {
          'bg-black': !isFairground,
          'bg-vega-yellow-500': isFairground,
        }
      )}
    >
      <NavButton
        isFairground={isFairground}
        end={true}
        icon={
          <Wallet
            className="m-auto"
            squareFill={isFairground ? '#D7FB50' : 'black'}
          />
        }
        to={{ pathname: '/' }}
        text="Wallets"
      />
      <NavButton
        isFairground={isFairground}
        icon={<LeftRightArrows className="m-auto" />}
        to={{ pathname: '/transactions' }}
        text="Transactions"
      />
      <NavButton
        isFairground={isFairground}
        icon={<Settings className="m-auto" />}
        to={{ pathname: '/settings' }}
        text="Settings"
      />
    </nav>
  )
}
