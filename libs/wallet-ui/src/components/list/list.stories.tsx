import type { Meta, Story } from '@storybook/react'
import { List } from './list'

export default {
  component: List,
  title: 'List',
} as Meta

interface Item {
  name: string
  id: string
}

const Template: Story = ({ items }) => (
  <List<Item>
    items={items}
    idProp="id"
    empty={<p>Empty</p>}
    renderItem={(i) => <li>{i.name}</li>}
  />
)

export const Empty = Template.bind({})
Empty.args = {
  items: [],
}

export const Default = Template.bind({})
Default.args = {
  items: [
    {
      name: 'Item 1',
      id: '1',
    },
    {
      name: 'Item 2',
      id: '2',
    },
    {
      name: 'Item 3',
      id: '3',
    },
  ],
}
