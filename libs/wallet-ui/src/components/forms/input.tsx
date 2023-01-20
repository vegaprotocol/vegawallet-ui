import classnames from 'classnames'
import type { ForwardedRef, InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { getDefaultClassName } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef(
  (
    { className, type = 'text', ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        {...props}
        type={type}
        ref={ref}
        autoCorrect="off"
        autoComplete="off"
        className={classnames(
          getDefaultClassName({ hasError: props['aria-invalid'] === 'true' }),
          className
        )}
      />
    )
  }
)
