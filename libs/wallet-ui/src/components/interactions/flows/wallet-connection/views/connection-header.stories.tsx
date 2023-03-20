import type { Meta, Story } from '@storybook/react'
import { ConnectionHeader } from './connection-header'

export default {
  component: ConnectionHeader,
  title: 'Interactions/Connection/Header',
} as Meta

const Template: Story = () => <ConnectionHeader hostname="hostname" />

export const Default = Template.bind({})
Default.args = {}
