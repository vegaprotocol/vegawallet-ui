import type { Story } from '@storybook/react'
import { service } from '../../__mocks__/service'
import { client } from '../../__mocks__/client'
import { runtime } from '../../__mocks__/runtime'
import { OnboardStart } from './start'
import { MemoryRouter } from 'react-router-dom'
import { GlobalProvider } from '../../contexts/global/global-provider'

export default {
  component: OnboardStart,
  title: 'Pages/Onboard/Start',
}

const Template: Story = ({ features }) => (
  <MemoryRouter>
    <GlobalProvider
      service={service}
      client={client}
      runtime={runtime}
      features={features}
    >
      <OnboardStart />
    </GlobalProvider>
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {}

export const Fairground = Template.bind({})
Fairground.args = {
  features: {
    FAIRGROUND_MODE: true,
  },
}
