import classnames from 'classnames'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import type { ComponentProps } from 'react'
import type { Control, Path, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'

type RadioGroupProps<T extends FieldValues> = {
  name: Path<T>
  options: Array<{ value: string; label: string }>
  // TODO: Figure out how best to type the control prop, it should be form generic
  control: Control<T>
  rules?: ComponentProps<typeof Controller>['rules']
  orientation?: 'vertical' | 'horizontal'
  itemClass?: string
}

export function RadioGroup<T extends FieldValues>({
  name,
  control,
  rules,
  options,
  itemClass,
  orientation = 'vertical',
}: RadioGroupProps<T>) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field }) => {
        return (
          <RadioGroupPrimitive.Root
            value={typeof field.value === 'string' ? field.value : undefined}
            onValueChange={field.onChange}
            name={field.name}
            orientation={orientation}
            className={classnames({
              grid: orientation === 'horizontal',
              [`grid-cols-[${Array(options.length).fill('1fr').join('_')}]`]:
                orientation === 'horizontal',
            })}
          >
            {options.map((o) => (
              <div
                key={o.value}
                className={classnames(
                  'flex items-center gap-[10px]',
                  itemClass
                )}
              >
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
          </RadioGroupPrimitive.Root>
        )
      }}
    />
  )
}
