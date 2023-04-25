import { Navigate } from 'react-router-dom'
import { useNetworkMode } from '../../hooks/use-network-mode'

export function Onboard() {
  const { mode } = useNetworkMode()
  if (mode !== 'mainnet') {
    return <Navigate to="/onboard/vega-home" />
  } else {
    return <Navigate to="/onboard/start" />
  }
}
