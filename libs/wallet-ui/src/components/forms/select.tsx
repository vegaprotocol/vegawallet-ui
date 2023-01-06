import classnames from 'classnames'
import type { ForwardedRef, SelectHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { getDefaultClassName } from './styles'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

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
            `right-[10px] top-[calc(50%_-_2px)]`,
            'border-x-transparent border-t-white',
            `border-t-[5px] border-r-[5px] border-l-[5px]`
          )}
        />
      </div>
    )
  }
)
