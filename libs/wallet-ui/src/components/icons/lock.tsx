import classnames from 'classnames'

import { className as defaultClassName } from './style'

export function Lock({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(defaultClassName, className)}
    >
      <rect
        x="5.5"
        y="9.5"
        width="13"
        height="11"
        stroke="#8B8B8B"
        fill="none"
      />
      <rect x="11.5" y="13" width="1" height="4" fill="#8B8B8B" />
      <rect x="8" y="4" width="1" height="5" fill="#8B8B8B" />
      <rect x="15" y="4" width="1" height="5" fill="#8B8B8B" />
      <rect x="9" y="3" width="6" height="1" fill="#8B8B8B" />
    </svg>
  )
}
