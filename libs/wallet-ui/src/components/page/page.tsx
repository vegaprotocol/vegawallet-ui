import { Icon } from '@vegaprotocol/ui-toolkit'
import { useNavigate } from 'react-router-dom'

export interface PageProps {
  name: string
  children: React.ReactElement
  back?: string
}

export const Page = ({ name, children, back }: PageProps) => {
  const navigate = useNavigate()
  return (
    <section
      data-testid={name}
      className="h-full pt-8 pb-5 px-5 grid grid-rows-[min-content_1fr] overflow-y-auto"
    >
      <h1 className="text-2xl flex" data-testid={`${name}-header`}>
        {back && (
          <button
            onClick={() => navigate(back)}
            className="flex flex-col justify-center mr-2"
            data-testid="page-back"
          >
            <Icon
              size={6}
              name="chevron-left"
              // nudge icon left so it aligns with edge of container padding
              className="ml-[-6px]"
            />
          </button>
        )}
        {name}
      </h1>
      <div className="mt-4">{children}</div>
    </section>
  )
}
