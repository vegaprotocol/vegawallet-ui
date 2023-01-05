import classnames from 'classnames'
import type { ForwardedRef, TextareaHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { getDefaultClassName } from './styles'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef(
  (
    { className, ...props }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <textarea
        {...props}
        ref={ref}
        className={classnames(
          getDefaultClassName({ hasError: props['aria-invalid'] === 'true' }),
          'min-h-[200px] resize-y',
          className
        )}
      />
    )
  }
)
