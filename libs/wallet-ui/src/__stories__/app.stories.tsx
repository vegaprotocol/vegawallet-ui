import type { Story } from '@storybook/react'
import type { AppProps } from '../'
import { App } from '../'
import { service } from '../__mocks__/service'
import { client } from '../__mocks__/client'
import { runtime } from '../__mocks__/runtime'

export default {
  component: App,
  title: 'App',
}

const Template: Story<AppProps> = (args: AppProps) => <App {...args} />

export const Default = Template.bind({})
Default.args = {
  service,
  client,
  runtime,
}

export const Fairground = Template.bind({})
Fairground.args = {
  service,
  client,
  runtime,
  features: {
    FAIRGROUND_MODE: true,
    TELEMETRY_CHECK: false,
    NETWORK_COMPATIBILITY_WARNING: false,
  },
}
