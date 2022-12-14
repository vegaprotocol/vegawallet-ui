import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { Intent } from '../../config/intent'
import { LogLevels } from '../../config/log-levels'
import { useGlobal } from '../../contexts/global/global-context'
import { FormStatus, useFormState } from '../../hooks/use-form-state'
import type { AppConfig } from '../../types/service'
import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { ButtonUnstyled } from '../button-unstyled'
import { Dialog } from '../dialog'
import { FormGroup } from '../form-group'
import { Select } from '../forms'
import { Input } from '../forms/input'
import { RadioGroup } from '../radio-group'
import { AppToaster } from '../toaster'

const useUpdateConfig = () => {
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

interface FormFields {
  vegaHome: string
  logLevel: string
  defaultNetwork: string
  telemetry: 'yes' | 'no' // radio group requires string value
}

export function Settings() {
  const {
    state: { isSettingsModalOpen, config },
    dispatch,
  } = useGlobal()

  const { submit, status } = useUpdateConfig()
  const isPending = status === FormStatus.Pending

  if (!config) {
    return null
  }

  return (
    <Dialog
      open={isSettingsModalOpen}
      onChange={(open) => dispatch({ type: 'SET_SETTINGS_MODAL', open })}
    >
      <SettingsForm
        config={config}
        onSubmit={submit}
        onCancel={() => dispatch({ type: 'SET_SETTINGS_MODAL', open: false })}
        isPending={isPending}
      />
    </Dialog>
  )
}

interface SettingsFormProps {
  onSubmit: (fields: FormFields) => void
  onCancel: () => void
  config: AppConfig
  isPending: boolean
}

const SettingsForm = ({
  onSubmit,
  onCancel,
  config,
  isPending,
}: SettingsFormProps) => {
  const { control, register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      vegaHome: config.vegaHome,
      logLevel: config.logLevel,
      defaultNetwork: config.defaultNetwork,
      telemetry: config.telemetry.enabled ? 'yes' : 'no',
    },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="settings-form"
      className="p-[20px]"
    >
      <FormGroup
        label="Wallet directory"
        labelFor="vegaHome"
        helperText="This specifies where the app writes and reads its data. Warning! Changing this will remove existing wallets."
      >
        <Input {...register('vegaHome')} />
      </FormGroup>
      <FormGroup
        label="Log level"
        labelFor="logLevel"
        helperText="Logs can be found at in your Vega home directory"
      >
        <Select {...register('logLevel')} data-testid="log-level">
          {Object.entries(LogLevels).map(([key, value]) => (
            <option value={value} key={key}>
              {key}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup
        label="Report bugs and crashes"
        labelFor="telemetry"
        helperText="Selecting yes will help developers improve the software"
      >
        <RadioGroup
          name="telemetry"
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
          control={control}
        />
      </FormGroup>
      <ButtonGroup orientation="vertical">
        <Button
          type="submit"
          disabled={isPending}
          loading={isPending}
          data-testid="update-settings"
        >
          Update and restart
        </Button>
        <ButtonUnstyled onClick={onCancel} data-testid="cancel-settings">
          Cancel
        </ButtonUnstyled>
      </ButtonGroup>
    </form>
  )
}
