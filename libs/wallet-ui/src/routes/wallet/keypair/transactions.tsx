import { useParams } from 'react-router-dom'

import { ArrowTopRight } from '../../../components/icons/arrow-top-right'
import { PublicKey } from '../../../components/public-key'
import { Title } from '../../../components/title'
import { ExternalLink } from '../../../components/external-link'
import { TransactionHistory } from '../../../components/transaction-history'
import { useCurrentKeypair } from '../../../hooks/use-current-keypair'
import { useExplorerLinks } from '../../../hooks/use-explorer-url'
import { Page } from '../../../components/page'

export function Transactions() {
  const { getPartyUrl } = useExplorerLinks()
  const { wallet, pubkey } = useParams<{ wallet: string; pubkey: string }>()
  const { keypair } = useCurrentKeypair()

  if (!keypair || !wallet || !pubkey) {
    return null
  }

  const partyUrl = getPartyUrl(keypair.publicKey)

  return (
    <Page name="Transactions" back={true}>
      <>
        <PublicKey publicKey={keypair.publicKey} />
        <div className="pt-0 px-5 pb-5" data-testid="keypair-home">
          <div className="flex items-center justify-between gap-5 my-5">
            <Title className="m-0">Current session transactions</Title>
            {partyUrl && (
              <ExternalLink href={partyUrl}>
                View full history
                <ArrowTopRight className="w-[13px] ml-[6px]" />
              </ExternalLink>
            )}
          </div>
          <TransactionHistory />
        </div>
      </>
    </Page>
  )
}
