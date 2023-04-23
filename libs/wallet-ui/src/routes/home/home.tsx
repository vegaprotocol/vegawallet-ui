import classnames from 'classnames'
import { useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Button } from '@vegaprotocol/ui-toolkit'

import { ButtonGroup } from '../../components/button-group'
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
  } = useGlobal()

  const walletsList = useMemo(
    () => Object.values(wallets).sort(sortWallet),
    [wallets]
  )

  if (status === AppStatus.Onboarding) {
    return <Navigate to={Paths.Onboard.Home} />
  }

  return (
    <div
      data-testid="wallet-home"
      className="grid grid-rows-[min-content_1fr_min-content] min-h-full"
    >
      <Title>Wallets</Title>
      <div data-testid="wallet-list">
        <div
          className={`border-b-${
            walletsList.length > 0 ? '1' : '0'
          } border-black`}
        >
          {walletsList.map((w) => (
            <button
              className={classnames(
                'w-full flex items-center justify-between',
                'border-t border-black py-4'
              )}
              onClick={() => open(w.name)}
              data-testid={`wallet-${w.name.replace(' ', '-')}`}
              key={w.name}
            >
              <div data-testid="wallet-name">{w.name}</div>
              <div className="text-neutral">
                {w.auth ? (
                  <OpenLock className="w-5 mx-5" />
                ) : (
                  <Lock className="w-5 mx-5" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      <ButtonGroup>
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
    </div>
  )
}
