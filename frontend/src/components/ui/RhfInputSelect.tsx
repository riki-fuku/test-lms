import type { Option } from '@/components/ui/InputSelect'
import InputSelect from '@/components/ui/InputSelect'
import { ErrorMessage } from '@hookform/error-message'
import type { ReactNode } from 'react'
import { useState } from 'react'
import type { Control, FieldValues, RegisterOptions } from 'react-hook-form'
import { useController } from 'react-hook-form'

type RhfInputSelectProps = {
  name: string
  control: Control<FieldValues>
  rules?: RegisterOptions
  options: Option[]
  className?: string
  placeholder?: string
  item?: Option | null
  onChange?: () => void
  optionItemRender?: (option: Option) => ReactNode
}

export default function RhfInputSelect(props: RhfInputSelectProps) {
  const [isTouched, setIsTouched] = useState(false)
  const { name, control, rules, options, className, placeholder, item, optionItemRender } = props

  const {
    field: { onChange },
    formState: { errors },
  } = useController({ name, defaultValue: '', control, rules })

  function handleChange(item: Option | null) {
    !isTouched && setIsTouched(true)
    onChange(item)
    props.onChange && props.onChange()
  }

  return (
    <>
      <InputSelect
        options={options}
        className={className}
        placeholder={placeholder}
        onChange={handleChange}
        optionItemRender={optionItemRender}
        item={item}
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
    </>
  )
}
