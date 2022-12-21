export function BreakText({
  children,
  ...rest
}: {
  children: React.ReactNode
}) {
  return (
    <span className={`max-w-[200px] break-words`} {...rest}>
      {children}
    </span>
  )
}
