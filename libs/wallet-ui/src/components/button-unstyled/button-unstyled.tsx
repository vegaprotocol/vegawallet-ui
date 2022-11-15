import type { ButtonHTMLAttributes, ForwardedRef, CSSProperties } from 'react'
import { forwardRef } from 'react'

import { Colors } from '../../config/colors'

const style: CSSProperties = {
  color: Colors.WHITE,
  fontSize: 'inherit',
  cursor: 'pointer',
  appearance: 'none',
  border: 0,
  background: 'transparent',
  padding: 0,
  textDecoration: 'underline',
}

export const ButtonUnstyled = forwardRef(
  (
    props: ButtonHTMLAttributes<HTMLButtonElement>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        type="button"
        ref={ref}
        {...props}
        style={{
          ...style,
          ...props.style,
        }}
      />
    )
  }
)
