import type { Story } from '@storybook/react'
import type { AppProps } from '../'
import { App } from '../'
// eslint-disable-next-line jest/no-mocks-import
import { service } from '../__mocks__/service'
// eslint-disable-next-line jest/no-mocks-import
import { client } from '../__mocks__/client'
// eslint-disable-next-line jest/no-mocks-import
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
