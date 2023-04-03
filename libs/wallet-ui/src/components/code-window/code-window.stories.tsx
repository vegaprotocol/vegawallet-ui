import type { Meta, Story } from '@storybook/react'
import { CodeWindow } from './code-window'

export default {
  component: CodeWindow,
  title: 'CodeWindow',
} as Meta

const Template: Story = () => <CodeWindow text="foo" content="foo" />

export const Default = Template.bind({})
Default.args = {}
