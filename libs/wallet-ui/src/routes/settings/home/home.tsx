import { Icon } from '@vegaprotocol/ui-toolkit'
import { List } from '../../../components/list'
import { Link } from 'react-router-dom'
import { Page } from '../../../components/page'
import { Paths } from '../..'

export const SettingsHome = () => {
  const items = [
    {
      title: 'App settings',
      path: Paths.Settings.AppSettings,
    },
    {
      title: 'Service',
      path: Paths.Settings.Service,
    },
  ]
  return (
    <Page name="Settings">
      <List
        items={items}
        idProp="path"
        clickable={true}
        renderItem={({ title, path }) => (
          <Link
            to={{ pathname: path }}
            className="flex justify-between text-xl"
          >
            <div>{title}</div>
            <div>
              <Icon name="chevron-right" />
            </div>
          </Link>
        )}
      />
    </Page>
  )
}
