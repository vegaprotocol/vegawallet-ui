import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ReactElement, ReactNode } from 'react'

import { Colors } from '../../config/colors'

interface TooltipProps {
  trigger: ReactElement
  content: ReactNode
  isOpen?: boolean
}

export function Tooltip({ trigger, content, isOpen }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root open={isOpen}>
        <TooltipPrimitive.Trigger asChild={true}>
          {trigger}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content className="bg-white py-[5px] px-[10px] text-dark-100">
          <TooltipPrimitive.Arrow fill={Colors.WHITE} />
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
