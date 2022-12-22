import { NetworkImportForm } from '../network-import-form'

type AddNetworkProps = {
  onSubmit: (network: string) => void
  onCancel: () => void
}

export const AddNetwork = ({ onSubmit, onCancel }: AddNetworkProps) => {
  return (
    <div className="p-[20px]">
      <NetworkImportForm onComplete={onSubmit} onCancel={onCancel} />
    </div>
  )
}
