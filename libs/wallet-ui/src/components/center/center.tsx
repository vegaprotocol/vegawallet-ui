import type { ReactNode } from 'react'

interface CenterProps {
  children: ReactNode
}

export function Center({ children }: CenterProps) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div>{children}</div>
    </div>
  )
}
