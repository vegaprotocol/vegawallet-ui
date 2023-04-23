import { Outlet } from 'react-router-dom'
import { NavBar } from './components/navbar'
import { Drawer } from './components/drawer/drawer'
import { useIsFairground } from './hooks/use-is-fairground'
import classNames from 'classnames'

export const Layout = () => {
  const isFairground = useIsFairground()
  const mainClasses = classNames(
    'relative block h-full bg-cover pb-16',
    'min-h-0 overflow-hidden',
    'border-t-[3px] border-vega-yellow-500 bg-dark-vega-yellow',
    {
      'vega-border-image': !isFairground,
      'fairground-border-image': isFairground,
      'border-vega-yellow-500': isFairground,
    }
  )
  return (
    <div className="grid grid-rows-[1fr_88px] h-full">
      <main className={mainClasses}>
        <div className="h-full p-5 overflow-y-auto">
          <Outlet />
        </div>
        <Drawer />
      </main>
      <NavBar isFairground={false} />
    </div>
  )
}
