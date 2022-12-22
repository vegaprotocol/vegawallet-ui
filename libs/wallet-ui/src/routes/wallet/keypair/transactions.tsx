import { useNavigate, useParams } from 'react-router-dom'

import { Header } from '../../../components/header'
import { ArrowTopRight } from '../../../components/icons/arrow-top-right'
import { PublicKey } from '../../../components/public-key'
import { Title } from '../../../components/title'
import { ExternalLink } from '../../../components/external-link'
import { TransactionHistory } from '../../../components/transaction-history'
import { useCurrentKeypair } from '../../../hooks/use-current-keypair'
import { useExplorerUrl } from '../../../hooks/use-explorer-url'

export function Transactions() {
  const navigate = useNavigate()
  const explorerUrl = useExplorerUrl()
  const { wallet, pubkey } = useParams<{ wallet: string; pubkey: string }>()
  const { keypair } = useCurrentKeypair()

  if (!keypair) {
    return null
  }

  return (
    <>
      <Header
        title="Transactions"
        breadcrumb={keypair.name}
        onBack={() => {
          navigate(`/wallet/${wallet}/keypair/${pubkey}`)
        }}
      />
      <PublicKey publicKey={keypair.publicKey} />
      <div className="pt-0 px-[20px] pb-[20px]" data-testid="keypair-home">
        <div className="flex items-center justify-between gap-[20px] my-[20px]">
          <Title className="m-0">Current session transactions</Title>
          {explorerUrl && (
            <ExternalLink href={`${explorerUrl}/parties/${keypair.publicKey}`}>
              View full history
              <ArrowTopRight className="w-[13px] ml-[6px]" />
            </ExternalLink>
          )}
        </div>
        <TransactionHistory />
      </div>
    </>
  )
}
