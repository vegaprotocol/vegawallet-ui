import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import type { ReactNode, CSSProperties } from 'react'

import { Colors } from '../../config/colors'

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
        style={{ background: Colors.DARK_GRAY_3, padding: 10 }}
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
  return <DropdownPrimitive.Item {...props}>{children}</DropdownPrimitive.Item>
}
