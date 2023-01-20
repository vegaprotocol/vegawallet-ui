import type { ReactNode } from 'react'
import { useCallback } from 'react'
import type { Control, FieldArrayWithId } from 'react-hook-form'
import { Controller, useFieldArray } from 'react-hook-form'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type { WalletModel } from '@vegaprotocol/wallet-admin'

import { truncateMiddle } from '../../lib/truncate-middle'
import { Tick } from '../icons/tick'
import { RadioGroup } from '../radio-group'
import { Title } from '../title'
import type { NormalizedPermissionMap, Permission } from './connection-manage'

const LabelMapping: Record<Permission, string | ReactNode> = {
  none: <p className="py-[10px]">None</p>,
  'read-all': (
    <span className="py-[10px]">
      <p>Allow access to all keys</p>
      <p className="text-xs">Including any you create in the future</p>
    </span>
  ),
  read: <p className="py-[10px]">Allow access to specific keys</p>,
}

type FieldItem = FieldArrayWithId<
  NormalizedPermissionMap,
  'publicKeys.allowedKeys',
  'id'
>

type PermissionSectionProps = {
  title?: ReactNode
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
  title,
  accessType,
  control,
}: PermissionSectionProps) => {
  const { fields, update } = useFieldArray({
    name: `${accessType}.allowedKeys`,
    control,
  })

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
    <div>
      <Controller
        name={`${accessType}.access`}
        control={control}
        render={({ field }) => (
          <>
            {title}
            <RadioGroup
              name={`${accessType}.access`}
              control={control}
              options={(Object.keys(LabelMapping) as Permission[]).map(
                (key) => ({
                  label: LabelMapping[key],
                  value: key,
                })
              )}
            />
            {field.value === 'read' && (
              <div className="py-[16px]">
                <p className="mb-[10px]">You must select at least one key</p>
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
                        <Title className="my-0 pr-[12px]">{field.name}</Title>(
                        <code>{truncateMiddle(field.key)}</code>)
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}
