import InputDate from '@/components/ui/InputDate'
import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'
import type { Control, FieldValues, RegisterOptions } from 'react-hook-form'
import { useController } from 'react-hook-form'

type InputProps = {
  type: 'date' | 'time' | 'datetime-local'
  control: Control<FieldValues>
  name: string
  rules?: RegisterOptions
  placeholder?: string
  readOnly?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RhfInputDate({
  name,
  placeholder,
  className,
  control,
  readOnly,
  rules,
  type,
  ...props
}: InputProps) {
  const [value, setValue] = useState<Date | string | null>(null)
  const [isTouched, setIsTouched] = useState(false)
  const {
    field: { onChange },
    formState: { errors },
  } = useController({ name, defaultValue: '', control, rules })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value === 'Invalid Date' || null
      ? (onChange(null), setValue(null))
      : (onChange(e.target.value), setValue(e.target.value))
    props.onChange && props.onChange(e)
    setIsTouched(true)
  }

  return (
    <>
      <div className='flex w-full flex-col'>
        <InputDate
          type={type}
          placeholder={placeholder}
          className={className}
          readOnly={readOnly}
          value={value}
          onChange={handleChange}
          hasError={Boolean(errors[name]?.message)}
        />
      </div>

      {isTouched && (
        <ErrorMessage
          errors={errors}
          name={name}
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
    </>
  )
}
