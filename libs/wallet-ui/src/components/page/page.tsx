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
      <button onClick={() => navigate(-1)}>
        <h1 className="text-2xl flex" data-testid={`${name}-header`}>
          {back && (
            <div
              data-testid="page-back"
              className="flex flex-col justify-center mr-2"
            >
              <Icon size={6} name="chevron-left" />
            </div>
          )}
          {name}
        </h1>
      </button>
      <div className="mt-4">{children}</div>
    </section>
  )
}
