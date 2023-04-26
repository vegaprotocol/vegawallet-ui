import { Outlet } from 'react-router-dom'
import { NavBar } from './components/navbar'
import { DRAWER_HEIGHT, Drawer } from './components/drawer/drawer'
import { useNetworkMode } from './hooks/use-network-mode'
import classNames from 'classnames'

export const Layout = () => {
  const { mode, isMainnet, isFairground, isDev } = useNetworkMode()

  const mainClasses = classNames(
    'relative block h-full bg-cover pb-16',
    'min-h-0 overflow-hidden',
    'border-t-[3px] border-vega-yellow-500 bg-dark-vega-yellow',
    {
      'vega-border-image': isMainnet,
      'fairground-border-image': isFairground,
      'border-vega-yellow-500': isFairground,
      'border-white': isDev,
    }
  )
  return (
    // must use 88px here for tw to compile with correct styles
    <div className={`grid grid-rows-[1fr_88px] h-full`}>
      <main className={mainClasses} style={{ paddingBottom: DRAWER_HEIGHT }}>
        <Outlet />
        <Drawer />
      </main>
      <NavBar networkMode={mode} />
    </div>
  )
}
