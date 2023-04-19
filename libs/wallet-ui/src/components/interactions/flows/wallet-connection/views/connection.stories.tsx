import type { Meta, Story } from '@storybook/react'
import { GlobalProvider } from '../../../../../contexts/global/global-provider'
import { ConnectionView } from './connection'
import { service, client, runtime } from '../../../../../../src/mocks'

export default {
  component: ConnectionView,
  title: 'Interactions/Connection/Connection',
} as Meta

const NOOP = () => undefined

const Template: Story = () => (
  <GlobalProvider service={service} client={client} runtime={runtime}>
    <ConnectionView
      onClose={NOOP}
      onUpdate={NOOP}
      data={{
        traceID: 'traceID',
        workflow: 'WALLET_CONNECTION',
        view: 'connection',
        hostname: 'hostname',
        availableWallets: [],
      }}
    />
  </GlobalProvider>
)

export const Default = Template.bind({})
Default.args = {}
