import classnames from 'classnames'
import { useFullscreenContext } from '../../contexts/fullscreen/fullscreen-context'
import { AppStatus, useGlobal } from '../../contexts/global/global-context'
import { useIsFairground } from '../../hooks/use-is-fairground'
import { useWindowSize } from '../../hooks/use-window-size'
import { NavBar } from '../navbar'
import { ChromeDrawer } from './chrome-drawer'

export const DRAWER_HEIGHT = 70

/**
 * Handles app layout for main content, sidebar and footer
 */
export function Chrome({ children }: { children: React.ReactNode }) {
  const { state } = useGlobal()
  const { height } = useWindowSize()
  const isFairground = useIsFairground()
  const useVegaBg = state.status === AppStatus.Onboarding && !isFairground
  const { isFullscreen } = useFullscreenContext()
  console.log(isFullscreen)
  return (
    <>
      <div
        className={classnames('relative block h-full bg-cover', {
          'vega-border-image': !useVegaBg && !isFairground,
          'border-vega-yellow-500': !useVegaBg && isFairground,
          'border-t-[3px]': !useVegaBg,
          'bg-dark-100': !useVegaBg,
          'pb-[70px]': state.status === AppStatus.Initialised && !isFullscreen,
        })}
      >
        <main
          className={classnames('h-full overflow-y-auto', {
            'pb-[70px]': !isFullscreen,
          })}
        >
          {children}
        </main>
        {!isFullscreen && <NavBar />}
      </div>
      {state.status === AppStatus.Initialised && !isFullscreen && (
        <div
          style={{
            height: state.status === AppStatus.Initialised ? DRAWER_HEIGHT : 0,
          }}
          className="m-auto absolute bottom-[70px] left-0 w-full transition-all duration-200"
        >
          <ChromeDrawer height={height} />
        </div>
      )}
    </>
  )
}
