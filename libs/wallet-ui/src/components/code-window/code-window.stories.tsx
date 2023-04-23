import type { Meta, Story } from '@storybook/react'
import { CodeWindow } from './code-window'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

export default {
  component: CodeWindow,
  title: 'CodeWindow',
} as Meta

const Template: Story = () => <CodeWindow text="foo" content="foo" />

let count = 0
export const ContentInsertion: Story = () => {
  const [content, setContent] = useState<ReactNode[]>([])
  useEffect(() => {
    const interval = setInterval(() => {
      count++
      setContent((curr) => {
        return [...curr, <p>Message: {count}</p>]
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return <CodeWindow text="foo" content={content} />
}

export const Default = Template.bind({})
Default.args = {}
