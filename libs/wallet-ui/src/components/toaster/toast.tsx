import classnames from 'classnames'
import { useEffect, useRef } from 'react'

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
  timeout = 2000,
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
    timeoutRef.current && clearTimeout(timeoutRef.current)
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
      className={classnames(
        'bg-black rounded-sm max-w-[90vw]',
        'overflow-hidden pointer-events-auto'
      )}
      data-testid="toast"
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className={`relative py-[10px] pr-[45px] pl-[15px] bg-${intent}`}
        role="alert"
        onBlur={startTimeout}
        onFocus={cancelTimeout}
        onMouseEnter={cancelTimeout}
        onMouseLeave={startTimeout}
        /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
        tabIndex={0}
      >
        <span className="break-words">{message}</span>
        <ButtonUnstyled
          data-testid="close"
          onClick={dismiss}
          className="absolute top-0 right-0"
        >
          <Cross className="w-[40px] h-[40px]" />
        </ButtonUnstyled>
      </div>
    </div>
  )
}
