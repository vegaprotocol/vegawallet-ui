import classnames from 'classnames'
import { useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'

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
      <div data-testid="wallet-home" className="flex-1 flex flex-col">
        <div data-testid="wallet-list" className="mb-4">
          {walletsList.map((w) => (
            <button
              className={classnames(
                'w-full flex items-center justify-between',
                'border-b border-vega-dark-150 py-3',
                'text-[18px]',
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
              <div className="">
                {w.auth ? (
                  <OpenLock className="w-[24px] mx-3 fill-vega-light-100" />
                ) : (
                  <Lock className="w-[24px] mx-3 fill-vega-dark-300" />
                )}
              </div>
            </button>
          ))}
        </div>
        <ButtonGroup>
          <Link
            className="flex-1 border border-vega-dark-300 rounded text-center p-3 uppercase"
            to="wallet-create"
            data-testid="create-new-wallet"
          >
            Create wallet
          </Link>
          <Link
            className="flex-1 border border-vega-dark-300 rounded text-center p-3 uppercase"
            to="wallet-import"
            data-testid="import-wallet"
          >
            Import wallet
          </Link>
        </ButtonGroup>
      </div>
    </Page>
  )
}
