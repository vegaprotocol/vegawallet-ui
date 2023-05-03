import classnames from 'classnames'
import type { LogContent } from '../../types/interaction'
import { CodeWindow } from '../code-window/code-window'

type Props = {
  logs: LogContent[]
}

export const TransactionLogs = ({ logs }: Props) => {
  return (
    <div style={{ maxWidth: 500 }}>
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
    </div>
  )
}
