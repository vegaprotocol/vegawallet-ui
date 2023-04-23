import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { CopyWithTooltip } from '../copy-with-tooltip'

export const CodeWindow = ({
  content,
  text,
}: {
  content: ReactNode
  text: string
}) => {
  const codeElRef = useRef<HTMLDivElement>(null)

  // scroll to the dummy element when new logs arrive
  useEffect(() => {
    if (codeElRef.current) {
      codeElRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [content])

  return (
    <div
      data-testid="code-window"
      className="mt-3 whitespace-pre max-h-60 text-xl flex border-dark-200 border border-2 p-5 rounded-md w-full"
    >
      <code
        data-testid="code-window-content"
        className="overflow-y-scroll w-full scrollbar-hide"
      >
        {content}
        <span ref={codeElRef} className="block w-1 h-1" />
      </code>
      <CopyWithTooltip text={text} />
    </div>
  )
}
