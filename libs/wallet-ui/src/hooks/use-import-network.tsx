import { useMemo, useCallback, useState } from 'react'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import { useGlobal } from '../contexts/global/global-context'
import { FormStatus, useFormState } from './use-form-state'

interface ImportNetworkArgs {
  name: string
  network: string
  fileOrUrl: string
  force: boolean
}

export function useImportNetwork() {
  const { actions, client, dispatch, service } = useGlobal()
  const logger = useMemo(() => service.GetLogger('ImportNetwork'), [service])
  const [status, setStatus] = useFormState()
  const [response, setResponse] =
    useState<WalletModel.DescribeNetworkResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const submit = useCallback(
    async (values: ImportNetworkArgs) => {
      setStatus(FormStatus.Pending)
      const { name, url, force } = createImportNetworkArgs(values)

      try {
        const res = await client.ImportNetwork({
          name,
          url,
          overwrite: force,
        })

        if (res && res.name) {
          const config = await client.DescribeNetwork({
            name: res.name,
          })

          // Update the config
          dispatch(actions.addNetworkAction(res.name, config))

          setStatus(FormStatus.Success)
          setResponse(config)

          AppToaster.show({
            message: `Network imported`,
            intent: Intent.SUCCESS,
          })
        } else {
          throw new Error("Error: couldn't import network configuration")
        }
      } catch (err: unknown) {
        setError(`${err}`)
        setStatus(FormStatus.Error)
        logger.error(err)
        AppToaster.show({
          message: `${err}`,
          intent: Intent.DANGER,
        })
      }
    },
    [dispatch, setStatus, client, actions, logger]
  )

  return {
    status,
    response,
    submit,
    error,
  }
}

function createImportNetworkArgs(values: ImportNetworkArgs) {
  // Other option is selected so figure out whether the fileOrUrl input is a url or not
  // and use the relevant object property
  if (values.network === 'other') {
    const isUrl = /^(http|https):\/\/[^ "]+$/i.test(values.fileOrUrl)
    return {
      name: values.name,
      url: `${isUrl ? '' : 'file://'}${values.fileOrUrl}`,
      force: values.force,
    }
  }

  // One of the presets have been used
  return {
    name: '',
    url: values.network,
    force: false,
  }
}
