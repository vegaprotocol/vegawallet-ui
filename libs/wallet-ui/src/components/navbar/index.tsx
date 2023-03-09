import type { ReactNode } from 'react'
import { Settings } from '../icons/settings'
import { Wallet } from '../icons/wallet'
import type { To } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

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
            {isActive && (
              <span
                data-testid="link-active"
                className="absolute h-0.5 w-full bottom-[-1px] left-0 bg-vega-yellow"
              />
            )}
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
      className="w-full fixed h-20 grid gap-0 grid-cols-[1fr_1fr]"
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
