import { useEffect } from 'react'
import type { Control, UseFormRegister } from 'react-hook-form'
import { useFieldArray, useForm } from 'react-hook-form'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { Intent } from '../../config/intent'
import { Validation } from '../../lib/form-validation'
import { Button } from '../button'
import { FormGroup } from '../form-group'
import { Input } from '../forms/input'

interface FormFields {
  name: string
  grpcNodeRetries: number
  grpcHosts: Array<{ value: string }>
  graphqlHosts: Array<{ value: string }>
  restHosts: Array<{ value: string }>
  consoleUrl?: string
  explorerUrl?: string
  governanceUrl?: string
}

export interface NetworkConfigFormProps {
  config: WalletModel.DescribeNetworkResult
  onSubmit: (config: WalletModel.DescribeNetworkResult) => void
}

export const NetworkConfigForm = ({
  config,
  onSubmit,
}: NetworkConfigFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: configToFields(config),
  })

  // If the config changes reset the fields with the new config. This happens
  // if the network dropdown is used whilst editing
  useEffect(() => {
    reset(configToFields(config))
  }, [config, reset])

  return (
    <form
      onSubmit={handleSubmit((values: FormFields) => {
        const configUpdate = fieldsToConfig(config, values)
        onSubmit(configUpdate)
      })}
    >
      <FormGroup
        label="Console dApp URL"
        labelFor="consoleUrl"
        intent={errors.consoleUrl?.message ? Intent.DANGER : Intent.NONE}
        helperText={errors.consoleUrl?.message}
      >
        <Input
          data-testid="network-console-url"
          type="text"
          {...register('consoleUrl', {
            pattern: Validation.URL,
          })}
        />
      </FormGroup>
      <FormGroup
        label="Explorer dApp URL"
        labelFor="explorerUrl"
        intent={errors.explorerUrl?.message ? Intent.DANGER : Intent.NONE}
        helperText={errors.explorerUrl?.message}
      >
        <Input
          data-testid="network-explorer-url"
          type="text"
          {...register('explorerUrl', {
            pattern: Validation.URL,
          })}
        />
      </FormGroup>
      <FormGroup
        label="Governance dApp URL"
        labelFor="governanceUrl"
        intent={errors.governanceUrl?.message ? Intent.DANGER : Intent.NONE}
        helperText={errors.governanceUrl?.message}
      >
        <Input
          data-testid="network-token-url"
          type="text"
          {...register('governanceUrl', {
            pattern: Validation.URL,
          })}
        />
      </FormGroup>
      <h2>gRPC Nodes</h2>
      <HostEditor name="grpcHosts" control={control} register={register} />
      <h2>GraphQL Nodes</h2>
      <HostEditor name="graphqlHosts" control={control} register={register} />
      <h2>REST Nodes</h2>
      <HostEditor name="restHosts" control={control} register={register} />
      <FormGroup
        label="gRPC Node retries"
        labelFor="grpcNodeRetries"
        intent={errors.grpcNodeRetries?.message ? Intent.DANGER : Intent.NONE}
        helperText={errors.grpcNodeRetries?.message}
      >
        <Input
          data-testid="node-retries"
          type="number"
          {...register('grpcNodeRetries', {
            required: Validation.REQUIRED,
            min: Validation.NUMBER_MIN_GRPC_RETRIES,
            max: Validation.NUMBER_MAX_GRPC_RETRIES,
          })}
        />
      </FormGroup>
      <Button data-testid="submit" type="submit">
        Submit
      </Button>
    </form>
  )
}

type ArrayFields = 'graphqlHosts' | 'grpcHosts' | 'restHosts' | 'restHosts'

interface NodeEditorProps {
  name: ArrayFields
  control: Control<FormFields, object>
  register: UseFormRegister<FormFields>
}

function HostEditor({ name, control, register }: NodeEditorProps) {
  const { fields, append, remove } = useFieldArray<FormFields, ArrayFields>({
    control,
    name,
  })

  return (
    <FormGroup>
      <ul className="mb-[10px]">
        {fields.map((field, i) => {
          return (
            <li key={field.id} className="flex gap-[10px] mb-[5px]">
              <Input
                data-testid="node-list"
                type="text"
                {...register(`${name}.${i}.value`, {
                  required: Validation.REQUIRED,
                  pattern: Validation.URL,
                })}
              />
              <Button
                data-testid="remove"
                type="button"
                disabled={fields.length <= 1}
                onClick={() => {
                  if (fields.length > 1) {
                    remove(i)
                  }
                }}
              >
                Remove
              </Button>
            </li>
          )
        })}
      </ul>
      <div>
        <Button
          data-testid="add"
          type="button"
          onClick={() => append({ value: '' })}
        >
          Add
        </Button>
      </div>
    </FormGroup>
  )
}

function fieldsToConfig(
  config: WalletModel.DescribeNetworkResult,
  values: FormFields
): WalletModel.DescribeNetworkResult {
  return {
    name: values.name,
    api: {
      grpc: {
        hosts: values.grpcHosts.map((x) => x.value),
        retries: Number(values.grpcNodeRetries),
      },
      graphQL: {
        hosts: values.graphqlHosts.map((x) => x.value),
      },
      rest: {
        hosts: values.restHosts.map((x) => x.value),
      },
    },
    apps: {
      console: values.consoleUrl,
      explorer: values.explorerUrl,
      governance: values.governanceUrl,
    },
  }
}

function configToFields(config: WalletModel.DescribeNetworkResult): FormFields {
  return {
    name: config.name,
    grpcNodeRetries: config.api?.grpc?.retries || 0,
    // @ts-ignore any resulting from generated types
    grpcHosts: config.api.grpc?.hosts.map((x) => ({ value: x })) || [],
    // @ts-ignore any resulting from generated types
    graphqlHosts: config.api.graphQL?.hosts.map((x) => ({ value: x })) || [],
    // @ts-ignore any resulting from generated types
    restHosts: config.api.rest?.hosts.map((x) => ({ value: x })) || [],
    consoleUrl: config.apps.console,
    explorerUrl: config.apps.explorer,
    governanceUrl: config.apps.governance,
  }
}
