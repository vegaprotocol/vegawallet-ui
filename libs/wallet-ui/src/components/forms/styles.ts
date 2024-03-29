import classnames from 'classnames'

export const getDefaultClassName = ({
  hasError = false,
  isDisabled = false,
}: {
  hasError?: boolean
  isDisabled?: boolean
}) => {
  return classnames(
    'block appearance-none w-full bg-transparent',
    'py-[7px] px-[10px] border rounded',
    {
      'outline-red': hasError,
      'outline-white': !hasError,
      'border-red': hasError,
      'border-vega-dark-200': !hasError,
      'border-neutral': isDisabled,
      'text-neutral': isDisabled,
    }
  )
}
