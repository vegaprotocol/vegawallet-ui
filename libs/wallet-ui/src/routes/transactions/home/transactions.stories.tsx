import type { Meta, Story } from '@storybook/react'
import { TransactionHome } from './transactions'

export default {
  component: TransactionHome,
  title: 'TransactionHome',
} as Meta

const Template: Story = ({ transactions }) => (
  <TransactionHome transactions={transactions} />
)

export const Empty = Template.bind({})
Empty.args = {
  transactions: [],
}

export const Default = Template.bind({})
Default.args = {
  transactions: [
    {
      id: '1',
      type: 'withdrawSubmission',
      hostname: 'vega.xyz',
      wallet: 'Wallet 1',
      publicKey:
        'c1d9b39e5148b14d694020572cb591a8af971b9c5a4a185f3afa47bd9247c0da',
      payload: {},
      status: 'pending',
      receivedAt: new Date(),
      logs: [{ type: 'info', message: 'Withdrawal submitted to the network' }],
      txHash: null,
      blockHeight: null,
      signature: null,
      error: null,
    },
    {
      id: '1',
      type: 'withdrawSubmission',
      hostname: 'vega.xyz',
      wallet: 'Wallet 1',
      publicKey:
        'c1d9b39e5148b14d694020572cb591a8af971b9c5a4a185f3afa47bd9247c0da',
      payload: {},
      status: 'success',
      receivedAt: new Date(),
      logs: [{ type: 'info', message: 'Withdrawal submitted to the network' }],
      txHash:
        '9BD4215DCDA4DC87F05305BBEF2544261771E9BC2986F78D96B86FD03ACAD4C0',
      blockHeight: null,
      signature: null,
      error: null,
    },
    {
      id: '1',
      type: 'withdrawSubmission',
      hostname: 'vega.xyz',
      wallet: 'Wallet 1',
      publicKey:
        'c1d9b39e5148b14d694020572cb591a8af971b9c5a4a185f3afa47bd9247c0da',
      payload: {},
      status: 'failure',
      receivedAt: new Date(),
      logs: [{ type: 'info', message: 'Withdrawal submitted to the network' }],
      txHash: null,
      blockHeight: null,
      signature: null,
      error: null,
    },
    {
      id: '1',
      type: 'withdrawSubmission',
      hostname: 'vega.xyz',
      wallet: 'Wallet 1',
      publicKey:
        'c1d9b39e5148b14d694020572cb591a8af971b9c5a4a185f3afa47bd9247c0da',
      payload: {},
      status: 'rejected',
      receivedAt: new Date(),
      logs: [{ type: 'info', message: 'Withdrawal submitted to the network' }],
      txHash: null,
      blockHeight: null,
      signature: null,
      error: null,
    },
  ],
}
