import type { AnchorHTMLAttributes } from 'react'

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export function ExternalLink({
  style,
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
      style={{ textDecoration: 'underline', cursor: 'pointer', ...style }}
    >
      {children}
    </a>
  )
}
