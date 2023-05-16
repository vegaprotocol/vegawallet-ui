import classnames from 'classnames'
import type { ReactNode, CSSProperties } from 'react'

import { Intent } from '../../config/intent'

interface FormGroupProps {
  children: ReactNode
  label?: ReactNode
  labelFor?: string
  helperText?: ReactNode
  intent?: Intent
  className?: string
  style?: CSSProperties
}

export function FormGroup({
  children,
  label,
  labelFor,
  helperText,
  className,
  intent = Intent.NONE,
}: FormGroupProps) {
  return (
    <div className={classnames('flex flex-col mb-[8px] text-base', className)}>
      <label htmlFor={labelFor}>{label}</label>
      <div className="relative mt-[5px] pb-[21px]">
        {children}
        {helperText && (
          <div
            data-testid="helper-text"
            className={classnames('mt-[5px] text-sm', `text-${intent}-light`)}
          >
            {helperText}
          </div>
        )}
      </div>
    </div>
  )
}
