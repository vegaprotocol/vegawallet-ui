import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type { ReactNode } from 'react'
import type { Control, Path, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Tick } from '../icons/tick'

type CheckboxProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: ReactNode
}

export function Checkbox<T extends FieldValues>({
  name,
  control,
  label,
}: CheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className="flex items-center gap-[10px]">
            <CheckboxPrimitive.Root
              checked={!!field.value}
              onCheckedChange={field.onChange}
              name={name}
              id={name}
              className="inline-flex items-center justify-center w-[16px] h-[16px] bg-dark-200"
            >
              <CheckboxPrimitive.Indicator className="flex items-center justify-center w-[10px] h-[10px] text-white">
                <Tick className="w-[10px] h-[10px]" />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            <label htmlFor={name}>{label}</label>
          </div>
        )
      }}
    />
  )
}
