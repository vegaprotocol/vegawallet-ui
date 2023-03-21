import { useEffect } from 'react'
import { Title } from '../../title'
import { Tick } from '../../icons/tick'

type InteractionSuccessProps = {
  title: string
  onClose: () => void
}

export const InteractionSuccess = ({
  title,
  onClose,
}: InteractionSuccessProps) => {
  useEffect(() => {
    const stamp = setTimeout(() => {
      onClose()
    }, 1000)

    return () => clearTimeout(stamp)
  }, [onClose])

  return (
    <div
      data-testid="interaction-success"
      className="flex flex-col py-[100px] px-[20px] justify-center items-center"
    >
      <Title className="text-3xl text-center">{title}</Title>
      <div className="border border-white rounded-sm p-[10px]">
        <Tick className="w-[48px]" />
      </div>
    </div>
  )
}
