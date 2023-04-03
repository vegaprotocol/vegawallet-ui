import classnames from 'classnames'
import type { LogContent } from '../../types/interaction'
import { CodeWindow } from '../code-window/code-window'

type Props = {
  logs: LogContent[]
  isVisible: boolean
  className?: string
}

export const TransactionLogs = ({ logs, isVisible, className }: Props) => {
  return (
    <CodeWindow
      text={logs.join('\n')}
      content={logs.map((entry, i) => (
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
    />
  )
}
