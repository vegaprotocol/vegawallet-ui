import type { ReactNode } from 'react'

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
        <li
          data-testid="list-item"
          className="border-b border-1 border-dark-200 py-4"
          key={(item[idProp] as string | number).toString()}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
