import { Icon } from '@vegaprotocol/ui-toolkit'
import { useNavigate } from 'react-router-dom'

export const Page = ({
  name,
  children,
  back = false,
}: {
  name: string
  children: React.ReactElement
  back?: boolean
}) => {
  const navigate = useNavigate()
  return (
    <section className="p-4" data-testid={name}>
      <button onClick={() => navigate(-1)}>
        <h1 className="text-2xl flex" data-testid={`${name}-header`}>
          {back && (
            <div className="flex flex-col justify-center mr-2">
              <Icon size={6} name="chevron-left" />
            </div>
          )}
          {name}
        </h1>
      </button>
      {children}
    </section>
  )
}
