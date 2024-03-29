import classnames from 'classnames'
import * as DialogPrimitives from '@radix-ui/react-dialog'
import type { ReactNode } from 'react'
import { animated, config, useTransition } from 'react-spring'

import { Title } from '../title'

interface DialogProps {
  open: boolean
  title?: ReactNode
  children: React.ReactNode
  size?: 'sm' | 'lg' | 'full'
  onChange?: (open: boolean) => void
  'data-testid'?: string
}

export function Dialog({
  open,
  title,
  children,
  onChange,
  size = 'sm',
  ...props
}: DialogProps) {
  const transitions = useTransition(open, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -10 },
    config: { ...config.default, duration: 170 },
  })
  return (
    <DialogPrimitives.Root open={open} onOpenChange={onChange}>
      <DialogPrimitives.Portal forceMount={true}>
        {transitions(
          (styles, item) =>
            item && (
              <>
                <DialogPrimitives.Overlay forceMount={true} asChild={true}>
                  <animated.div
                    className="fixed top-9 right-0 bottom-0 left-0 h-full bg-overlay"
                    style={{
                      opacity: styles.opacity,
                    }}
                  />
                </DialogPrimitives.Overlay>
                <DialogPrimitives.Content
                  forceMount={true}
                  asChild={true}
                  className="text-white font-sans"
                  data-testid={props['data-testid']}
                >
                  <animated.div
                    className={classnames(
                      'fixed bg-black overflow-y-auto shadow',
                      'max-h-[calc(100vh_-_50px)]',
                      {
                        'top-[40px]': size !== 'full',
                        'left-[10%]': size === 'lg',
                        'w-[80%]': size === 'lg',
                        'left-[calc(50%_-_170px)]': size === 'sm',
                        'w-[375px]': size === 'sm',
                        'top-0': size === 'full',
                        'left-0': size === 'full',
                        'w-screen': size === 'full',
                        'h-screen': size === 'full',
                      }
                    )}
                    style={{
                      translateY: styles.y,
                      opacity: styles.opacity,
                    }}
                  >
                    {title && <Title variant="main">{title}</Title>}
                    {children}
                  </animated.div>
                </DialogPrimitives.Content>
              </>
            )
        )}
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  )
}
