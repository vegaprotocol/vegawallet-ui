import type { Meta, Story } from '@storybook/react'
import { service, client, runtime } from '../../../mocks'
import { GlobalProvider } from '../../../contexts/global/global-provider'
import { Service } from './service'
import { MemoryRouter } from 'react-router-dom'

export default {
  component: Service,
  title: 'Pages/Settings/Service',
} as Meta

const Template: Story = () => (
  <MemoryRouter>
    <GlobalProvider service={service} client={client} runtime={runtime}>
      <Service />
    </GlobalProvider>
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {}
