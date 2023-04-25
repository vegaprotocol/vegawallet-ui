import type { ReactNode } from 'react'
import { CopyWithTooltip } from '../copy-with-tooltip'

export const CodeWindow = ({
  content,
  text,
}: {
  content: ReactNode
  text: string
}) => {
  return (
    <div
      data-testid="code-window"
      className="mt-3 whitespace-pre max-h-60 text-xl flex border-dark-200 border p-5 rounded-md w-full"
    >
      <code
        data-testid="code-window-content"
        className="overflow-y-scroll w-full scrollbar-hide"
      >
        {content}
      </code>
      <CopyWithTooltip text={text} />
    </div>
  )
}
