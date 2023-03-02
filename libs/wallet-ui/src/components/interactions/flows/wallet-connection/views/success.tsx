import { Title } from '../../../../title'
import { Tick } from '../../../../icons/tick'

import type { WalletConnectionProps } from '../'
import { useEffect } from 'react'

export const SuccessView = ({ onClose }: WalletConnectionProps) => {
  useEffect(() => {
    const stamp = setTimeout(() => {
      onClose()
    })

    return () => clearTimeout(stamp)
  }, [onClose])

  return (
    <div className="text-center">
      <Title>Connection approved</Title>
      <Tick className="w-[24px]" />
    </div>
  )
}
