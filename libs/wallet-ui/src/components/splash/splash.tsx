import classnames from 'classnames'
import type { HTMLAttributes } from 'react'
import type { ReactNode } from 'react'

interface SplashProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * Component to display content centered in the middle of the screen
 */
export function Splash({ children, className, ...props }: SplashProps) {
  return (
    <div
      {...props}
      className={classnames(
        'flex flex-col items-center justify-start',
        'w-full top-[35px] bottom-0 p-[20px] overflow-y-auto text-white',
        className
      )}
    >
      <div
        className={classnames(
          'flex flex-col justify-center',
          'w-[545px] min-h-full max-w-full p-[20px]'
        )}
      >
        {children}
      </div>
    </div>
  )
}
