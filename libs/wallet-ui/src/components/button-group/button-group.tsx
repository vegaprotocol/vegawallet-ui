import classnames from 'classnames'
import type { HTMLAttributes } from 'react'
import { isValidElement, cloneElement, Children } from 'react'

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  inline?: boolean
}

export function ButtonGroup({
  children,
  orientation = 'horizontal',
  inline,
  className,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      data-testid="button-group"
      {...props}
      className={classnames(
        'flex justify-start gap-[20px]',
        {
          'flex-row': orientation === 'horizontal',
          'flex-col': orientation !== 'horizontal',
          'items-center': orientation === 'horizontal',
        },
        className
      )}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            // @ts-ignore Doesn't know what type the child styles are
            className: classnames(
              {
                grow: inline,
                'basis-0': inline,
              },
              child.props.className
            ),
          })
        }

        return null
      })}
    </div>
  )
}
