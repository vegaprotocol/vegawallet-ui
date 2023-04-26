import type { Meta, Story } from '@storybook/react'
import { WalletCreateFormSuccess } from './wallet-create-form-success'

export default {
  component: WalletCreateFormSuccess,
  title: 'Pages/WalletCreateForm/WalletCreateFormSuccess',
} as Meta

const response = {
  wallet: {
    name: 'newWallet',
    keyDerivationVersion: 1,
    recoveryPhrase:
      'first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth again again again again again',
  },
  key: {
    publicKey:
      '121ab24bcd351e37afbc6f5742d1deb41e85affb38c1b2e9c57217bdbb07b4b6',
    algorithm: {
      name: 'algo/name',
      version: 2,
    },
    metadata: [
      {
        key: 'name',
        value: 'my key',
      },
    ],
  },
}

const Template: Story = () => (
  <div className="p-5">
    <WalletCreateFormSuccess
      response={response}
      callToAction={<button>Call to action</button>}
    />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
