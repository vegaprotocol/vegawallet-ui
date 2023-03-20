import type { Meta, Story } from '@storybook/react'
import { InteractionHeader } from './interaction-header'

export default {
  component: InteractionHeader,
  title: 'Interactions/Header',
} as Meta

const Template: Story = () => <InteractionHeader hostname="hostname" />

export const Default = Template.bind({})
Default.args = {}
