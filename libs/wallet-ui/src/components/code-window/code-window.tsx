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
    <div className="mt-3 whitespace-pre max-h-60 text-xl flex border-dark-200 border border-2 p-5 rounded-md w-full">
      <code className="overflow-y-scroll w-full">{content}</code>
      <CopyWithTooltip text={text} />
    </div>
  )
}
