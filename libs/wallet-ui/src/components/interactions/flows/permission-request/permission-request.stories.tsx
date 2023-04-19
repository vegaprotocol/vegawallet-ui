import type { Meta, Story } from '@storybook/react'
import { GlobalProvider } from '../../../../contexts/global/global-provider'
import { PermissionRequest } from './permission-request'
import { service, client, runtime } from '../../../../../src/mocks'

export default {
  component: PermissionRequest,
  title: 'Interactions/Permissions/Permissions',
} as Meta

const NOOP = () => undefined

const Template: Story = () => (
  <GlobalProvider service={service} client={client} runtime={runtime}>
    <PermissionRequest
      onClose={NOOP}
      onUpdate={NOOP}
      data={{
        traceID: 'traceID',
        workflow: 'PERMISSION_REQUEST',
        hostname: 'hostname',
        permissions: { public_keys: 'read' },
      }}
    />
  </GlobalProvider>
)

export const Default = Template.bind({})
Default.args = {}
