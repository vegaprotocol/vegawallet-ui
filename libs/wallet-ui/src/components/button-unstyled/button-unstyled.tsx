import classnames from 'classnames'
import type { ButtonHTMLAttributes, ForwardedRef } from 'react'
import { forwardRef } from 'react'

export const ButtonUnstyled = forwardRef(
  (
    props: ButtonHTMLAttributes<HTMLButtonElement>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        type="button"
        ref={ref}
        {...props}
        className={classnames(
          'text-white bg-transparent p-0 border-0',
          'underline appearance-none cursor-pointer',
          props.className
        )}
      />
    )
  }
)
