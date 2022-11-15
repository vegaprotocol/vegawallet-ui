import type { HTMLAttributes, ReactNode } from 'react'

import { Colors } from '../../config/colors'

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function CodeBlock({ children, style, ...props }: CodeBlockProps) {
  return (
    <code
      {...props}
      style={{
        display: 'block',
        fontFamily: '"Roboto Mono", monospace',
        padding: '10px 30px 10px 15px',
        background: 'transparent',
        border: `1px solid ${Colors.WHITE}`,
        overflow: 'auto',
        ...style,
      }}
    >
      {children}
    </code>
  )
}
