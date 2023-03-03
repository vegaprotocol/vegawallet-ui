import { Title } from '../../../../title'
import { Tick } from '../../../../icons/tick'

import type { WalletConnectionProps } from '../'
import { useEffect } from 'react'

export const SuccessView = ({ onClose }: WalletConnectionProps) => {
  useEffect(() => {
    const stamp = setTimeout(() => {
      onClose()
    }, 1500)

    return () => clearTimeout(stamp)
  }, [onClose])

  return (
    <div className="flex flex-col py-[100px] justify-center items-center">
      <Title className="text-3xl">Connected</Title>
      <div className="border border-white rounded-sm p-[10px]">
        <Tick className="w-[48px]" />
      </div>
    </div>
  )
}
