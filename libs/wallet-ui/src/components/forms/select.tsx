import classnames from 'classnames'
import type { ForwardedRef, SelectHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { getDefaultClassName } from './styles'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

const CARET_SIZE = 5

export const Select = forwardRef(
  (
    { className, ...props }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <div className="relative">
        <select
          {...props}
          ref={ref}
          className={classnames(
            getDefaultClassName({ hasError: props['aria-invalid'] === 'true' }),
            'pr-[20px]',
            className
          )}
        />
        <span
          className={classnames(
            'block absolute w-0 h-0',
            `right-[10px] top-[calc(50%_-_${CARET_SIZE / 2}px)]`,
            'border-x-transparent border-t-white',
            `border-t-[${CARET_SIZE}px] border-r-[${CARET_SIZE}px] border-l-[${CARET_SIZE}px]`
          )}
        />
      </div>
    )
  }
)
