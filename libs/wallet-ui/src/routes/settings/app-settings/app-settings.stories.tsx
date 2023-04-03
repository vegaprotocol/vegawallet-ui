import type { Meta, Story } from '@storybook/react'
import { service, client, runtime } from '../../../mocks'
import { GlobalProvider } from '../../../contexts/global/global-provider'
import { AppSettings } from './app-settings'
import { MemoryRouter } from 'react-router-dom'

export default {
  component: AppSettings,
  title: 'Pages/Settings/App',
} as Meta

const Template: Story = () => (
  <MemoryRouter>
    <GlobalProvider service={service} client={client} runtime={runtime}>
      <AppSettings />
    </GlobalProvider>
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {}
