import {
  Button,
  FormGroup,
  Input,
  Radio,
  RadioGroup,
  Select,
} from '@vegaprotocol/ui-toolkit'
import { Page } from '../../../components/page'
import { LogLevels } from '../../../config/log-levels'

export const AppSettings = () => {
  return (
    <Page name="App settings" back={true}>
      <form>
        <FormGroup label="Wallet directory" labelFor="wallet-directory">
          <Input type="text" id="wallet-directory" />
          <p>
            This specifies where the app writes and reads it data. Warning!
            Changing this will remove existing wallets.
          </p>
        </FormGroup>
        <FormGroup label="Log level" labelFor="log-level">
          <Select id="log-level">
            {Object.entries(LogLevels).map(([key, value]) => (
              <option value={value} key={key}>
                {key}
              </option>
            ))}
          </Select>
          <p>Logs can be found in your Vega home directory.</p>
        </FormGroup>
        <FormGroup label="Report bugs and crashes" labelFor="telemetry">
          <RadioGroup value={undefined}>
            <Radio id="associate-radio-contract" label={'Yes'} value={'true'} />
            <Radio id="associate-radio-wallet" label={'No'} value={'false'} />
          </RadioGroup>
          <p className="mt-1 text-sm text-neutral--light">
            Selecting yes will help developers improve the software.
          </p>
        </FormGroup>
        <Button variant="primary">Update and restart</Button>
      </form>
    </Page>
  )
}
