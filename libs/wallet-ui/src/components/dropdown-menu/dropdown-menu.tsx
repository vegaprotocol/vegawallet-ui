import classnames from 'classnames'
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import type { ReactNode, CSSProperties } from 'react'

interface DropdownMenuProps {
  trigger: ReactNode
  content: ReactNode
  style?: CSSProperties
}

export function DropdownMenu({ trigger, content }: DropdownMenuProps) {
  return (
    <DropdownPrimitive.Root>
      <DropdownPrimitive.Trigger asChild={true}>
        {trigger}
      </DropdownPrimitive.Trigger>
      <DropdownPrimitive.Content
        align="start"
        sideOffset={10}
        className="bg-dark-200"
      >
        {content}
      </DropdownPrimitive.Content>
    </DropdownPrimitive.Root>
  )
}

export function DropdownItem({
  children,
  ...props
}: DropdownPrimitive.MenuItemProps) {
  return (
    <DropdownPrimitive.Item
      {...props}
      className={classnames('px-[10px] hover:bg-dark-300', props.className)}
    >
      {children}
    </DropdownPrimitive.Item>
  )
}
