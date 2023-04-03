import type { Meta, Story } from '@storybook/react'
import { service, client, runtime } from '../../../mocks'
import { GlobalProvider } from '../../../contexts/global/global-provider'
import { SettingsHome } from './home'

export default {
  component: SettingsHome,
  title: 'Pages/Settings/Home',
} as Meta

const Template: Story = () => (
  <GlobalProvider service={service} client={client} runtime={runtime}>
    <SettingsHome />
  </GlobalProvider>
)

export const Default = Template.bind({})
Default.args = {}
