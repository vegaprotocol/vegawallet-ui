import type { Meta, Story } from '@storybook/react'
import { CollapsiblePanel } from './collapsible-panel'

export default {
  component: CollapsiblePanel,
  title: 'CollapsiblePanel',
} as Meta

const Template: Story = (props) => (
  <CollapsiblePanel
    initiallyOpen={props.initiallyOpen}
    title="Some title for the panel"
    panelContent={
      <div className="bg-vega-pink-500">Here is my panel content</div>
    }
  />
)

export const Default = Template.bind({})
Default.args = {
  initiallyOpen: false,
}

export const OpenInitially = Template.bind({})
OpenInitially.args = {
  initiallyOpen: true,
}
