import classnames from 'classnames'

export const getDefaultClassName = ({
  hasError = false,
}: {
  hasError?: boolean
}) => {
  return classnames(
    'block appearance-none w-full bg-transparent',
    'py-[7px] px-[10px] border',
    {
      'outline-red': hasError,
      'outline-white': !hasError,
      'border-red': hasError,
      'border-white': !hasError,
    }
  )
}
