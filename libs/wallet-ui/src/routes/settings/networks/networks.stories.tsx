import type { Meta, Story } from '@storybook/react'
import { service, client, runtime } from '../../../mocks'
import { GlobalProvider } from '../../../contexts/global/global-provider'
import { Networks } from './networks'
import { MemoryRouter } from 'react-router-dom'

export default {
  component: Networks,
  title: 'Pages/Settings/Networks',
} as Meta

const Template: Story = () => (
  <MemoryRouter>
    <GlobalProvider service={service} client={client} runtime={runtime}>
      <Networks />
    </GlobalProvider>
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {}
