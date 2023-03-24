import { useMemo } from 'react'
import { useGlobal } from '../contexts/global/global-context'

export const useIsFairground = () => {
  const { features } = useGlobal()
  return useMemo(
    () => features.FAIRGROUND_MODE === true,
    [features.FAIRGROUND_MODE]
  )
}
