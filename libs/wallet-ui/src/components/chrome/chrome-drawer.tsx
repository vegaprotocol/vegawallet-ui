import classnames from 'classnames'
import { animated, config, useSpring } from 'react-spring'

import { APP_FRAME_HEIGHT } from '../../app-loader'
import { useGlobal } from '../../contexts/global/global-context'
import { DRAWER_HEIGHT } from '.'
import { DrawerContent } from './drawer-content'

interface ChromeDrawerProps {
  height: number
}

/**
 * Renders and controls the slide up drawer showing network information.
 */
export function ChromeDrawer({ height }: ChromeDrawerProps) {
  const { state } = useGlobal()
  const styles = useSpring({
    to: {
      y: state.drawerState.isOpen
        ? -(height - APP_FRAME_HEIGHT - DRAWER_HEIGHT)
        : 0,
    },
    config: { ...config.default, duration: 170 },
  })

  return (
    <animated.div
      className={classnames(
        'vega-border-image bg-black border-t-[3px]',
        `h-[${height - APP_FRAME_HEIGHT}px] translate-y-[${styles.y}px]`,
        {
          'overflow-y-hidden': state.drawerState.isOpen,
        }
      )}
    >
      <DrawerContent />
    </animated.div>
  )
}
