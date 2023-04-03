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

// Root paths start with '/'
export enum Paths {
  Home = '/',
  Onboard = '/onboard',
  Wallet = '/wallet',
}

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index={true} element={<Home />} />
        <Route path="onboard" element={<Outlet />}>
          <Route index={true} element={<Onboard />} />
          <Route path="start" element={<OnboardStart />} />
          <Route path="vega-home" element={<OnboardHome />} />
        </Route>
        <Route path="wallet-create" element={<WalletCreate />} />
        <Route path="wallet-import" element={<WalletImport />} />
        <Route path="wallet/:wallet" element={<Wallet />}>
          <Route index={true} element={<WalletList />} />
          <Route path="keypair/:pubkey" element={<WalletKeyPair />}>
            <Route index={true} element={<KeyPairHome />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
        </Route>
        <Route path="transactions" element={<Outlet />}>
          <Route index={true} element={<TransactionHomePage />} />
          <Route path=":id" element={<TransactionPage />} />
        </Route>
        <Route path="settings" element={<Outlet />}>
          <Route index={true} element={<SettingsHome />} />
        </Route>
      </Route>
    </Routes>
  )
}
