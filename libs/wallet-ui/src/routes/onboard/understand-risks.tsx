import { Button } from '@vegaprotocol/ui-toolkit'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '..'
import { ButtonGroup } from '../../components/button-group'
import { OnboardingPage } from '../../components/page'

export const UnderstandRisks = () => {
  const navigate = useNavigate()
  return (
    <OnboardingPage title="Understand the risks before you start">
      <ul className="mb-10 text-left mx-auto text-sm border rounded border-vega-dark-200 p-4 list-disc pl-8">
        <li>You retain custody of your assets</li>
        <li>You are responsible for the security of your assets</li>
        <li>You should never share your private keys</li>
        <li>
          You may encounter bugs, loss of functionality or loss of assets using
          the software
        </li>
        <li>
          No party accepts any liability for any losses whatsoever relating to
          its use
        </li>
      </ul>

      <p className="mb-10 text-base mx-auto text-left">
        By using the Vega Wallet, you acknowledge that you have read and
        understood the{' '}
        <Link className="underline" to={Paths.Onboard.Disclaimer}>
          Vega Wallet Disclaimer
        </Link>
      </p>

      <ButtonGroup className="mb-10 justify-center">
        <Button
          data-testid="cancel"
          onClick={() => navigate(Paths.Onboard.GetStarted)}
        >
          Cancel
        </Button>
        <Button
          data-testid="confirm"
          onClick={() => navigate(Paths.Onboard.Home)}
          variant="primary"
        >
          I agree
        </Button>
      </ButtonGroup>
    </OnboardingPage>
  )
}
