import classnames from 'classnames'
import { useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Button } from '@vegaprotocol/ui-toolkit'

import { ButtonGroup } from '../../components/button-group'
import { Lock } from '../../components/icons/lock'
import { OpenLock } from '../../components/icons/open-lock'
import { AppStatus, useGlobal } from '../../contexts/global/global-context'
import { useOpenWallet } from '../../hooks/use-open-wallet'
import { sortWallet } from '../../lib/wallet-helpers'
import { Paths } from '../'
import { Page } from '../../components/page'

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
    <Page name="Wallets">
      <div
        data-testid="wallet-home"
        className="grid grid-rows-[1fr_min-content] min-h-full"
      >
        <div data-testid="wallet-list">
          {walletsList.map((w) => (
            <button
              className={classnames(
                'w-full flex items-center justify-between',
                'border-b border-vega-dark-150 py-3',
                'text-lg',
                {
                  'text-white': w.auth,
                  'text-vega-dark-300': !w.auth,
                }
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
        <ButtonGroup>
          <Link className="flex-1" to="/wallet-create">
            <Button data-testid="create-new-wallet" size="lg" fill={true}>
              Create wallet
            </Button>
          </Link>
          <Link className="flex-1" to="/wallet-import">
            <Button data-testid="import-wallet" size="lg" fill={true}>
              Import wallet
            </Button>
          </Link>
        </ButtonGroup>
      </div>
    </Page>
  )
}
