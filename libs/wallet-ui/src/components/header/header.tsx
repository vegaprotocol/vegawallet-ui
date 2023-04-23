import type { ReactNode } from 'react'

import { ChevronLeft } from '../../components/icons/chevron-left'
import { Title } from '../../components/title'

interface HeaderProps {
  breadcrumb?: ReactNode
  title?: ReactNode
  subtitle?: string
  onBack?: () => void
}

export function Header({ breadcrumb, title, subtitle, onBack }: HeaderProps) {
  return (
    <div className="p-5">
      {breadcrumb && onBack && (
        <button
          data-testid="back"
          onClick={onBack}
          className="flex gap-1 items-center"
        >
          <ChevronLeft className="w-[14px]" />
          <Title className="text-white m-0">{breadcrumb}</Title>
        </button>
      )}
      <div>
        <Title
          element="h1"
          data-testid="header-title"
          className="text-2xl lg:text-3xl no-underline tracking-normal"
        >
          {title}
        </Title>
        <Title>{subtitle}</Title>
      </div>
    </div>
  )
}
