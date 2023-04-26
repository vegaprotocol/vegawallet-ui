import classnames from 'classnames'
import { useState } from 'react'

import { DropdownArrow } from '../icons/dropdown-arrow'
import { Title } from '../title'

interface DrawerHeadProps {
  title?: string | null
  height: number
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  children?: React.ReactNode
}

/** The part of the drawer that remains exposed */
export function DrawerHead({
  height,
  title,
  isOpen,
  setOpen,
  children,
}: DrawerHeadProps) {
  return (
    <div
      style={{ height }}
      className={classnames(
        'flex justify-between items-center py-[10px] px-[20px]',
        'border-b-1 border-dark-200 text-sm'
      )}
    >
      <div className="flex flex-col gap-[5px]">{children}</div>
      {title && <Title className="m-0">{title}</Title>}
      <div>
        <DrawerToggle isOpen={isOpen} setOpen={setOpen} />
      </div>
    </div>
  )
}

type DrawerToggleProps = {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}

function DrawerToggle({ isOpen, setOpen }: DrawerToggleProps) {
  const [hover, setHover] = useState(false)

  return (
    <button
      data-testid="network-drawer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classnames(
        'relative flex items-center justify-center rounded w-[45px] h-[45px] right-[-15px]',
        {
          'bg-dark-100': hover,
        }
      )}
      onClick={() => setOpen(!isOpen)}
    >
      <DropdownArrow
        className={classnames('w-[16px] h-[16px]', {
          'rotate-180': !isOpen,
        })}
      />
    </button>
  )
}
