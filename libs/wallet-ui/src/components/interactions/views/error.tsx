import { Title } from '../../title'
import { Warning } from '../../icons/warning'
import type { ErrorOccurredContent } from '../../../types/interaction'

import { useEffect } from 'react'

export type InteractionErrorType =
  | ErrorOccurredContent
  | {
      type: 'Backend error'
      error: string
    }

export type InteractionErrorProps = {
  title: string
  type: string
  message: string
  onClose: () => void
}

export const InteractionError = ({
  title,
  type,
  message,
  onClose,
}: InteractionErrorProps) => {
  useEffect(() => {
    const stamp = setTimeout(() => {
      onClose()
    }, 1500)

    return () => clearTimeout(stamp)
  }, [onClose])

  return (
    <div className="flex flex-col py-[40px] justify-center items-center">
      <Title className="text-3xl">{title}</Title>
      <div className="border border-white rounded-sm p-[10px]">
        <Warning className="w-[48px]" />
      </div>
    </div>
  )
}
