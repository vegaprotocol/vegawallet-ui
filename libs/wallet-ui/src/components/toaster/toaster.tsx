import { Component } from 'react'
import type { ReactNode } from 'react'
import { render } from 'react-dom'
import { animated, config, useTransition } from 'react-spring'

import type { Intent } from '../../config/intent'
import { Toast as ToastComponent } from './toast'

// Toast object to be stored in state
export interface Toast {
  id: string
  message: ReactNode
  intent?: Intent
  timeout?: number
}

// Options object to be passed to AppToaster.show(toastOptions)
export interface ToastOptions {
  message: ReactNode
  intent?: Intent
  timeout?: number
}

interface ToasterState {
  toasts: Toast[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Toaster extends Component<Readonly<any>, ToasterState> {
  toastId = 0
  container: HTMLDivElement | null = null

  override state: ToasterState = {
    toasts: [],
  }

  public static create() {
    const container = document.createElement('div')
    container.className = 'toaster-container'
    container.style.display = 'flex'
    container.style.alignItems = 'center'
    container.style.flexFlow = 'column nowrap'
    container.style.top = '0'
    container.style.right = '0'
    container.style.left = '0'
    container.style.position = 'absolute'
    container.style.pointerEvents = 'none'
    container.style.padding = '30px 20px 20px'
    container.style.zIndex = '10'
    document.body.appendChild(container)
    // @ts-ignore Ts gets confused by the self-refefence here
    const toaster = render(<Toaster />, container) as Toaster
    return toaster
  }

  handleDismiss = (toast: Toast) => {
    this.setState(({ toasts }) => ({
      toasts: toasts.filter((t) => {
        return t.id !== toast.id
      }),
    }))
  }

  show(toast: ToastOptions) {
    this.setState((curr) => {
      return {
        ...curr,
        toasts: [
          {
            id: `toast-${this.toastId++}`,
            ...toast,
          },
          ...curr.toasts,
        ],
      }
    })
  }

  override componentDidMount() {
    this.container = document.createElement('div')
    this.container.className = 'toaster-portal-container'
  }

  override render() {
    if (this.container === null) {
      return null
    }

    return (
      <ToasterAnimationHandler
        toasts={this.state.toasts}
        handleDismiss={this.handleDismiss}
      />
    )
  }
}

export const AppToaster = Toaster.create()

interface ToasterAnimationHandlerProps {
  toasts: Toast[]
  handleDismiss: (toast: Toast) => void
}

function ToasterAnimationHandler({
  toasts,
  handleDismiss,
}: ToasterAnimationHandlerProps) {
  const height = 49
  const transitions = useTransition(toasts, {
    from: () => ({ y: -height, opacity: 0 }),
    enter: (_t, i) => ({ opacity: 1, y: i * height }),
    update: (_t, i) => ({ opacity: 1, y: i * height }),
    leave: (_t, i) => ({ y: (i - 1) * height, opacity: 0 }),
    config: { ...config.default, duration: 170 },
  })

  return transitions((styles, t) => {
    return (
      <animated.div
        key={t.id}
        style={{
          position: 'absolute',
          overflow: 'hidden',
          paddingTop: 15,
          ...styles,
        }}
      >
        <ToastComponent key={t.id} onDismiss={handleDismiss} {...t} />
      </animated.div>
    )
  })
}
