import { useCallback } from 'react'
import { useGlobal } from '../../contexts/global/global-context'
import { ButtonUnstyled } from '../button-unstyled'
import { Warning } from '../icons/warning'
import { StatusCircle } from '../status-circle'

export const StatusIndicator = () => {
  const {
    dispatch,
    state: { isNetworkCompatible, wasAbleToVerifyCompatibility },
  } = useGlobal()
  const openModal = useCallback(() => {
    dispatch({
      type: 'SET_NETWORK_COMPATIBILITY_MODAL',
      open: true,
    })
  }, [dispatch])
  if (!wasAbleToVerifyCompatibility) {
    return (
      <ButtonUnstyled
        data-testid="network-compatibility-warning"
        className="text-danger-light cursor-pointer inline-block"
        onClick={openModal}
      >
        <Warning className="w-[16px] mr-[6px]" />
      </ButtonUnstyled>
    )
  } else if (!isNetworkCompatible) {
    return (
      <ButtonUnstyled
        data-testid="network-compatibility-warning"
        className="text-warning-light cursor-pointer inline-block"
        onClick={openModal}
      >
        <Warning className="w-[16px] mr-[6px]" />
      </ButtonUnstyled>
    )
  }
  return <StatusCircle background="bg-green" blinking />
}
