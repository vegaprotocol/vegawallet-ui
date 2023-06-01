import { Navigate } from 'react-router-dom'
import { useNetworkMode } from '../../hooks/use-network-mode'
import { Paths } from '..'

export function Onboard() {
  const { mode } = useNetworkMode()
  if (mode !== 'mainnet') {
    return <Navigate to={Paths.Onboard.VegaHome} />
  } else {
    return <Navigate to={Paths.Onboard.Start} />
  }
}
