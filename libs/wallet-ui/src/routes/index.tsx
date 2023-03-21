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
import { TransactionHome } from './transactions/home'
import { TransactionPage } from './transactions/:id/transaction'
import { TransactionKeys, TransactionStatus } from '@vegaprotocol/wallet-types'

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
          <Route index={true} element={<TransactionHome transactions={[]} />} />
          <Route
            path=":id"
            element={
              <TransactionPage
                transaction={{
                  id: '1',
                  type: TransactionKeys.WITHDRAW_SUBMISSION,
                  hostname: 'vega.xyz',
                  wallet: 'Wallet 1',
                  status: TransactionStatus.SUCCESS,
                  receivedAt: new Date(),
                  logs: [
                    {
                      type: 'Info',
                      message: 'Withdrawal submitted to the network',
                    },
                    {
                      type: 'Warning',
                      message: 'Withdrawal submitted to the network',
                    },
                    {
                      type: 'Error',
                      message: 'Withdrawal submitted to the network',
                    },
                    {
                      type: 'Success',
                      message: 'Withdrawal submitted to the network',
                    },
                  ],
                  publicKey:
                    'c1d9b39e5148b14d694020572cb591a8af971b9c5a4a185f3afa47bd9247c0da',
                  payload: {
                    nonce: '18290134391243719184',
                    blockHeight: '39347',
                    orderSubmission: {
                      marketId:
                        '10c7d40afd910eeac0c2cad186d79cb194090d5d5f13bd31e14c49fd1bded7e2',
                      price: '0',
                      size: '62',
                      side: 'SIDE_BUY',
                      timeInForce: 'TIME_IN_FORCE_GTT',
                      expiresAt: '1679416294197900655',
                      type: 'TYPE_LIMIT',
                      reference: 'traderbot',
                      peggedOrder: {
                        reference: 'PEGGED_REFERENCE_BEST_BID',
                        offset: '9',
                      },
                    },
                  },
                }}
              />
            }
          />
        </Route>
      </Route>
    </Routes>
  )
}
