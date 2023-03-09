import type { ReactNode } from 'react'
import { Settings } from '../icons/settings'
import { Wallet } from '../icons/wallet'
import type { To } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

export const NavButton = ({
  icon,
  text,
  to,
  end,
}: {
  end?: boolean
  icon: ReactNode
  text: string
  to: To
}) => {
  return (
    <NavLink end={end} data-testid="nav-button" to={to} className="text-center">
      {({ isActive }) => {
        return (
          <div className="h-full py-3 grid gap-0 grid-rows-[1fr_auto_auto]">
            <div className="grid items-center">{icon}</div>
            <span className="uppercase">{text}</span>
            <div
              data-testid="link-active"
              className={classNames('h-0.5 w-full bottom-[-1px]', {
                'bg-vega-yellow': isActive,
              })}
            />
          </div>
        )
      }}
    </NavLink>
  )
}

export const NavBar = () => {
  return (
    <nav
      data-testid="nav-bar"
      className="w-full h-20 grid gap-0 grid-cols-[1fr_1fr]"
    >
      <NavButton
        end={true}
        icon={<Wallet className="m-auto" />}
        to={{ pathname: '/' }}
        text="Wallets"
      />
      <NavButton
        icon={<Settings className="m-auto" />}
        to={{ pathname: '/settings' }}
        text="Settings"
      />
    </nav>
  )
}
