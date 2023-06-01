import classnames from 'classnames'
import { useMemo } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { ButtonGroup } from '../../components/button-group'
import { Lock } from '../../components/icons/lock'
import { OpenLock } from '../../components/icons/open-lock'
import { AppStatus, useGlobal } from '../../contexts/global/global-context'
import { useOpenWallet } from '../../hooks/use-open-wallet'
import { sortWallet } from '../../lib/wallet-helpers'
import { Paths } from '../'
import { Page } from '../../components/page'
import { Button } from '@vegaprotocol/ui-toolkit'

/**
 * Redirects to import if no wallets are loaded, or to wallet home
 */
export const Home = () => {
  const { open } = useOpenWallet()
  const {
    state: { wallets, status },
  } = useGlobal()
  const navigate = useNavigate()

  const walletsList = useMemo(
    () => Object.values(wallets).sort(sortWallet),
    [wallets]
  )

  if (status === AppStatus.Onboarding) {
    // navigate to "Get Started" page
    return <Navigate to={Paths.Onboard.GetStarted} />
  }

  return (
    <Page name="Wallets">
      <div
        data-testid="wallet-home"
        className="flex-1 flex flex-col justify-between h-full"
      >
        <div data-testid="wallet-list" className="mb-4">
          {walletsList.map((w) => (
            <button
              className={classnames(
                'w-full flex items-center justify-between',
                'border-b border-vega-dark-150 py-3 px-3',
                'text-xl',
                {
                  'text-white': w.auth,
                  'text-vega-dark-300': !w.auth,
                },
                'hover:bg-vega-dark-150'
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
        <ButtonGroup orientation="horizontal">
          <Button
            data-testid="create-new-wallet"
            fill={true}
            onClick={() => navigate(Paths.Wallet.Create)}
          >
            Create wallet
          </Button>
          <Button
            data-testid="import-wallet"
            fill={true}
            onClick={() => navigate(Paths.Wallet.Import)}
          >
            Import wallet
          </Button>
        </ButtonGroup>
      </div>
    </Page>
  )
}
