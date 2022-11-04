import { NetworkImportForm } from '../network-import-form'

type AddNetworkProps = {
  onSubmit: (network: string) => void
  onCancel: () => void
}

export const AddNetwork = ({ onSubmit, onCancel }: AddNetworkProps) => {
  return (
    <div style={{ padding: 20 }}>
      <NetworkImportForm onComplete={onSubmit} onCancel={onCancel} />
    </div>
  )
}
