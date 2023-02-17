import classnames from 'classnames'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { Button } from '../../components/button'
import { ButtonGroup } from '../../components/button-group'
import { ButtonUnstyled } from '../../components/button-unstyled'
import { ConnectionList } from '../../components/connection-list'
import { Dialog } from '../../components/dialog'
import { Header } from '../../components/header'
import { Edit } from '../../components/icons/edit'
import { Trash } from '../../components/icons/trash'
import { KeypairList } from '../../components/keypair-list'
import { RemoveWallet } from '../../components/remove-wallet'
import { Title } from '../../components/title'
import { WalletEdit } from '../../components/wallet-edit'
import { useGlobal } from '../../contexts/global/global-context'
import { useCurrentWallet } from '../../hooks/use-current-wallet'

enum Tabs {
  KEYPAIRS = 'Keypairs',
  CONNECTIONS = 'Connections',
}

type TabTitlesProps = {
  activeTab: Tabs
  setTab: (tab: Tabs) => void
}

const TabTitles = ({ activeTab, setTab }: TabTitlesProps) => {
  return (
    <div className="flex gap-[20px]">
      {Object.values(Tabs).map((tab) => (
        <Title
          key={tab}
          element="h2"
          onClick={() => setTab(tab)}
          className={classnames('cursor-pointer mt-0 pb-[4px] border-b-2', {
            'border-transparent text-deemphasise': tab !== activeTab,
            'border-white text-white': tab === activeTab,
          })}
        >
          {tab}
        </Title>
      ))}
    </div>
  )
}

export function WalletList() {
  const [isEditing, setEditing] = useState(false)
  const [isRemoving, setRemoving] = useState(false)
  const [tab, setTab] = useState<Tabs>(Tabs.KEYPAIRS)
  const navigate = useNavigate()
  const { actions, dispatch } = useGlobal()
  const { wallet } = useCurrentWallet()

  if (!wallet) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Header
        title={
          <>
            {wallet.name}
            <ButtonGroup inline className="inline-flex ml-[20px] gap-[12px]">
              <ButtonUnstyled
                data-testid="edit-wallet"
                className="no-underline"
                onClick={() => setEditing(true)}
              >
                <Edit className="w-[16px]" />
              </ButtonUnstyled>
              <ButtonUnstyled
                data-testid="remove-wallet"
                className="no-underline"
                onClick={() => setRemoving(true)}
              >
                <Trash className="w-[16px]" />
              </ButtonUnstyled>
            </ButtonGroup>
          </>
        }
        breadcrumb="Wallets"
        onBack={() => {
          dispatch({
            type: 'DEACTIVATE_WALLET',
            wallet: wallet.name,
          })
          navigate('/')
        }}
      />
      <div className="pb-[20px] px-[20px] pt-0">
        <TabTitles activeTab={tab} setTab={setTab} />
        {tab === Tabs.KEYPAIRS && (
          <KeypairList
            wallet={wallet}
            onClick={(publicKey) =>
              navigate(
                `/wallet/${encodeURIComponent(
                  wallet.name
                )}/keypair/${publicKey}`
              )
            }
          />
        )}
        {tab === Tabs.CONNECTIONS && <ConnectionList wallet={wallet} />}
        {tab === Tabs.KEYPAIRS && (
          <Button
            data-testid="generate-keypair"
            onClick={() => {
              dispatch(actions.addKeypairAction(wallet.name))
            }}
          >
            Generate key pair
          </Button>
        )}
      </div>
      <Dialog size="lg" open={isRemoving} title="Remove wallet">
        <RemoveWallet onClose={() => setRemoving(false)} />
      </Dialog>
      <Dialog open={isEditing} onChange={setEditing} title="Edit wallet">
        <WalletEdit onClose={() => setEditing(false)} />
      </Dialog>
    </>
  )
}
