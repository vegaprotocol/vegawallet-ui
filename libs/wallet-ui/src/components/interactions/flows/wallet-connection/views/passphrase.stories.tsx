import type { Meta, Story } from '@storybook/react'
import { GlobalProvider } from '../../../../../contexts/global/global-provider'
import { service, client, runtime } from '../../../../../../src/mocks'
import { PassphraseView } from './passphrase'

export default {
  component: PassphraseView,
  title: 'Interactions/Connection/Passphrase',
} as Meta

const NOOP = () => undefined

const Template: Story = () => (
  <GlobalProvider service={service} client={client} runtime={runtime}>
    <PassphraseView
      onClose={NOOP}
      onUpdate={NOOP}
      data={{
        traceID: 'traceID',
        workflow: 'WALLET_CONNECTION',
        view: 'connection',
        hostname: 'hostname',
        availableWallets: ['foo', 'bar', 'baz', 'qux'],
      }}
    />
  </GlobalProvider>
)

export const Default = Template.bind({})
Default.args = {}
