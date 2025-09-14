import InputRadio from '@/components/ui/InputRadio'
import RhfInput from '@/components/ui/RhfInput'
import cn from '@/hooks/cn'
import { useSnackbar } from '@/hooks/useSnackbar'
import { ErrorMessage } from '@hookform/error-message'
import { useEffect, useState } from 'react'
import type { Control, FieldValues, RegisterOptions } from 'react-hook-form'
import { useController } from 'react-hook-form'

export type ReasonType = {
  label: string
}

type ReasonProps = {
  items: ReasonType[]
  className?: string
  control: Control<FieldValues>
  rules?: RegisterOptions
  onChangeReason?: () => void
}

export default function Reason({ control, className, items, rules, onChangeReason }: ReasonProps) {
  const [isTouched, setIsTouched] = useState(false)
  const [checkedItem, setCheckedItem] = useState<ReasonType | null>(null)
  const { showSnackbar } = useSnackbar()

  const {
    field: { onChange, value },
    formState: { errors },
  } = useController({ name: 'reason', defaultValue: '', control, rules })

  useEffect(() => {
    setCheckedItem(value)
  }, [value])

  const handleClick = (checked: boolean, item: ReasonType) => {
    checked ? setCheckedItem(item) : setCheckedItem(null)
    checked ? onChange(item) : onChange('')
    onChangeReason && onChangeReason()
    setIsTouched(true)

    if (item.label === 'その他' && checked) {
      if (!value.otherReason?.trim()) {
        showSnackbar('「その他」の内容を入力してください。', 'warning')
      }
    }
  }

  const isSelected = (item: ReasonType) => {
    return checkedItem?.label === item.label
  }

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {...items.map((item, index) => {
        if (item.label === 'その他') {
          return (
            <div key={index} className='flex w-full items-center gap-2'>
              <InputRadio
                label={item.label}
                className='w-28'
                checked={isSelected(item)}
                onClick={(value) => handleClick(value, item)}
              />
              <RhfInput
                className='h-12 w-full'
                placeholder='その他の内容を入力'
                name='otherReason'
                control={control}
                readonly={!isSelected(item)}
              />
            </div>
          )
        }

        return (
          <InputRadio
            key={index}
            label={item.label}
            checked={isSelected(item)}
            onClick={(value) => handleClick(value, item)}
          />
        )
      })}

      {isTouched && (
        <ErrorMessage
          errors={errors}
          name='reason'
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([name, message]) => (
              <p key={name} className='p-1 text-sm text-warn-red'>
                {message}
              </p>
            ))
          }
        />
      )}
    </div>
  )
}
