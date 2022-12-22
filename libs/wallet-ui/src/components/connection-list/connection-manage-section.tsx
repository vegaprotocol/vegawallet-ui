import { sentenceCase } from 'change-case'
import type { Control } from 'react-hook-form'
import { Controller, useFieldArray } from 'react-hook-form'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { truncateMiddle } from '../../lib/truncate-middle'
import { Checkbox } from '../checkbox'
import { RadioGroup } from '../radio-group'
import { Title } from '../title'
import type { NormalizedPermissionMap } from './connection-manage'

const AccessModes: Record<
  string,
  WalletModel.Permissions['publicKeys']['access']
> = {
  Read: 'read',
  None: 'none',
}

type PermissionSectionProps = {
  accessType: keyof WalletModel.Permissions
  control: Control<NormalizedPermissionMap>
}

export const PermissionSection = ({
  accessType,
  control,
}: PermissionSectionProps) => {
  const title = sentenceCase(accessType)
  const { fields } = useFieldArray({
    name: `${accessType}.restrictedKeys`,
    control,
  })

  return (
    <div className="py-[20px]">
      <Controller
        name={`${accessType}.access`}
        control={control}
        render={({ field }) => (
          <>
            <Title className="py-[20px]">{title}</Title>
            <RadioGroup
              name={`${accessType}.access`}
              control={control}
              options={Object.keys(AccessModes).map((label) => ({
                label,
                value: AccessModes[label],
              }))}
            />
            {field.value !== 'none' && <Title>Key pairs</Title>}
            {field.value !== 'none' &&
              fields.map((field, index) => (
                <Checkbox
                  key={field.id}
                  name={`${accessType}.restrictedKeys.${index}.value`}
                  label={
                    <div className="flex items-center cursor-pointer">
                      <Title className="pr-[12px]">{field.name}</Title>(
                      <code>{truncateMiddle(field.key)}</code>)
                    </div>
                  }
                  control={control}
                />
              ))}
          </>
        )}
      />
    </div>
  )
}
