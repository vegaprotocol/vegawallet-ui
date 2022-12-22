import type { ReactNode } from 'react'

import { ButtonUnstyled } from '../../components/button-unstyled'
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
    <div className="p-[20px]">
      {breadcrumb && onBack && (
        <ButtonUnstyled
          data-testid="back"
          onClick={onBack}
          className="flex gap-[10px] items-center no-underline"
        >
          <ChevronLeft className="w-[14px]" />
          <Title className="text-white m-0">{breadcrumb}</Title>
        </ButtonUnstyled>
      )}
      <div>
        <Title
          element="h1"
          data-testid="header-title"
          className="text-white text-4xl no-underline tracking-normal"
        >
          {title}
        </Title>
        <Title>{subtitle}</Title>
      </div>
    </div>
  )
}
