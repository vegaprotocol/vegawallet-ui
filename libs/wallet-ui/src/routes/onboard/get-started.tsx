import { Button, Icon } from '@vegaprotocol/ui-toolkit'
import { Vega } from '../../components/icons'
import { useNavigate } from 'react-router-dom'
import { Paths } from '..'
import { OnboardingPage } from '../../components/page'

export const GetStarted = () => {
  const navigate = useNavigate()
  return (
    <OnboardingPage title={<Vega />}>
      <ul className="mt-4 mb-14 text-left mx-auto text-sm border rounded border-vega-dark-200 p-4">
        <li>
          <span className="text-vega-green-500">
            <Icon name="small-tick" />
          </span>{' '}
          Securely connect to Vega dapps
        </li>
        <li>
          <span className="text-vega-green-500">
            <Icon name="small-tick" />
          </span>{' '}
          Instantly approve and reject transactions
        </li>
      </ul>

      <div className="mb-4">
        <Button
          variant="primary"
          data-testid="get-started"
          onClick={() => navigate(Paths.Onboard.UnderstandRisks)}
        >
          Get started
        </Button>
      </div>
    </OnboardingPage>
  )
}
