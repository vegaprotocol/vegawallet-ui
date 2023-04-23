import classnames from 'classnames'
import type { ReactNode, HTMLAttributes } from 'react'
import { Children, cloneElement } from 'react'

interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  title?: string
  icon?: ReactNode
}

export function Callout({
  children,
  title,
  icon,
  style,
  ...htmlProps
}: CalloutProps) {
  const childrenLength = Children.toArray(children).length
  return (
    <div
      className={classnames('flex gap-[15px] py-3 px-4 text-black bg-white')}
      {...htmlProps}
    >
      {icon && <span>{icon}</span>}
      <div className="callout__content">
        {title && <h4 className="mt-0 text-inherit">{title}</h4>}
        {Children.map(children, (child, i) => {
          return cloneElement(child as React.ReactElement, {
            style: {
              marginBottom: i === childrenLength - 1 ? 0 : undefined,
            },
          })
        })}
      </div>
    </div>
  )
}
