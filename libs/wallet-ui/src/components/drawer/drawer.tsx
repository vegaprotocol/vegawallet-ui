import classnames from 'classnames'
import { animated, config, useSpring } from 'react-spring'
import { useGlobal } from '../../contexts/global/global-context'
import { DrawerContent } from './drawer-content'
import { useIsFairground } from '../../hooks/use-is-fairground'
import { useWindowSize } from '../../hooks/use-window-size'
import { APP_FRAME_HEIGHT } from '../../app-loader'
import { NAVBAR_HEIGHT } from '../navbar'

export const DRAWER_HEIGHT = 45

/**
 * Renders and controls the slide up drawer showing network information.
 */
export function Drawer() {
  const { height } = useWindowSize()
  const { state } = useGlobal()
  const isFairground = useIsFairground()

  const styles = useSpring({
    to: {
      y: state.drawerState.isOpen
        ? -3 // -3 so it overlaps with top border
        : height - NAVBAR_HEIGHT - APP_FRAME_HEIGHT - DRAWER_HEIGHT - 7, // -7 for borders
    },
    config: { ...config.default, duration: 170 },
  })

  return (
    <animated.div
      style={{
        translateY: styles.y,
      }}
      data-testid="animated.div"
      className={classnames(
        'absolute w-full h-full top-0 bg-black border-t-[3px]',
        {
          'overflow-y-hidden': !state.drawerState.isOpen,
          'overflow-y-scroll': state.drawerState.isOpen,
          'vega-border-image': !isFairground,
          'fairground-border-image': isFairground,
        }
      )}
    >
      <DrawerContent />
    </animated.div>
  )
}
