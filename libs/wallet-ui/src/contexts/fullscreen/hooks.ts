import { useEffect } from 'react'
import { useFullscreenContext } from './fullscreen-context'

export const useFullscreenRoute = () => {
  const { isFullscreen, setIsFullscreen } = useFullscreenContext()
  console.log(isFullscreen)
  useEffect(() => {
    setIsFullscreen(true)
    console.log('Set')
    return () => setIsFullscreen(false)
  }, [setIsFullscreen])
}
