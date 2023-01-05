import type { ReactNode } from 'react'

import { ButtonGroup } from '../button-group'
import { Warning } from '../icons/warning'
import { Splash } from '../splash'
import { Title } from '../title'

type SplashErrorProps = {
  title?: string
  message: ReactNode
  actions: ReactNode
}

export const SplashError = ({ title, message, actions }: SplashErrorProps) => {
  return (
    <Splash>
      <div className="text-center">
        <Warning className="m-[20px] w-[28px]" />
        <Title variant="main">{title || 'Error'}</Title>
      </div>
      <p className="m-[20px]">{message}</p>
      <ButtonGroup className="m-[20px]">{actions}</ButtonGroup>
    </Splash>
  )
}
