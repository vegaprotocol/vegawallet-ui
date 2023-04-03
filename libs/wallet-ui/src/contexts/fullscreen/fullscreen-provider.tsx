import { useState } from 'react'
import { FullscreenContext } from './fullscreen-context'

export function FullscreenProvider({
  children,
}: {
  children: React.ReactElement
}) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  return (
    <FullscreenContext.Provider value={{ isFullscreen, setIsFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  )
}
