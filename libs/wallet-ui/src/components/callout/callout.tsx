import type { ReactNode, HTMLAttributes } from 'react'
import { Children, cloneElement } from 'react'

import { IntentBackgrounds } from '../../config/colors'
import { Intent } from '../../config/intent'

interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  title?: string
  icon?: ReactNode
  intent?: Intent
}

export function Callout({
  children,
  title,
  icon,
  intent = Intent.NONE,
  style,
  ...htmlProps
}: CalloutProps) {
  const defaultStyle = {
    display: 'flex',
    gap: 15,
    background: IntentBackgrounds[intent],
    padding: '15px 20px',
  }
  const childrenLength = Children.toArray(children).length
  return (
    <div style={{ ...defaultStyle, ...style }} {...htmlProps}>
      {icon && <span>{icon}</span>}
      <div className="callout__content">
        {title && <h4 style={{ marginTop: 0, color: 'inherit' }}>{title}</h4>}
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
