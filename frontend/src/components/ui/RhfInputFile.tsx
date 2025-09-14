import InputFile from '@/components/ui/InputFile'
import cn from '@/hooks/cn'
import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'
import type { Control, FieldValues, RegisterOptions } from 'react-hook-form'
import { useController } from 'react-hook-form'

type RhfInputFileProps = {
  name: string
  control: Control<FieldValues>
  rules?: RegisterOptions
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RhfInputFile(props: RhfInputFileProps) {
  const [isTouched, setIsTouched] = useState(false)
  const { name, className, control, rules } = props

  const {
    field: { onChange },
    formState: { errors },
  } = useController({ name, defaultValue: '', control, rules })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        onChange({ source: reader.result, file })
      }
      reader.readAsDataURL(file)
    } else {
      onChange('')
    }

    setIsTouched(true)
    props.onChange && props.onChange(e)
  }

  return (
    <>
      <div className={cn('flex w-full flex-col', className)}>
        <InputFile onChange={handleChange} />
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
