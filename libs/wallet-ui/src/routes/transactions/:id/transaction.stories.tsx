import type { Meta, Story } from '@storybook/react'
import { TransactionPage } from './transaction'
import { service, client, runtime } from '../../../mocks'
import { GlobalProvider } from '../../../contexts/global/global-provider'
import { TransactionStatus } from '@vegaprotocol/wallet-types'

export default {
  component: TransactionPage,
  title: 'TransactionPage',
} as Meta

const Template: Story = ({ transaction }) => (
  <GlobalProvider service={service} client={client} runtime={runtime}>
    <TransactionPage transaction={transaction} />
  </GlobalProvider>
)

export const Default = Template.bind({})
Default.args = {
  transaction: {
    id: '1',
    type: 'withdrawSubmission',
    hostname: 'vega.xyz',
    wallet: 'Wallet 1',
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
    status: TransactionStatus.SUCCESS,
    receivedAt: new Date(),
    logs: [
      { type: 'Info', message: 'Withdrawal submitted to the network' },
      { type: 'Warning', message: 'Withdrawal submitted to the network' },
      { type: 'Error', message: 'Withdrawal submitted to the network' },
      { type: 'Success', message: 'Withdrawal submitted to the network' },
    ],
    txHash: '9BD4215DCDA4DC87F05305BBEF2544261771E9BC2986F78D96B86FD03ACAD4C0',
    blockHeight: 123456,
    signature:
      'signaturesignaturesignaturesignaturesignaturesignaturesignaturesignature',
    error: null,
  },
}

export const InProgress = Template.bind({})
InProgress.args = {
  transaction: {
    id: '1',
    type: 'withdrawSubmission',
    hostname: 'vega.xyz',
    wallet: 'Wallet 1',
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
    status: TransactionStatus.PENDING,
    receivedAt: new Date(),
    logs: [
      { type: 'Info', message: 'Withdrawal submitted to the network' },
      { type: 'Warning', message: 'Withdrawal submitted to the network' },
      { type: 'Error', message: 'Withdrawal submitted to the network' },
      { type: 'Success', message: 'Withdrawal submitted to the network' },
    ],
    txHash: null,
    blockHeight: null,
    signature: null,
    error: null,
  },
}

export const Errors = Template.bind({})
Errors.args = {
  transaction: {
    id: '1',
    type: 'withdrawSubmission',
    hostname: 'vega.xyz',
    wallet: 'Wallet 1',
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
    status: TransactionStatus.FAILURE,
    receivedAt: new Date(),
    logs: [
      { type: 'Info', message: 'Withdrawal submitted to the network' },
      { type: 'Warning', message: 'Withdrawal submitted to the network' },
      { type: 'Error', message: 'Withdrawal submitted to the network' },
      { type: 'Success', message: 'Withdrawal submitted to the network' },
    ],
    txHash: '9BD4215DCDA4DC87F05305BBEF2544261771E9BC2986F78D96B86FD03ACAD4C0',
    blockHeight: 123456,
    signature:
      'signaturesignaturesignaturesignaturesignaturesignaturesignaturesignature',
    error: 'Something went wrong',
  },
}
