import classNames from 'classnames'
import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'

type ButtonLinkProps = LinkProps & React.RefAttributes<HTMLAnchorElement>

export const ButtonLink = ({
  to,
  className,
  children,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      className={classNames(
        'flex-1 border border-vega-dark-300 rounded text-center p-3 uppercase',
        className
      )}
      to={to}
      {...props}
    >
      {children}
    </Link>
  )
}
