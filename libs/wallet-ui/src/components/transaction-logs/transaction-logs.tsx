import classnames from 'classnames'
import { CodeBlock } from '../code-block'
import type { LogContent } from '../../types/interaction'

type Props = {
  logs: LogContent[]
  isVisible: boolean
  className?: string
}

export const TransactionLogs = ({ logs, isVisible, className }: Props) => {
  return (
    <CodeBlock
      className={classnames('text-xs mb-0', className, {
        hidden: !isVisible,
      })}
    >
      {logs.map((entry, i) => (
        <p
          key={i}
          className={classnames({
            'text-success-light': entry.type === 'Success',
            'text-warning-light': entry.type === 'Warning',
            'text-danger-light': entry.type === 'Error',
            'text-neutral-light': entry.type === 'Info',
          })}
        >
          {entry.message}
        </p>
      ))}
    </CodeBlock>
  )
}
