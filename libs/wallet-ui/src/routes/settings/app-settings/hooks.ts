import { AppToaster } from '../../../components/toaster'
import { useGlobal } from '../../../contexts/global/global-context'
import { useMemo } from 'react'
import { FormStatus, useFormState } from '../../../hooks/use-form-state'
import { Intent } from '../../../config/intent'

export interface FormFields {
  vegaHome: string
  logLevel: string
  defaultNetwork: string
  telemetry: 'yes' | 'no' // radio group requires string value
}

export const useUpdateConfig = () => {
  const { service, runtime } = useGlobal()
  const logger = useMemo(() => service.GetLogger('Settings'), [service])
  const [status, setStatus] = useFormState()
  const submit = async (fields: FormFields) => {
    try {
      logger.debug('UpdateAppConfig')
      setStatus(FormStatus.Pending)
      await service.UpdateAppConfig({
        vegaHome: fields.vegaHome,
        logLevel: fields.logLevel,
        defaultNetwork: fields.defaultNetwork,
        telemetry: {
          enabled: fields.telemetry === 'yes' ? true : false,
          consentAsked: true,
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
