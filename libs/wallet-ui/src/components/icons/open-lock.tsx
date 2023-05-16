import classnames from 'classnames'

import { className as defaultClassName } from './style'

export function OpenLock({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(defaultClassName, className)}
    >
      <rect x="5.5" y="9.5" width="13" height="12" stroke="white" fill="none" />
      <rect x="11.5" y="13.5" width="1" height="4" fill="white" />
      <rect x="8" y="3" width="1" height="6" fill="white" />
      <rect x="15" y="3" width="1" height="2" fill="white" />
      <rect x="9" y="2" width="6" height="1" fill="white" />
    </svg>
  )
}
