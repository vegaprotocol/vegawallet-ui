import type { Meta, Story } from '@storybook/react'
import { service, client, runtime } from '../../../mocks'
import { GlobalProvider } from '../../../contexts/global/global-provider'
import { TransactionNotFound } from './transaction-not-found'

export default {
  component: TransactionNotFound,
  title: 'Pages/Transactions/TransactionNotFound',
} as Meta

const Template: Story = () => (
  <GlobalProvider service={service} client={client} runtime={runtime}>
    <TransactionNotFound />
  </GlobalProvider>
)

export const Default = Template.bind({})
Default.args = {}
