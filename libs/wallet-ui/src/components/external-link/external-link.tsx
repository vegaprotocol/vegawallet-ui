import classnames from 'classnames'
import type { AnchorHTMLAttributes } from 'react'

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export function ExternalLink({
  className,
  href,
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={classnames('underline cursor-pointer', className)}
    >
      {children}
    </a>
  )
}
