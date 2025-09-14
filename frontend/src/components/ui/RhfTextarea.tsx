import Textarea from '@/components/ui/Textarea'
import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'
import type { Control, FieldValues, RegisterOptions } from 'react-hook-form'
import { useController } from 'react-hook-form'

type RhfTextareaProps = {
  name: string
  className?: string
  placeholder?: string
  rows?: number
  control: Control<FieldValues>
  rules?: RegisterOptions
  onChange?: () => void
}

export default function RhfTextarea(props: RhfTextareaProps) {
  const [isTouched, setIsTouched] = useState(false)
  const { control, name, className, placeholder, rows, rules } = props
  const {
    field: { onChange, onBlur, value },
    formState: { errors },
  } = useController({ name, defaultValue: '', control, rules })

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    !isTouched && setIsTouched(true)
    onChange(e.target.value)
    props.onChange && props.onChange()
    setIsTouched(true)
  }

  function handleBlur() {
    onBlur()
  }

  return (
    <div>
      <Textarea
        placeholder={placeholder}
        className={className}
        rows={rows}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
      />
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
    </div>
  )
}
