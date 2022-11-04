import { useEffect, useRef } from 'react'

import { Colors, IntentBackgrounds } from '../../config/colors'
import { Intent } from '../../config/intent'
import { ButtonUnstyled } from '../button-unstyled'
import { Cross } from '../icons/cross'
import type { Toast as IToast } from '.'

export interface ToastProps {
  id: string
  message: React.ReactNode
  onDismiss: (toast: IToast) => void
  intent?: Intent
  timeout?: number
}

export function Toast({
  id,
  message,
  onDismiss,
  intent = Intent.NONE,
  timeout = 2000
}: ToastProps) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>()

  const startTimeout = () => {
    if (timeout && timeout > 0) {
      cancelTimeout()
      timeoutRef.current = setTimeout(() => {
        dismiss()
      }, timeout)
    }
  }

  const cancelTimeout = () => {
    clearTimeout(timeoutRef.current)
  }

  const dismiss = () => {
    cancelTimeout()
    if (typeof onDismiss === 'function') {
      onDismiss({ id, message, intent, timeout })
    }
  }

  useEffect(() => {
    startTimeout()
    return () => {
      cancelTimeout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      style={{
        background: Colors.BLACK,
        borderRadius: 2,
        maxWidth: '90vw',
        overflow: 'hidden',
        pointerEvents: 'all' // Re enable pointer events as overlay container disables
      }}
      data-testid='toast'
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        style={{
          position: 'relative',
          padding: '10px 45px 10px 15px',
          background: IntentBackgrounds[intent]
        }}
        role="alert"
        onBlur={startTimeout}
        onFocus={cancelTimeout}
        onMouseEnter={cancelTimeout}
        onMouseLeave={startTimeout}
        /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
        tabIndex={0}
      >
        <span style={{ wordBreak: 'break-word' }}>{message}</span>
        <ButtonUnstyled
          data-testid='close'
          onClick={dismiss}
          style={{ position: 'absolute', top: 0, right: 0 }}
        >
          <Cross style={{ width: 40, height: 40 }} />
        </ButtonUnstyled>
      </div>
    </div>
  )
}
