import type { ReactNode } from 'react'
import { ListItem } from './list-item'

export function List<T>({
  items,
  empty,
  idProp,
  renderItem,
}: {
  items: T[]
  empty?: ReactNode
  idProp: keyof T
  renderItem: (item: T) => ReactNode
}) {
  if (!items.length) {
    return <>{empty}</>
  }
  return (
    <ul data-testid="list" className="pt-4">
      {items.map((item) => (
        <ListItem
          key={item[idProp]?.toString()}
          item={item}
          renderItem={renderItem}
        />
      ))}
    </ul>
  )
}
