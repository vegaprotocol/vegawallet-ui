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

const HelperText = ({ text }: { text: string }) => (
  <div className="mt-1 text-sm text-neutral-light">{text}</div>
)

export const AppSettings = () => {
  return (
    <Page name="App settings" back={true}>
      <form>
        <FormGroup label="Wallet directory" labelFor="wallet-directory">
          <Input type="text" id="wallet-directory" />
          <HelperText text="This specifies where the app writes and reads it data. Warning! Changing this will remove existing wallets." />
        </FormGroup>
        <FormGroup label="Log level" labelFor="log-level">
          <Select id="log-level">
            {Object.entries(LogLevels).map(([key, value]) => (
              <option value={value} key={key}>
                {key}
              </option>
            ))}
          </Select>
          <HelperText text="Logs can be found in your Vega home directory." />
        </FormGroup>
        <FormGroup label="Report bugs and crashes" labelFor="telemetry">
          <RadioGroup value={undefined}>
            <Radio id="associate-radio-contract" label={'Yes'} value={'true'} />
            <Radio id="associate-radio-wallet" label={'No'} value={'false'} />
          </RadioGroup>
          <HelperText text="Selecting yes will help developers improve the software." />
        </FormGroup>
        <Button className="mt-4" variant="primary">
          Update and restart
        </Button>
      </form>
    </Page>
  )
}
