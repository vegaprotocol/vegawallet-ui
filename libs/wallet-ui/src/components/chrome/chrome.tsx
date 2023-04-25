import classnames from 'classnames'
import { useFullscreenContext } from '../../contexts/fullscreen/fullscreen-context'
import { AppStatus, useGlobal } from '../../contexts/global/global-context'
import { useNetworkMode } from '../../hooks/use-network-mode'
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
  const { mode } = useNetworkMode()
  const useVegaBg = state.status === AppStatus.Onboarding && mode === 'mainnet'
  const { isFullscreen } = useFullscreenContext()

  return (
    <>
      <div
        className={classnames('relative block h-full bg-cover', {
          'vega-border-image': !useVegaBg && mode === 'mainnet',
          'fairground-border-image': !useVegaBg && mode === 'fairground',
          'border-white': !useVegaBg && (!mode || mode === 'dev'),
          'border-vega-yellow-500': !useVegaBg && mode === 'fairground',
          'border-t-[3px]': !useVegaBg,
          'bg-dark-100': !useVegaBg,
          'pb-[88px]': state.status === AppStatus.Initialised && !isFullscreen,
        })}
      >
        <main
          className={classnames('h-full overflow-y-auto', {
            'pb-[88px]': !isFullscreen,
          })}
        >
          {children}
        </main>
        {!isFullscreen && <NavBar networkMode={mode} />}
      </div>
      {state.status === AppStatus.Initialised && !isFullscreen && (
        <div
          style={{
            height: state.status === AppStatus.Initialised ? DRAWER_HEIGHT : 0,
          }}
          className="m-auto absolute bottom-[88px] left-0 w-full transition-all duration-200"
        >
          <ChromeDrawer height={height} />
        </div>
      )}
    </>
  )
}
