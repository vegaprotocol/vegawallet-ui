import { useState, useCallback, useMemo } from 'react'

import { AppToaster } from '../components/toaster'
import { Intent } from '../config/intent'
import { useGlobal } from '../contexts/global/global-context'

export const useSign = (pubKey?: string, wallet?: string) => {
  const { client, service } = useGlobal()
  const logger = useMemo(() => service.GetLogger('Sign'), [service])
  const [signedData, setSignedData] = useState<string>('')
  const sign = useCallback(
    async (values: { message: string }) => {
      try {
        if (!pubKey || !wallet) {
          return
        }

        const params = {
          wallet,
          publicKey: pubKey,
          pubKey, // FIXME: public key has to be passed twice here because of the wallet api bug that accepts pubKey and not publicKey param (as per schema)
          encodedMessage: btoa(values.message),
        }

        const resp = await client.SignMessage(params)
        setSignedData(resp.encodedSignature)
        AppToaster.show({
          message: `Message signed successfully`,
          intent: Intent.SUCCESS,
        })
      } catch (err) {
        AppToaster.show({ message: `${err}`, intent: Intent.DANGER })
        logger.error(err)
      }
    },
    [logger, client, pubKey, wallet]
  )
  return {
    signedData,
    setSignedData,
    sign,
  }
}
