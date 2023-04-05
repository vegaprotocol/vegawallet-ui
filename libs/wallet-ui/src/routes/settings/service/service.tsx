import { Button, FormGroup, Input, Select } from '@vegaprotocol/ui-toolkit'
import { LogLevels } from '../../../config/log-levels'
import { Page } from '../../../components/page'
import { useGlobal } from '../../../contexts/global/global-context'
import { useForm } from 'react-hook-form'
import type { FormFields } from './hooks'
import { useUpdateServiceConfig } from './hooks'
import { FormStatus } from '../../../hooks/use-form-state'
import { HelperText } from '../../../components/helper-text'

export const Service = () => {
  const {
    state: { serviceConfig },
  } = useGlobal()
  const { submit, status } = useUpdateServiceConfig(serviceConfig)
  const isPending = status === FormStatus.Pending
  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      logLevel: serviceConfig?.logLevel,
      port: serviceConfig?.server.port,
    },
  })
  return (
    <Page name="Service" back={true}>
      <form onSubmit={handleSubmit(submit)}>
        <FormGroup label="Port" labelFor="wallet-directory">
          <Input {...register('port')} type="number" id="port" />
          <HelperText text="This specifies the port that the service will run on." />
        </FormGroup>
        <FormGroup label="Log level" labelFor="log-level">
          <Select id="log-level" {...register('logLevel')}>
            {Object.entries(LogLevels).map(([key, value]) => (
              <option value={value} key={key}>
                {key}
              </option>
            ))}
          </Select>
          <HelperText text="Logs can be found in your Vega home directory." />
        </FormGroup>
        <Button
          disabled={isPending}
          data-testid="update-service-settings"
          type="submit"
          className="mt-4"
          variant="primary"
        >
          Save changes
        </Button>
      </form>
    </Page>
  )
}
