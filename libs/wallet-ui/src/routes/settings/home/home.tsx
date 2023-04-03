import { Icon } from '@vegaprotocol/ui-toolkit'
import { List } from '../../../components/list'
import { useMemo } from 'react'

export const SettingsHome = () => {
  const items = useMemo(
    () => [
      {
        title: 'App settings',
        path: '/settings/app-settings',
      },
      {
        title: 'Networks',
        path: '/settings/networks',
      },
      {
        title: 'Service',
        path: '/settings/service',
      },
    ],
    []
  )
  return (
    <section className="p-4" data-testid="settings">
      <h1 className="text-2xl" data-testid="settings-header">
        Settings
      </h1>
      <List
        items={items}
        idProp="path"
        clickable={true}
        renderItem={({ title }) => (
          <div className="flex justify-between">
            <div>{title}</div>
            <div>
              <Icon name="chevron-right" />
            </div>
          </div>
        )}
      />
    </section>
  )
}
