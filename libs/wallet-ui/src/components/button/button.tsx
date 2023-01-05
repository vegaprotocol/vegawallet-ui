import classnames from 'classnames'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ForwardedRef,
  MouseEvent as ReactMouseEvent,
} from 'react'
import { forwardRef, useState } from 'react'

import { Spinner } from '../spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

type GetBaseClassOptions = {
  hover: boolean
  disabled?: boolean
  loading?: boolean
}

const getButtonClass = ({ hover, disabled, loading }: GetBaseClassOptions) => {
  return classnames(
    'text-base uppercase no-underline cursor-pointer',
    'min-w-[145px] border border-current rounded-sm',
    'transition-colors duration-300 ease-in-out',
    'py-[7px] px-[7px] border-current',
    {
      'bg-white': hover,
      'bg-transparent': !hover,
      'text-dark-300': disabled,
      'text-black': !disabled && hover,
      'text-white': !disabled && !hover,
      'pointer-events-none': disabled || loading,
    }
  )
}

const getButtonSpanClass = () => {
  return 'flex justify-center items-center gap-[5px]'
}

export const Button = forwardRef(
  (
    { children, loading, onMouseEnter, onMouseLeave, ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const [hover, setHover] = useState(false)

    const handleMouseEnter = (
      e: ReactMouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      setHover(true)
      if (typeof onMouseEnter === 'function') {
        onMouseEnter(e)
      }
    }

    const handleMouseLeave = (
      e: ReactMouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      setHover(false)
      if (typeof onMouseLeave === 'function') {
        onMouseLeave(e)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={loading ? true : props.disabled}
        className={classnames(
          getButtonClass({ hover, loading, disabled: props.disabled }),
          props.className
        )}
      >
        <span className={getButtonSpanClass()}>
          {loading ? <Spinner /> : children}
        </span>
      </button>
    )
  }
)

interface AnchorButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  loading?: boolean
  disabled?: boolean
}

export const AnchorButton = forwardRef(
  (
    {
      children,
      loading,
      disabled,
      onMouseEnter,
      onMouseLeave,
      ...props
    }: AnchorButtonProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const [hover, setHover] = useState(false)

    const handleMouseEnter = (
      e: ReactMouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      setHover(true)
      if (typeof onMouseEnter === 'function') {
        onMouseEnter(e)
      }
    }

    const handleMouseLeave = (
      e: ReactMouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      setHover(false)
      if (typeof onMouseLeave === 'function') {
        onMouseLeave(e)
      }
    }

    return (
      <a
        ref={ref}
        role="button"
        tabIndex={0}
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classnames(
          getButtonClass({ hover, loading, disabled }),
          props.className
        )}
      >
        <span className={getButtonSpanClass()}>
          {loading ? <Spinner /> : children}
        </span>
      </a>
    )
  }
)
