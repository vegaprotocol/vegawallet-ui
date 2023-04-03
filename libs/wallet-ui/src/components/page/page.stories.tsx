import type { Meta, Story } from '@storybook/react'
import { Page } from './page'

export default {
  component: Page,
  title: 'Page',
} as Meta

const Template: Story = ({ name, back }) => (
  <Page name={name} back={back}>
    <div>Content</div>
  </Page>
)

export const Default = Template.bind({})
Default.args = {
  name: 'Page',
  back: false,
}

export const Backable = Template.bind({})
Backable.args = {
  name: 'Page',
  back: true,
}
