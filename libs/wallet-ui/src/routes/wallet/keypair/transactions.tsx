import { useNavigate, useParams } from 'react-router-dom'

import { Header } from '../../../components/header'
import { ArrowTopRight } from '../../../components/icons/arrow-top-right'
import { PublicKey } from '../../../components/public-key'
import { Title } from '../../../components/title'
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
        title='Transactions'
        breadcrumb={keypair.name}
        onBack={() => {
          navigate(`/wallet/${wallet}/keypair/${pubkey}`)
        }}
      />
      <PublicKey publicKey={keypair.publicKey} />
      <div style={{ padding: 20, paddingTop: 0 }} data-testid='keypair-home'>
        <div
          style={{
            display: 'flex',
            gap: 20,
            margin: '20px 0',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Title style={{ margin: 0 }}>Current session transactions</Title>
          {explorerUrl && (
            <a
              href={`${explorerUrl}/parties/${keypair.publicKey}`}
              target='_blank'
              style={{ textDecoration: 'underline' }}
              rel='noreferrer'
            >
              View full history
              <ArrowTopRight style={{ width: 13, marginLeft: 6 }} />
            </a>
          )}
        </div>
        <TransactionHistory />
      </div>
    </>
  )
}
