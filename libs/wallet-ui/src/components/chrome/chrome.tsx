import classnames from 'classnames'
import { AppStatus, useGlobal } from '../../contexts/global/global-context'
import { useWindowSize } from '../../hooks/use-window-size'
import { ChromeDrawer } from './chrome-drawer'

export const DRAWER_HEIGHT = 70

/**
 * Handles app layout for main content, sidebar and footer
 */
export function Chrome({ children }: { children: React.ReactNode }) {
  const { state } = useGlobal()
  const { height } = useWindowSize()
  const useVegaBg = state.status === AppStatus.Onboarding

  return (
    <>
      <div
        className={classnames('relative block h-full bg-cover', {
          'vega-border-image': !useVegaBg,
          'border-t-[3px]': !useVegaBg,
          'bg-dark-100': !useVegaBg,
          'pb-[70px]': state.status === AppStatus.Initialised,
        })}
      >
        <main className="h-full overflow-y-auto">{children}</main>
      </div>
      {state.status === AppStatus.Initialised && (
        <div
          style={{
            height: state.status === AppStatus.Initialised ? DRAWER_HEIGHT : 0,
          }}
          className="fixed bottom-0 left-0 w-full transition-all duration-200"
        >
          <ChromeDrawer height={height} />
        </div>
      )}
    </>
  )
}
