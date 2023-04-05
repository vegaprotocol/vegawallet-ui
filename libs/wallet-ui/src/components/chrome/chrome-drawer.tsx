import classnames from 'classnames'
import { animated, config, useSpring } from 'react-spring'

import { APP_FRAME_HEIGHT } from '../../app-loader'
import { useGlobal } from '../../contexts/global/global-context'
import { DRAWER_HEIGHT } from '.'
import { DrawerContent } from './drawer-content'
import { useIsFairground } from '../../hooks/use-is-fairground'
import { NAVBAR_HEIGHT } from '../navbar'

interface ChromeDrawerProps {
  height: number
}

/**
 * Renders and controls the slide up drawer showing network information.
 */
export function ChromeDrawer({ height }: ChromeDrawerProps) {
  const { state } = useGlobal()
  const isFairground = useIsFairground()

  const styles = useSpring({
    to: {
      y: state.drawerState.isOpen
        ? -(height - APP_FRAME_HEIGHT - DRAWER_HEIGHT - NAVBAR_HEIGHT)
        : 0,
    },
    config: { ...config.default, duration: 170 },
  })

  return (
    <animated.div
      style={{
        height: height - APP_FRAME_HEIGHT,
        translateY: styles.y,
      }}
      className={classnames('bg-black border-t-[3px]', {
        'overflow-y-hidden': !state.drawerState.isOpen,
        'overflow-y-scroll': state.drawerState.isOpen,
        'vega-border-image': !isFairground,
        'fairground-border-image': isFairground,
      })}
    >
      <DrawerContent />
    </animated.div>
  )
}
