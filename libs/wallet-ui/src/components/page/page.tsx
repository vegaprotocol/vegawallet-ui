import { Icon } from '@vegaprotocol/ui-toolkit'
import { useNavigate } from 'react-router-dom'

export interface PageProps {
  name: string
  children: React.ReactElement
  back?: boolean
}

export const Page = ({ name, children, back = false }: PageProps) => {
  const navigate = useNavigate()
  return (
    <section
      data-testid={name}
      className="h-full pt-8 pb-5 px-5 grid grid-rows-[min-content_1fr] overflow-y-auto"
    >
      <h1 className="text-2xl flex" data-testid={`${name}-header`}>
        {back && (
          <button
            onClick={() => navigate(-1)}
            className="flex flex-col justify-center mr-2"
            data-testid="page-back"
          >
            <Icon size={6} name="chevron-left" />
          </button>
        )}
        {name}
      </h1>
      <div className="mt-4">{children}</div>
    </section>
  )
}
