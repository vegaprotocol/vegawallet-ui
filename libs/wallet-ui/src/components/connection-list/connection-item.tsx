import classnames from 'classnames'
import type { Connection } from '../../contexts/global/global-context'
import { ButtonUnstyled } from '../button-unstyled'
import { StatusCircle } from '../status-circle'

type ConnectionItemProps = {
  connection: Connection
  onManage: () => void
  onDisconnect: () => void
}

export const ConnectionItem = ({
  connection,
  onManage,
  onDisconnect,
}: ConnectionItemProps) => {
  return (
    <div
      className={classnames(
        'flex justify-between items-center gap-[20px]',
        'py-[20px] px-0 border-t-1 border-black'
      )}
    >
      <div className="min-w-0 basis-1/2">
        <code className="whitespace-nowrap overflow-hidden text-ellipsis">
          <StatusCircle
            blinking={connection.active}
            background={connection.active ? 'bg-green' : 'bg-orange'}
          />
          {connection.hostname}
        </code>
      </div>
      <div className="flex gap-[20px]">
        <ButtonUnstyled onClick={onManage}>Manage</ButtonUnstyled>
        <ButtonUnstyled className="hidden" onClick={onDisconnect}>
          Disconnect
        </ButtonUnstyled>
      </div>
    </div>
  )
}
