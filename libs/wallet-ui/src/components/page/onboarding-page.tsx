import classNames from 'classnames'
import type { PropsWithChildren, ReactNode } from 'react'
import { Title } from '../title'

type OnboardingPageProps = {
  title?: string | ReactNode
  className?: classNames.Argument
} & PropsWithChildren

export const OnboardingPage = ({
  title,
  className,
  children,
}: OnboardingPageProps) => (
  <div
    className={classNames(
      'pt-5 pb-4 px-4 m-auto text-center w-[80%] overflow-y-auto',
      className
    )}
  >
    {title && (
      <Title element="h1" className="m-0 mb-10 text-white text-2xl">
        {title}
      </Title>
    )}

    {children}
  </div>
)
