import { useMemo } from 'react'
import { useGlobal } from '../../../contexts/global/global-context'
import { FormStatus, useFormState } from '../../../hooks/use-form-state'
import { Intent } from '../../../config/intent'
import { AppToaster } from '../../../components/toaster'
import type { ServiceConfig } from '../../../types'

export interface FormFields {
  logLevel: string
  port: number
}

export const useUpdateServiceConfig = (config: ServiceConfig | null) => {
  const { service, runtime } = useGlobal()
  const logger = useMemo(() => service.GetLogger('Settings'), [service])
  const [status, setStatus] = useFormState()
  const submit = async (fields: FormFields) => {
    try {
      if (!config) throw new Error('Could not load service config')
      logger.debug('UpdateAppConfig')
      setStatus(FormStatus.Pending)
      await service.UpdateServiceConfig({
        ...config,
        ...{
          logLevel: fields.logLevel,
          server: {
            port: fields.port,
            host: config.server.host,
          },
        },
      })
      runtime.WindowReload()
    } catch (err) {
      const message = 'Failed to update config'
      AppToaster.show({ message, intent: Intent.DANGER })
      logger.error(err)
      setStatus(FormStatus.Error)
    } finally {
      setStatus(FormStatus.Default)
    }
  }

  return { submit, status }
}
