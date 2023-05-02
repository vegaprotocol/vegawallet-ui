import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { CopyWithTooltip } from '../copy-with-tooltip'

type CodeWindowProps = {
  content: ReactNode
  text: string
}

export const CodeWindow = forwardRef<HTMLDivElement, CodeWindowProps>(
  ({ content, text }, ref) => {
    return (
      <div
        data-testid="code-window"
        className="mt-3 whitespace-pre max-h-60 text-xl flex border-dark-200 border p-5 rounded-md w-full"
      >
        <code
          ref={ref}
          data-testid="code-window-content"
          className="overflow-y-scroll w-full scrollbar-hide"
        >
          {content}
        </code>
        <CopyWithTooltip text={text} />
      </div>
    )
  }
)
