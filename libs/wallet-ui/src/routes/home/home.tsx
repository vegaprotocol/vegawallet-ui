import classnames from 'classnames'
import { useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { Button } from '../../components/button'
import { ButtonGroup } from '../../components/button-group'
import { ButtonUnstyled } from '../../components/button-unstyled'
import { Lock } from '../../components/icons/lock'
import { OpenLock } from '../../components/icons/open-lock'
import { Title } from '../../components/title'
import { AppStatus, useGlobal } from '../../contexts/global/global-context'
import { useOpenWallet } from '../../hooks/use-open-wallet'
import { sortWallet } from '../../lib/wallet-helpers'
import { Paths } from '../'

/**
 * Redirects to import if no wallets are loaded, or to wallet home
 */
export const Home = () => {
  const { open } = useOpenWallet()
  const {
    state: { wallets, status },
    dispatch,
  } = useGlobal()

  const walletsList = useMemo(
    () => Object.values(wallets).sort(sortWallet),
    [wallets]
  )

  if (status === AppStatus.Onboarding) {
    return <Navigate to={Paths.Onboard.Home} />
  }

  return (
    <div data-testid="wallet-home" className="p-[20px]">
      <Title className="m-0 mb-[30px] text-white">Wallets</Title>
      <div className="pb-[144px] w-full">
        <div
          className={`border-b-${
            walletsList.length > 0 ? '1' : '0'
          } border-black`}
        >
          {walletsList.map((w) => (
            <ButtonUnstyled
              className={classnames(
                'w-full flex items-center justify-between no-underline',
                'border-t border-black py-[18px]'
              )}
              onClick={() => open(w.name)}
              data-testid={`wallet-${w.name.replace(' ', '-')}`}
              key={w.name}
            >
              <div>{w.name}</div>
              <div className="text-neutral">
                {w.auth ? (
                  <OpenLock className="w-[20px] mx-[20px]" />
                ) : (
                  <Lock className="w-[20px] mx-[20px]" />
                )}
              </div>
            </ButtonUnstyled>
          ))}
        </div>
      </div>
      <div
        className={classnames('text-center p-[20px] w-full bg-dark-100', {
          fixed: wallets.length,
          [`bottom-[70px]`]: wallets.length,
          'left-0': wallets.length,
        })}
      >
        <ButtonGroup className="mb-[20px]">
          <Link className="flex-1" to="/wallet-create">
            <Button data-testid="create-new-wallet" className="w-full">
              Create wallet
            </Button>
          </Link>
          <Link className="flex-1" to="/wallet-import">
            <Button data-testid="import-wallet" className="w-full">
              Import wallet
            </Button>
          </Link>
        </ButtonGroup>
        {/* TODO remove this */}
        <p>
          <ButtonUnstyled
            onClick={() => dispatch({ type: 'SET_SETTINGS_MODAL', open: true })}
            data-testid="home-settings"
          >
            App settings
          </ButtonUnstyled>
        </p>
      </div>
    </div>
  )
}
