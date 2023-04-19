import { useEffect } from 'react'
import { useFullscreenContext } from './fullscreen-context'

export const useFullscreenRoute = () => {
  const { setIsFullscreen } = useFullscreenContext()
  useEffect(() => {
    setIsFullscreen(true)
    return () => setIsFullscreen(false)
  }, [setIsFullscreen])
}
