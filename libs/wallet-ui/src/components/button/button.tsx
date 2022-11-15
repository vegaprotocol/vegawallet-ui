import type {
  CSSProperties,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ForwardedRef,
  MouseEvent as ReactMouseEvent,
} from 'react'
import { forwardRef, useState, useMemo } from 'react'

import { Colors } from '../../config/colors'
import { Spinner } from '../spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

const getColor = ({
  hover,
  disabled,
}: {
  hover: boolean
  disabled?: boolean
}): Colors => {
  if (disabled) {
    return Colors.GRAY_3
  }
  if (hover) {
    return Colors.BLACK
  }
  return Colors.WHITE
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

    const color = useMemo(
      () =>
        getColor({
          hover,
          disabled: props.disabled,
        }),
      [hover, props.disabled]
    )

    const style: CSSProperties = {
      background: hover ? Colors.WHITE : 'transparent',
      color,
      border: `1px solid ${props.disabled ? Colors.GRAY_3 : Colors.WHITE}`,
      borderRadius: 2,
      cursor: 'pointer',
      fontSize: 16,
      padding: '7px 17px',
      textTransform: 'uppercase',
      minWidth: 145,
      transition: 'all .3s ease',
    }

    return (
      <button
        ref={ref}
        type="button"
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={loading ? true : props.disabled}
        style={{ ...style, ...props.style }}
      >
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}
        >
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

    const color = useMemo(
      () =>
        getColor({
          hover,
          disabled: disabled,
        }),
      [hover, disabled]
    )

    const style: CSSProperties = {
      background: hover ? Colors.WHITE : 'transparent',
      color,
      border: `1px solid ${disabled ? Colors.GRAY_3 : Colors.WHITE}`,
      borderRadius: 2,
      cursor: 'pointer',
      fontSize: 16,
      padding: '7px 17px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      minWidth: 145,
      transition: 'all .3s ease',
      pointerEvents: disabled || loading ? 'none' : 'initial',
    }

    return (
      <a
        ref={ref}
        role="button"
        tabIndex={0}
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ ...style, ...props.style }}
      >
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}
        >
          {loading ? <Spinner /> : children}
        </span>
      </a>
    )
  }
)
