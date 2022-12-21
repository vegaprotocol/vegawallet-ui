export function BreakText({
  children,
  ...rest
}: {
  children: React.ReactNode
}) {
  return (
    <span className={`max-w-${200 / 16} break-words`} {...rest}>
      {children}
    </span>
  )
}
