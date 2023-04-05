import type { Meta, Story } from '@storybook/react'
import { HelperText } from './helper-text'

export default {
  component: HelperText,
  title: 'HelperText',
} as Meta

const Template: Story = () => <HelperText text="Some random helper text" />

export const Default = Template.bind({})
Default.args = {}
