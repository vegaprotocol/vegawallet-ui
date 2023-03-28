import classnames from 'classnames'
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

  return (
    <>
      <div
        className={classnames('relative block h-full bg-cover', {
          'vega-border-image': !useVegaBg && !isFairground,
          'border-vega-yellow-500': !useVegaBg && isFairground,
          'border-t-[3px]': !useVegaBg,
          'bg-dark-100': !useVegaBg,
          'pb-[70px]': state.status === AppStatus.Initialised,
        })}
      >
        <main className="h-full overflow-y-auto">{children}</main>
        <NavBar />
      </div>
      {state.status === AppStatus.Initialised && (
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
