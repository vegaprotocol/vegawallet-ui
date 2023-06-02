import classnames from 'classnames'
import type { Connection } from '../../contexts/global/global-context'
import { ButtonUnstyled } from '../button-unstyled'
import { StatusCircle } from '../status-circle'

type ConnectionItemProps = {
  connection: Connection
  onManage: () => void
  onRemove: () => void
  onDisconnect: () => void
}

export const ConnectionItem = ({
  connection,
  onManage,
  onRemove,
  onDisconnect,
}: ConnectionItemProps) => {
  return (
    <div
      data-testid={`connection-${connection.hostname}`}
      className={classnames(
        'text-base',
        'flex justify-between items-center gap-[10px]',
        'py-[10px] px-0 border-t border-black'
      )}
    >
      <div className="">
        <code
          title={connection.hostname}
          className="block max-w-[420px] break-all"
        >
          <StatusCircle
            blinking={connection.active}
            background={connection.active ? 'bg-green' : 'bg-orange'}
          />
          {connection.hostname}
        </code>
      </div>
      <div className="flex gap-[10px]">
        <ButtonUnstyled data-testid="manage-button" onClick={onManage}>
          Manage
        </ButtonUnstyled>
        {connection.active && (
          <ButtonUnstyled
            data-testid="disconnect-button"
            onClick={onDisconnect}
          >
            Disconnect
          </ButtonUnstyled>
        )}
        {!connection.active && (
          <ButtonUnstyled data-testid="remove-button" onClick={onRemove}>
            Remove
          </ButtonUnstyled>
        )}
      </div>
    </div>
  )
}
