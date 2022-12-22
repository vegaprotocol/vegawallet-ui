import classnames from 'classnames'
import type { HTMLAttributes, ReactNode } from 'react'
import { Fragment } from 'react'

import { Colors } from '../../config/colors'

interface KeyValueTableProps extends HTMLAttributes<HTMLDListElement> {
  rows: Array<{ key: ReactNode; value: ReactNode; dataTestId?: string }>
}

export const KeyValueTable = ({
  rows,
  className,
  ...props
}: KeyValueTableProps) => {
  return (
    <dl
      className={classnames(
        'grid grid-cols-[min-content_1fr] gap-[10px] text-sm',
        className
      )}
      {...props}
    >
      {rows.map((row, i) => (
        <Fragment key={i}>
          <dt className="min-w-[145px] text-white text-left">{row.key}:</dt>
          <dd
            className="text-right text-deemphasise"
            data-testid={row.dataTestId}
          >
            {row.value}
          </dd>
        </Fragment>
      ))}
    </dl>
  )
}
