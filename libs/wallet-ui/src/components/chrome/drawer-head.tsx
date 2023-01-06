import classnames from 'classnames'
import { useState } from 'react'

import { ButtonUnstyled } from '../button-unstyled'
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
    <ButtonUnstyled
      data-testid="network-drawer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classnames(
        'flex items-center justify-center rounded w-[45px] h-[45px]',
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
    </ButtonUnstyled>
  )
}
