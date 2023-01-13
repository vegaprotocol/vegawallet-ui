import { useState, useCallback } from 'react'
import classnames from 'classnames'
import { sentenceCase } from 'change-case'
import type { Control, FieldArrayWithId } from 'react-hook-form'
import { Controller, useFieldArray } from 'react-hook-form'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { truncateMiddle } from '../../lib/truncate-middle'
import { Tick } from '../icons/tick'
import { RadioGroup } from '../radio-group'
import { Title } from '../title'
import type { NormalizedPermissionMap } from './connection-manage'

const AccessModes: Record<
  string,
  WalletModel.Permissions['publicKeys']['access']
> = {
  'Read your key pairs': 'read',
  None: 'none',
}

type FieldItem = FieldArrayWithId<
  NormalizedPermissionMap,
  'publicKeys.restrictedKeys',
  'id'
>

type PermissionSectionProps = {
  accessType: keyof WalletModel.Permissions
  control: Control<NormalizedPermissionMap>
  setAllFields: (value: boolean) => void
}

type PermissionType = 'all' | 'some'
type PermissionOption = {
  value: PermissionType
  label: string
}

const PERMISSON_KEY_OPTIONS: PermissionOption[] = [
  {
    value: 'all',
    label: 'All my key pairs',
  },
  {
    value: 'some',
    label: 'Some key pairs',
  },
]

const isLastItemAboutToBeUnchecked = (
  current: FieldItem,
  fields: FieldItem[]
) => {
  const checkedItems = fields.filter((field) => field.value)
  return checkedItems.length === 1 && checkedItems[0].id === current.id
}

export const PermissionSection = ({
  accessType,
  control,
  setAllFields,
}: PermissionSectionProps) => {
  const title = sentenceCase(accessType)
  const { fields, update } = useFieldArray({
    name: `${accessType}.restrictedKeys`,
    control,
  })
  const [permissionType, setPermissionType] = useState<PermissionType>('all')

  const handlePermissionTypeChange = useCallback(
    (value: PermissionType) => {
      setPermissionType(value)
      setAllFields(value === 'some')
    },
    [fields, setAllFields, setPermissionType]
  )

  const handleCheckedChange = useCallback(
    (
      index: number,
      field: FieldItem,
      value: CheckboxPrimitive.CheckedState
    ) => {
      if (!isLastItemAboutToBeUnchecked(field, fields)) {
        update(index, {
          ...field,
          value: !!value,
        })
      }
    },
    [fields, update]
  )

  return (
    <div className="pb-[20px]">
      <Controller
        name={`${accessType}.access`}
        control={control}
        render={({ field }) => (
          <>
            <Title>{title}</Title>
            <RadioGroup
              name={`${accessType}.access`}
              control={control}
              options={Object.keys(AccessModes).map((label) => ({
                label,
                value: AccessModes[label],
              }))}
            />
            {field.value !== 'none' && (
              <>
                <Title>For which key pairs</Title>
                <RadioGroupPrimitive.RadioGroup
                  value={permissionType}
                  name="permission-type"
                  orientation="vertical"
                  onValueChange={(value) =>
                    handlePermissionTypeChange(value as PermissionType)
                  }
                >
                  {PERMISSON_KEY_OPTIONS.map((o) => (
                    <div key={o.value} className="flex items-center gap-[10px]">
                      <RadioGroupPrimitive.Item
                        value={o.value}
                        id={o.value}
                        className={classnames(
                          'inline-flex items-center justify-center bg-dark-300',
                          'rounded-full w-[16px] h-[16px]'
                        )}
                      >
                        <RadioGroupPrimitive.Indicator className="w-[8px] h-[8px] bg-white rounded-full" />
                      </RadioGroupPrimitive.Item>
                      <label htmlFor={o.value}>{o.label}</label>
                    </div>
                  ))}
                </RadioGroupPrimitive.RadioGroup>
              </>
            )}
            {field.value !== 'none' &&
              permissionType === 'some' &&
              fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-[10px]">
                  <CheckboxPrimitive.Root
                    checked={!!field.value}
                    onCheckedChange={(value) =>
                      handleCheckedChange(index, field, value)
                    }
                    name={`${accessType}.restrictedKeys.${index}.value`}
                    id={field.id}
                    className="inline-flex items-center justify-center w-[16px] h-[16px] bg-dark-200"
                  >
                    <CheckboxPrimitive.Indicator className="flex items-center justify-center w-[10px] h-[10px] text-white">
                      <Tick className="w-[10px] h-[10px]" />
                    </CheckboxPrimitive.Indicator>
                  </CheckboxPrimitive.Root>
                  <label htmlFor={field.name}>
                    <div className="flex items-center cursor-pointer">
                      <Title className="pr-[12px]">{field.name}</Title>(
                      <code>{truncateMiddle(field.key)}</code>)
                    </div>
                  </label>
                </div>
              ))}
          </>
        )}
      />
    </div>
  )
}
