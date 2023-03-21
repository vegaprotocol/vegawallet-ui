import type { ReactNode } from 'react'

export function ListItem<T>({
  item,
  renderItem,
}: {
  item: T
  renderItem: (item: T) => ReactNode
}) {
  return (
    <li
      data-testid="list-item"
      className="border-b border-1 border-dark-200 py-4"
    >
      {renderItem(item)}
    </li>
  )
}
