import classNames from 'classnames'
import type { ReactNode } from 'react'

export function ListItem<T>({
  item,
  renderItem,
  clickable = false,
  testid = 'list-item',
}: {
  item: T
  renderItem: (item: T) => ReactNode
  clickable?: boolean
  testid?: string
}) {
  return (
    <li
      data-testid={testid}
      className={classNames('border-b border-1 border-dark-200 py-3 px-3', {
        'hover:bg-vega-dark-150': clickable,
      })}
    >
      {renderItem(item)}
    </li>
  )
}
