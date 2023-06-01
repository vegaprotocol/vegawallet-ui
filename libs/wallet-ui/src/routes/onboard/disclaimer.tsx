import { Page } from '../../components/page'
import { AppStatus, useGlobal } from '../../contexts/global/global-context'
import { Paths } from '..'

export const Disclaimer = () => {
  const { state } = useGlobal()
  return (
    <Page
      name="Disclaimer"
      back={
        state.status === AppStatus.Onboarding
          ? Paths.Onboard.UnderstandRisks
          : Paths.Settings.Home
      }
    >
      <div className="text-base">
        <p className="mb-4">
          The Vega Wallet is an application that allows users to, among other
          things, (i) access other Vega applications; (ii) manage multiple
          wallets and keys; and (iii) sign transactions on the Vega network. It
          is free, public and open source software.
        </p>
        <p className="mb-4">
          The Vega Wallet is purely non-custodial application, meaning users
          never lose custody, possession, or control of their digital assets at
          any time.{' '}
          <strong>
            Users are solely responsible for the custody of the cryptographic
            private keys to their Vega Wallet and and should never share their
            wallet credentials or seed phrase with anyone.
          </strong>
        </p>
        <p className="mb-4">
          The Vega Wallet relies on emerging technologies that are subject to
          increased risk through users misuse of things such as public/private
          key cryptography or failing to properly update or run software to
          accommodate upgrades. The developers of the Vega Wallet do not operate
          or run the Vega Blockchain or any other blockchain. Digital tokens
          present market volatility risk, technical software risk, regulatory
          risk and cybersecurity risk.{' '}
          <strong>
            Software upgrades may contain bugs or security vulnerabilities that
            might result in loss of functionality or assets.
          </strong>
        </p>
        <p className="mb-4">
          The Vega Wallet is provided “as is”. The developers of the Vega Wallet
          make no representations or warranties of any kind, whether express or
          implied, statutory or otherwise regarding the Vega Wallet. They
          disclaim all warranties of merchantability, quality, fitness for
          purpose. They disclaim all warranties that the Vega Wallet is free of
          harmful components or errors.
        </p>
        <p className="mb-4">
          <strong>
            No developer of the Vega Wallet accepts any responsibility
          </strong>{' '}
          for, or liability to users in connection with their use of the Vega
          Wallet. Users are solely responsible for any associated wallet and{' '}
          <strong>no developer of the Vega Wallet is liable</strong> for any
          acts or omissions by users in connection with or as a result of their
          Vega Wallet or other associated wallet being compromised.
        </p>
      </div>
    </Page>
  )
}
