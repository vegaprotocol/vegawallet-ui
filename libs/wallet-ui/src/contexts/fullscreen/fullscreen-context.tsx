import { createContext, useContext } from 'react'

type FullscreenContextShape = {
  isFullscreen: boolean
  setIsFullscreen: (isFullScreen: boolean) => void
}

export const FullscreenContext = createContext<
  FullscreenContextShape | undefined
>(undefined)

export function useFullscreenContext() {
  const context = useContext(FullscreenContext)
  if (context === undefined) {
    throw new Error(
      'useFullscreenContext must be used within FullscreenProvider'
    )
  }
  return context
}
