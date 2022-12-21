import type { LiHTMLAttributes, OlHTMLAttributes } from 'react'

type BulletListProps = OlHTMLAttributes<HTMLUListElement>

export function BulletList(props: BulletListProps) {
  return <ul {...props} />
}

type BulletListItemProps = LiHTMLAttributes<HTMLLIElement>

export function BulletListItem({ children, ...props }: BulletListItemProps) {
  return (
    <li {...props}>
      <div className="flex items-start">
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative top-[7px] inline-block mr-3"
        >
          <rect width="11" height="11" fill="currentColor"></rect>
        </svg>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </li>
  )
}
