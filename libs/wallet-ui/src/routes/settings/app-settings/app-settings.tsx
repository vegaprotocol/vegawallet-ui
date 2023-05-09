import { Button, Radio, RadioGroup } from '@vegaprotocol/ui-toolkit'
import { useGlobal } from '../../../contexts/global/global-context'
import { Page } from '../../../components/page'
import { FormGroup } from '../../../components/form-group'
import { Input, Select } from '../../../components/forms'
import { LogLevels } from '../../../config/log-levels'
import { Controller, useForm } from 'react-hook-form'
import type { FormFields } from './hooks'
import { YesNo } from './hooks'
import { useUpdateConfig } from './hooks'
import { FormStatus } from '../../../hooks/use-form-state'
import { HelperText } from '../../../components/helper-text'
import { Paths } from '../..'

export const AppSettings = () => {
  const {
    state: { config },
  } = useGlobal()

  const { register, handleSubmit, control } = useForm<FormFields>({
    defaultValues: {
      vegaHome: config?.vegaHome,
      logLevel: config?.logLevel,
      defaultNetwork: config?.defaultNetwork,
      telemetry: config?.telemetry.enabled ? YesNo.Yes : YesNo.No,
    },
  })
  const { submit, status } = useUpdateConfig()
  const isPending = status === FormStatus.Pending

  if (!config) {
    return null
  }
  return (
    <Page name="App settings" back={Paths.Settings.Home}>
      <form onSubmit={handleSubmit(submit)}>
        <FormGroup label="Wallet directory" labelFor="wallet-directory">
          <Input {...register('vegaHome')} type="text" id="wallet-directory" />
          <HelperText text="This specifies where the app writes and reads it data. Warning! Changing this will remove existing wallets." />
        </FormGroup>
        <FormGroup label="Log level" labelFor="logLevel">
          <Select {...register('logLevel')} id="logLevel">
            {Object.entries(LogLevels).map(([key, value]) => (
              <option value={value} key={key}>
                {key}
              </option>
            ))}
          </Select>
          <HelperText text="Logs can be found in your Vega home directory." />
        </FormGroup>
        <FormGroup label="Report bugs and crashes" labelFor="telemetry">
          <Controller
            name="telemetry"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={
                  typeof field.value === 'string' ? field.value : undefined
                }
                onChange={field.onChange}
                name={field.name}
              >
                <Radio id="yes" label={'Yes'} value={YesNo.Yes} />
                <Radio id="no" label={'No'} value={YesNo.No} />
              </RadioGroup>
            )}
          />
          <HelperText text="Selecting yes will help developers improve the software." />
        </FormGroup>
        <Button
          disabled={isPending}
          data-testid="update-settings"
          type="submit"
          className="mt-4"
          variant="primary"
        >
          Update and restart
        </Button>
      </form>
    </Page>
  )
}
