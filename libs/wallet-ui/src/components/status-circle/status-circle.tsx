import classnames from 'classnames'

type StatusCircleProps = {
  background: string
  blinking?: boolean
}

export const StatusCircle = ({ background, blinking }: StatusCircleProps) => {
  return (
    <span
      data-testid="status-circle"
      className={classnames(
        'inline-block w-[11px] h-[11px] rounded-full mr-[5px]',
        background,
        {
          blink: blinking,
        }
      )}
    />
  )
}
