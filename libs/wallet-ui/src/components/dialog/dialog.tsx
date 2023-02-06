import classnames from 'classnames'
import * as DialogPrimitives from '@radix-ui/react-dialog'
import type { ReactNode } from 'react'
import { animated, config, useTransition } from 'react-spring'

import { Title } from '../title'

interface DialogProps {
  open: boolean
  title?: ReactNode
  children: React.ReactNode
  size?: 'sm' | 'lg'
  onChange?: (open: boolean) => void
}

export function Dialog({
  open,
  title,
  children,
  onChange,
  size = 'sm',
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
                    className="fixed top-0 right-0 bottom-0 left-0 h-full bg-overlay"
                    style={{
                      // The app is frameless by default so this element creates a space at the top of the app
                      // which you can click and drag to move the app around.
                      // https://wails.io/docs/guides/frameless/
                      // @ts-ignore: Allow custom css property for wails
                      '--wails-draggable': 'drag',
                      opacity: styles.opacity,
                    }}
                    data-wails-drag
                  />
                </DialogPrimitives.Overlay>
                <DialogPrimitives.Content
                  forceMount={true}
                  asChild={true}
                  className="text-white font-sans"
                >
                  <animated.div
                    className={classnames(
                      'fixed bg-black top-[30px] overflow-y-auto shadow',
                      'max-h-[calc(100vh_-_60px)]',
                      {
                        'left-[10%]': size === 'lg',
                        'w-[80%]': size === 'lg',
                        'left-[calc(50%_-_170px)]': size !== 'lg',
                        'w-[375px]': size !== 'lg',
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
