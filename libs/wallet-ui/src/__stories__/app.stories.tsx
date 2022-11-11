import type { Story } from '@storybook/react'
import type { AppProps } from '../app';
import { App } from '../app'
import { service } from '../../mocks/service'
import { runtime } from '../../mocks/runtime'

export default {
  component: App,
  title: 'App',
}

const Template: Story<AppProps> = (args: AppProps) => <App {...args} />

export const Default = Template.bind({})
Default.args = {
  service,
  runtime,
}
