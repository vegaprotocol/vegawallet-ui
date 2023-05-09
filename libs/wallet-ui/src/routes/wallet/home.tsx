import classnames from 'classnames'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Paths } from '..'

import { ConnectionList } from '../../components/connection-list'
import { Dialog } from '../../components/dialog'
import { KeypairList } from '../../components/keypair-list'
import { RemoveWallet } from '../../components/remove-wallet'
import { Title } from '../../components/title'
import { WalletEdit } from '../../components/wallet-edit'
import { useGlobal } from '../../contexts/global/global-context'
import { useCurrentWallet } from '../../hooks/use-current-wallet'
import { Page } from '../../components/page'
import { Button } from '@vegaprotocol/ui-toolkit'

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
    <div className="flex gap-5">
      {Object.values(Tabs).map((tab) => (
        <Title
          data-testid={`tab-${tab.toLowerCase()}`}
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
    <Page name={wallet.name} back={Paths.Wallet.Home}>
      <>
        <div className="flex mb-10">
          <Button
            className="mr-3"
            size="sm"
            data-testid="edit-wallet"
            onClick={() => setEditing(true)}
          >
            {/* <Edit className="w-[16px]" /> */}
            Edit
          </Button>
          <Button
            data-testid="remove-wallet"
            size="sm"
            onClick={() => setRemoving(true)}
          >
            {/* <Trash className="w-[16px]" /> */}
            Delete
          </Button>
        </div>
        <TabTitles activeTab={tab} setTab={setTab} />
        {tab === Tabs.KEYPAIRS && (
          <KeypairList
            wallet={wallet}
            onClick={(publicKey) =>
              navigate(
                Paths.Wallet.Keypair(encodeURIComponent(wallet.name), publicKey)
              )
            }
          />
        )}
        {tab === Tabs.CONNECTIONS && <ConnectionList wallet={wallet} />}
        {tab === Tabs.KEYPAIRS && (
          <button
            className="underline"
            data-testid="generate-keypair"
            onClick={() => {
              dispatch(actions.addKeypairAction(wallet.name))
            }}
          >
            Generate key pair
          </button>
        )}
        <Dialog size="lg" open={isRemoving} title="Remove wallet">
          <RemoveWallet onClose={() => setRemoving(false)} />
        </Dialog>
        <Dialog open={isEditing} onChange={setEditing} title="Edit wallet">
          <WalletEdit onClose={() => setEditing(false)} />
        </Dialog>
      </>
    </Page>
  )
}
