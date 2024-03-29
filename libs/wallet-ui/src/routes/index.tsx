import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

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
import { AppSettings } from './settings/app-settings'
import { Networks } from './settings/networks'
import { Service } from './settings/service'
import { Layout } from '../layout'
import { GetStarted } from './onboard/get-started'
import { UnderstandRisks } from './onboard/understand-risks'
import { Disclaimer } from './onboard/disclaimer'

export const Paths = {
  Home: '/',
  Onboard: {
    Home: '/onboard',
    Start: '/onboard/start',
    VegaHome: '/onboard/vega-home',
    // "Get Started -> Understand the risks -> Disclaimer" flow
    GetStarted: '/onboard/get-started',
    UnderstandRisks: '/onboard/understand-the-risks',
    Disclaimer: '/onboard/disclaimer',
    // Create and import actions for onboarding layout
    WalletCreate: '/onboard/wallet-create',
    WalletImport: '/onboard/wallet-import',
  },
  Wallet: {
    Home: '/wallet',
    Create: '/wallet/wallet-create',
    Import: '/wallet/wallet-import',
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
    AppSettings: '/settings/app-settings',
    Networks: '/settings/networks',
    Service: '/settings/service',
    Disclaimer: '/settings/disclaimer',
  },
}

export const AppRouter = () => {
  return (
    <Routes>
      <Route index={true} element={<Navigate to={Paths.Wallet.Home} />} />
      <Route path={Paths.Onboard.Home} element={<Outlet />}>
        <Route index={true} element={<Onboard />} />
        <Route path={Paths.Onboard.Start} element={<OnboardStart />} />
        <Route path={Paths.Onboard.VegaHome} element={<OnboardHome />} />

        {/* "Get Started -> Understand the risks -> Disclaimer" flow */}
        <Route path={Paths.Onboard.GetStarted} element={<GetStarted />} />
        <Route
          path={Paths.Onboard.UnderstandRisks}
          element={<UnderstandRisks />}
        />
        <Route path={Paths.Onboard.Disclaimer} element={<Disclaimer />} />

        <Route path={Paths.Onboard.WalletCreate} element={<WalletCreate />} />
        <Route path={Paths.Onboard.WalletImport} element={<WalletImport />} />
      </Route>
      <Route path={Paths.Wallet.Home} element={<Layout />}>
        <Route index={true} element={<Home />} />
        <Route path={Paths.Wallet.Create} element={<WalletCreate />} />
        <Route path={Paths.Wallet.Import} element={<WalletImport />} />
        <Route path={Paths.Wallet.Wallet(':wallet')} element={<Wallet />}>
          <Route index={true} element={<WalletList />} />
          <Route path="keypair/:pubkey" element={<WalletKeyPair />}>
            <Route index={true} element={<KeyPairHome />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
        </Route>
      </Route>
      <Route path={Paths.Transactions.Home} element={<Layout />}>
        <Route index={true} element={<TransactionHomePage />} />
        <Route path=":id" element={<TransactionPage />} />
      </Route>
      <Route path={Paths.Settings.Home} element={<Layout />}>
        <Route index={true} element={<SettingsHome />} />
        <Route path={Paths.Settings.AppSettings} element={<AppSettings />} />
        <Route path={Paths.Settings.Networks} element={<Networks />} />
        <Route path={Paths.Settings.Service} element={<Service />} />
        <Route path={Paths.Settings.Disclaimer} element={<Disclaimer />} />
      </Route>
    </Routes>
  )
}
