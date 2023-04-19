import type { Meta, Story } from '@storybook/react'
import { HashRouter as Router } from 'react-router-dom'
import { NavBar } from '.'

export default {
  component: NavBar,
  title: 'Navbar',
} as Meta

const Template: Story = ({ isFairground }) => (
  <Router>
    <NavBar isFairground={isFairground} />
  </Router>
)

export const Default = Template.bind({})
Default.args = {
  isFairground: false,
}

export const Fairground = Template.bind({})
Fairground.args = {
  isFairground: true,
}
