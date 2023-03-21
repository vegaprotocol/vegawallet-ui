import type { ReactNode } from 'react'

export function ListItem<T>({
  item,
  idProp,
  renderItem,
}: {
  item: T
  idProp: keyof T
  renderItem: (item: T) => ReactNode
}) {
  return (
    <li
      data-testid="list-item"
      className="border-b border-1 border-dark-200 py-4"
      key={(item[idProp] as string | number).toString()}
    >
      {renderItem(item)}
    </li>
  )
}
