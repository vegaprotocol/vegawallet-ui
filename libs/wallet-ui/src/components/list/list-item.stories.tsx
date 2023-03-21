import type { Meta, Story } from '@storybook/react'
import { ListItem } from './list-item'

export default {
  component: ListItem,
  title: 'ListItem',
} as Meta

const Template: Story = ({ item }) => (
  <ul>
    <ListItem item={item} idProp="id" renderItem={(i) => i.name} />
  </ul>
)

export const Default = Template.bind({})
Default.args = {
  item: {
    name: 'Item 1',
    id: '1',
  },
}
