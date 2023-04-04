import { Icon } from '@vegaprotocol/ui-toolkit'
import { List } from '../../../components/list'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Page } from '../../../components/page'

export const SettingsHome = () => {
  const items = useMemo(
    () => [
      {
        title: 'App settings',
        path: '/settings/app-settings',
      },
      // {
      //   title: 'Networks',
      //   path: '/settings/networks',
      // },
      // {
      //   title: 'Service',
      //   path: '/settings/service',
      // },
    ],
    []
  )
  return (
    <Page name="Settings">
      <List
        items={items}
        idProp="path"
        clickable={true}
        renderItem={({ title, path }) => (
          <Link to={{ pathname: path }} className="flex justify-between">
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
