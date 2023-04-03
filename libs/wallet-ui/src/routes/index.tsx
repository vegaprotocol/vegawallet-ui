import { Outlet, Route, Routes } from 'react-router-dom'

import { Home } from './home'
import { Onboard } from './onboard'
import { Wallet } from './wallet'
import { WalletList } from './wallet/home'
import { WalletKeyPair } from './wallet/keypair'
import { KeyPairHome } from './wallet/keypair/home'
import { Transactions } from './wallet/keypair/transactions'
import { WalletCreate } from './wallet-create'
import { WalletImport } from './wallet-import'
import { OnboardHome } from './onboard/home'
import { OnboardStart } from './onboard/start'
import { TransactionHomePage } from './transactions/home'
import { TransactionPage } from './transactions/:id/transaction'
import { SettingsHome } from './settings'

export const Paths = {
  Home: '/',
  Onboard: {
    Home: '/onboard',
    Start: '/onboard/start',
    VegaHome: '/onboard/vega-home',
  },
  Wallet: {
    Home: '/wallet',
    Create: '/wallet-create',
    Import: '/wallet-import',
    Wallet: (wallet: string) => `/wallet/${wallet}`,
    Transactions: (wallet: string, pubkey: string) =>
      `/wallet/${wallet}/keypair/${pubkey}/transactions`,
    Keypair: (wallet: string, pubkey: string) =>
      `/wallet/${wallet}/keypair/${pubkey}`,
  },
  Transactions: {
    Home: '/transactions',
    Transaction: (id: string) => `/transactions/${id}`,
  },
  Settings: {
    Home: '/settings',
  },
}

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route index={true} element={<Home />} />
        <Route path={Paths.Onboard.Home} element={<Outlet />}>
          <Route index={true} element={<Onboard />} />
          <Route path="start" element={<OnboardStart />} />
          <Route path="vega-home" element={<OnboardHome />} />
        </Route>
        {/* TODO should be using subroutes */}
        <Route path={Paths.Wallet.Create} element={<WalletCreate />} />
        <Route path={Paths.Wallet.Import} element={<WalletImport />} />
        <Route path="wallet/:wallet" element={<Wallet />}>
          <Route index={true} element={<WalletList />} />
          <Route path="keypair/:pubkey" element={<WalletKeyPair />}>
            <Route index={true} element={<KeyPairHome />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
        </Route>
        <Route path={Paths.Transactions.Home} element={<Outlet />}>
          <Route index={true} element={<TransactionHomePage />} />
          <Route path=":id" element={<TransactionPage />} />
        </Route>
        <Route path={Paths.Settings.Home} element={<Outlet />}>
          <Route index={true} element={<SettingsHome />} />
        </Route>
      </Route>
    </Routes>
  )
}
