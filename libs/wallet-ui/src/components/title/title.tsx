import classnames from 'classnames'
import type { HTMLAttributes } from 'react'
import type { ReactNode } from 'react'

type Variant = 'main' | 'secondary'

interface HeaderProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  variant?: Variant
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

const secondaryTitleStyles = classnames(
  'text-white text-sm my-[20px]',
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
  element = 'h2',
  ...rest
}: HeaderProps) => {
  const styles = classnames(getVariantClassName(variant), className)

  switch (element) {
    case 'h1': {
      return (
        <h1 {...rest} className={styles}>
          {children}
        </h1>
      )
    }
    case 'h2': {
      return (
        <h2 {...rest} className={styles}>
          {children}
        </h2>
      )
    }
    case 'h3': {
      return (
        <h3 {...rest} className={styles}>
          {children}
        </h3>
      )
    }
    case 'h4': {
      return (
        <h4 {...rest} className={styles}>
          {children}
        </h4>
      )
    }
    case 'h5': {
      return (
        <h5 {...rest} className={styles}>
          {children}
        </h5>
      )
    }
    case 'h6': {
      return (
        <h6 {...rest} className={styles}>
          {children}
        </h6>
      )
    }
    default: {
      return (
        <p {...rest} className={styles}>
          {children}
        </p>
      )
    }
  }
}
