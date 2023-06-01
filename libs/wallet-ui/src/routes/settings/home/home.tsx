import { Icon } from '@vegaprotocol/ui-toolkit'
import { List } from '../../../components/list'
import { Link } from 'react-router-dom'
import { Page } from '../../../components/page'
import { Paths } from '../..'
import { ArrowTopRight } from '../../../components/icons/arrow-top-right'

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
    {
      title: 'Disclaimer',
      path: Paths.Settings.Disclaimer,
    },
    {
      title: 'Mainnet status and incidents',
      path: 'https://blog.vega.xyz/tagged/vega-incident-reports',
      external: true,
    },
    {
      title: 'Share your feedback',
      path: 'https://github.com/vegaprotocol/feedback/discussions',
      external: true,
    },
  ]
  return (
    <Page name="Settings">
      <List
        items={items}
        idProp="path"
        clickable={true}
        renderItem={({ title, path, external }) =>
          external ? (
            <a
              href={path}
              target="_blank"
              rel="noreferrer"
              className="flex fle-row items-center gap-2"
            >
              <span>{title}</span>{' '}
              <ArrowTopRight className="w-3 h-3 stroke-white stroke-1" />
            </a>
          ) : (
            <Link
              to={{ pathname: path }}
              className="flex justify-between text-base"
            >
              <div>{title}</div>
              <div>
                <Icon name="chevron-right" />
              </div>
            </Link>
          )
        }
      />
    </Page>
  )
}
