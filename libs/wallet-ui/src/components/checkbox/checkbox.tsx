import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type { ReactNode } from 'react'
import type { Control, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Colors } from '../../config/colors'
import { Tick } from '../icons/tick'

type CheckboxProps<T> = {
  name: Path<T>
  control: Control<T>
  label: ReactNode
}

export function Checkbox<T>({ name, control, label }: CheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div style={wrapper}>
            <CheckboxPrimitive.Root
              checked={!!field.value}
              onCheckedChange={field.onChange}
              name={name}
              id={name}
              style={box}
            >
              <CheckboxPrimitive.Indicator style={boxInner}>
                <Tick style={{ width: 10, height: 10 }} />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            <label htmlFor={name}>{label}</label>
          </div>
        )
      }}
    />
  )
}

const wrapper = {
  display: 'flex',
  alignItems: 'center',
  gap: 10
}

const box = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  background: Colors.DARK_GRAY_5
}

const boxInner = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 10,
  height: 10,
  color: Colors.WHITE
}
