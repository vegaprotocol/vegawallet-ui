import { useCallback } from 'react'
import type { Control, FieldArrayWithId } from 'react-hook-form'
import { Controller, useFieldArray } from 'react-hook-form'
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
  'publicKeys.allowedKeys',
  'id'
>

type PermissionSectionProps = {
  isAllFieldsChecked: boolean
  accessType: keyof WalletModel.Permissions
  control: Control<NormalizedPermissionMap>
  setAllFields: (value: boolean) => void
}

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
  isAllFieldsChecked,
  setAllFields,
}: PermissionSectionProps) => {
  const title = 'Permitted actions'
  const { fields, update } = useFieldArray({
    name: `${accessType}.allowedKeys`,
    control,
  })

  const handlePermissionTypeChange = useCallback(
    (value: boolean) => {
      setAllFields(value)
    },
    [setAllFields]
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
                <div className="flex items-center gap-[10px]">
                  <CheckboxPrimitive.Root
                    id={`permission-${accessType}-all`}
                    name={`permission-${accessType}-all`}
                    checked={isAllFieldsChecked}
                    onCheckedChange={(value) =>
                      handlePermissionTypeChange(!!value)
                    }
                    className="inline-flex items-center justify-center w-[16px] h-[16px] bg-dark-200"
                  >
                    <CheckboxPrimitive.Indicator>
                      <Tick className="w-[10px] h-[10px]" />
                    </CheckboxPrimitive.Indicator>
                  </CheckboxPrimitive.Root>
                  <label htmlFor={`permission-${accessType}-all`}>
                    <div className="mt-[20px] cursor-pointer">
                      <Title className="my-0 pr-[12px]">All</Title>
                      <p>including any you create in the future</p>
                    </div>
                  </label>
                </div>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-[10px]">
                    <CheckboxPrimitive.Root
                      checked={!!field.value}
                      onCheckedChange={(value) =>
                        handleCheckedChange(index, field, value)
                      }
                      name={`${accessType}.allowedKeys.${index}.value`}
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
          </>
        )}
      />
    </div>
  )
}
