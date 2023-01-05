interface NodeListProps {
  items: string[]
}

export function NodeList({ items }: NodeListProps) {
  return (
    <ul data-testid="node-table" className="list-none m-0 p-0">
      {items.map((item, i) => (
        <li data-testid="nodes-list" key={i} className="mb-[5px]">
          {item}
        </li>
      ))}
    </ul>
  )
}
