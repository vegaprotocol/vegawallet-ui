import { useEffect } from 'react'

import type {
  InteractionContentProps,
  SessionEnded,
} from '../../../types/interaction'

export const SessionEndComponent = ({
  onFinish,
}: InteractionContentProps<SessionEnded>) => {
  useEffect(() => {
    onFinish()
  }, [onFinish])

  return null
}
