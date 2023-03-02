import { useForm } from 'react-hook-form'

import { Intent } from '../../../config/intent'
import { useGlobal } from '../../../contexts/global/global-context'
import { useOpenWallet } from '../../../hooks/use-open-wallet'
import { Validation } from '../../../lib/form-validation'
import { Button } from '../../button'
import { ButtonGroup } from '../../button-group'
import { ButtonUnstyled } from '../../button-unstyled'
import { Dialog } from '../../dialog'
import { requestPassphrase } from '../../passphrase-modal'
import { RadioGroup } from '../../radio-group'
import { AppToaster } from '../../toaster'
import type {
  InteractionContentProps,
  RequestWalletSelection,
} from '../../../types/interaction'
import { INTERACTION_RESPONSE_TYPE } from '../../../types/interaction'

export const WalletSelection = ({
  event,
  isResolved,
  setResolved,
}: InteractionContentProps<RequestWalletSelection>) => {
  const { getWalletData } = useOpenWallet()
  const { service, client, dispatch } = useGlobal()
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ wallet: string }>({
    mode: 'onChange',
  })

  const handleApprove = async ({ wallet }: { wallet: string }) => {
    if (!isResolved) {
      const passphrase = await requestPassphrase()

      try {
        await getWalletData(wallet, passphrase)
      } catch (err) {
        AppToaster.show({
          intent: Intent.DANGER,
          message: `${err}`,
        })
      }

      try {
        await service.RespondToInteraction({
          traceID: event.traceID,
          name: 'SELECTED_WALLET',
          data: {
            wallet,
          },
        })

        const { permissions } = await client.DescribePermissions({
          wallet,
          passphrase,
          hostname: event.data.hostname,
        })

        dispatch({
          type: 'ADD_CONNECTION',
          wallet,
          connection: {
            hostname: event.data.hostname,
            active: true,
            permissions,
          },
        })
      } catch (err) {
        AppToaster.show({
          message: `${err}`,
          intent: Intent.DANGER,
        })
      }

      setResolved(true)
    }
  }

  const handleReject = async () => {
    if (!isResolved) {
      try {
        // @ts-ignore: wails generates the wrong type signature for this handler
        await service.RespondToInteraction({
          traceID: event.traceID,
          name: INTERACTION_RESPONSE_TYPE.CANCEL_REQUEST,
        })
        AppToaster.show({
          message: `The connection request from "${event.data.hostname}" has been rejected.`,
          intent: Intent.SUCCESS,
        })
      } catch (err) {
        AppToaster.show({
          message: `${err}`,
          intent: Intent.DANGER,
        })
      }

      setResolved(true)
    }
  }

  return (
    <Dialog open={true} size="lg" title="Approve connection">
      <form
        onSubmit={handleSubmit(handleApprove)}
        data-testid="wallet-selection-modal"
        className="px-[20px] pb-[20px]"
      >
        <p className="mb-[20px] p-[20px] text-center border border-pink">
          <strong>{event.data.hostname}</strong> is requesting access to a
          wallet
        </p>
        <p>
          Approving a connection allows this site to see your wallet chain ID,
          and may allow access to your public keys and allow you to approve
          transactions depending on your wallet permissions.
        </p>
        <div className="mt-[20px]">Select a wallet to connect to:</div>
        <div className="flex flex-col gap-[12px] mt-[20px] mb-[32px]">
          <RadioGroup
            name="wallet"
            rules={{
              required: Validation.REQUIRED,
            }}
            control={control}
            options={event.data.availableWallets.map((w) => ({
              value: w,
              label: w,
            }))}
            itemClass="p-[10px] border-t-dark-100 w-full"
          />
        </div>
        <ButtonGroup inline>
          <Button
            data-testid="wallet-connection-approve"
            type="submit"
            disabled={!isValid}
          >
            Approve
          </Button>
          <ButtonUnstyled
            data-testid="wallet-connection-reject"
            onClick={handleReject}
          >
            Cancel
          </ButtonUnstyled>
        </ButtonGroup>
      </form>
    </Dialog>
  )
}
