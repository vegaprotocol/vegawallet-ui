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
        // @ts-ignore Fix automatic capitalization ifor input fields in desktop app
        autocorrect="off"
        autocomplete="off"
        className={classnames(
          getDefaultClassName({ hasError: props['aria-invalid'] === 'true' }),
          className
        )}
      />
    )
  }
)
