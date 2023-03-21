import type { Meta, Story } from '@storybook/react'
import { TransactionPage } from './transaction'
import { service, client, runtime } from '../../../mocks'
import { GlobalProvider } from '../../../contexts/global/global-provider'

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
    payload: {},
    status: 'success',
    receivedAt: new Date(),
    logs: [
      { type: 'Info', message: 'Withdrawal submitted to the network' },
      { type: 'Warning', message: 'Withdrawal submitted to the network' },
      { type: 'Error', message: 'Withdrawal submitted to the network' },
      { type: 'Success', message: 'Withdrawal submitted to the network' },
    ],
    txHash: '9BD4215DCDA4DC87F05305BBEF2544261771E9BC2986F78D96B86FD03ACAD4C0',
    blockHeight: 123456,
    signature: 'signature',
    error: null,
  },
}
