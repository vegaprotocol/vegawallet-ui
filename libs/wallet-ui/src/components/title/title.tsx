import classnames from 'classnames'
import type { HTMLAttributes } from 'react'
import type { ReactNode } from 'react'

type Variant = 'main' | 'secondary'

interface HeaderProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  variant?: Variant
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const secondaryTitleStyles = classnames(
  'text-white text-sm mt-[30px] mb-[20px]',
  'uppercase leading-tight tracking-widest'
)

const mainTitleStyles = 'text-white text-3xl m-0 p-[20px] leading-tight'

const getVariantClassName = (variant: Variant): string => {
  switch (variant) {
    case 'main': {
      return mainTitleStyles
    }
    case 'secondary': {
      return secondaryTitleStyles
    }
    default: {
      return ''
    }
  }
}

export const Title = ({
  children,
  className,
  variant = 'secondary',
  ...rest
}: HeaderProps) => {
  return (
    <h1
      {...rest}
      className={classnames(getVariantClassName(variant), className)}
    >
      {children}
    </h1>
  )
}
