import { useGlobal } from '../contexts/global/global-context'

export const useVegaHome = () => {
  const { state } = useGlobal()

  if (state.config?.vegaHome) {
    return state.config.vegaHome
  }

  return ''
}
