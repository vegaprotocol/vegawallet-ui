import classnames from 'classnames'

export function BreakText({
  children,
  className,
  ...rest
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={classnames('max-w-[200px] break-words', className)}
      {...rest}
    >
      {children}
    </span>
  )
}
