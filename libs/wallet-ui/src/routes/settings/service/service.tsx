import { Button, FormGroup, Input, Select } from '@vegaprotocol/ui-toolkit'
import { LogLevels } from '../../../config/log-levels'
import { Page } from '../../../components/page'

export const Service = () => {
  return (
    <Page name="Service" back={true}>
      <form>
        <FormGroup label="Port" labelFor="wallet-directory">
          <Input type="number" id="port" />
        </FormGroup>
        <FormGroup label="Log level" labelFor="log-level">
          <Select id="log-level">
            {Object.entries(LogLevels).map(([key, value]) => (
              <option value={value} key={key}>
                {key}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup label="Token expiry (seconds)" labelFor="token-expiry">
          <Input type="token-expiry" id="port" />
        </FormGroup>
        <Button className="mt-4" variant="primary">
          Save changes
        </Button>
      </form>
    </Page>
  )
}
