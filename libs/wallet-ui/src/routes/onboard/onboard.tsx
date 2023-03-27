import { Navigate } from 'react-router-dom'
import { useIsFairground } from '../../hooks/use-is-fairground'

export function Onboard() {
  const isFairground = useIsFairground()
  if (isFairground) {
    return <Navigate to="/onboard/vega-home" />
  } else {
    return <Navigate to="/onboard/start" />
  }
}
