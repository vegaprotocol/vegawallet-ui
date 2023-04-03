import type { Meta, Story } from '@storybook/react'
import { service, client, runtime } from '../../../mocks'
import { GlobalProvider } from '../../../contexts/global/global-provider'
import { SettingsHome } from './home'
import { MemoryRouter } from 'react-router-dom'

export default {
  component: SettingsHome,
  title: 'Pages/Settings/Home',
} as Meta

const Template: Story = () => (
  <MemoryRouter>
    <GlobalProvider service={service} client={client} runtime={runtime}>
      <SettingsHome />
    </GlobalProvider>
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {}
