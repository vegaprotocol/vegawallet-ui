import classnames from 'classnames'
import type { HTMLAttributes, ReactNode } from 'react'

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return (
    <code
      {...props}
      className={classnames(
        'block font-mono bg-transparent overflow-auto',
        'py-[10px] pr-[30px] pl-[15px] border border-white',
        className
      )}
    >
      {children}
    </code>
  )
}
