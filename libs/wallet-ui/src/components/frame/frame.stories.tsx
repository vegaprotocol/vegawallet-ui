import type { Meta, Story } from '@storybook/react'
import { Frame } from './frame'

export default {
  component: Frame,
  title: 'Frame',
} as Meta

const Template: Story = () => <Frame>Content</Frame>

export const Default = Template.bind({})
Default.args = {}
