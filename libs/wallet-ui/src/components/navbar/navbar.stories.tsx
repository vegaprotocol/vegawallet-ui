import type { Meta, Story } from '@storybook/react'
import { HashRouter as Router } from 'react-router-dom'
import { NavBar } from '.'

export default {
  component: NavBar,
  title: 'Navbar',
} as Meta

const Template: Story = ({ networkMode }) => (
  <Router>
    <NavBar networkMode={networkMode} />
  </Router>
)

export const Default = Template.bind({})
Default.args = {
  networkMode: 'dev',
}

export const Fairground = Template.bind({})
Fairground.args = {
  networkMode: 'fairground',
}

export const Mainnet = Template.bind({})
Mainnet.args = {
  networkMode: 'mainnet',
}
