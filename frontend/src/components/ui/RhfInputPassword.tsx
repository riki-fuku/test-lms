import InputPassword from '@/components/ui/InputPassword'
import cn from '@/hooks/cn'
import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'
import type { Control, FieldValues, RegisterOptions } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { GiCheckMark } from 'react-icons/gi'
import { IoIosAlert } from 'react-icons/io'

type InputProps = {
  control: Control<FieldValues>
  name: string
  rules?: RegisterOptions
  placeholder?: string
  className?: string
  onChange?: () => void
}

export default function RhfInputPassword(props: InputProps) {
  const [isTouched, setIsTouched] = useState(false)
  const { name, placeholder, className, control, rules } = props

  const {
    field: { onChange },
    formState: { errors },
  } = useController({ name, defaultValue: '', control, rules })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    !isTouched && setIsTouched(true)
    onChange(e.target.value)
    props.onChange && props.onChange()
  }

  function CheckMark(props: { isValid: boolean | null; className: string }) {
    return props.isValid !== null && props.isValid ? (
      <div className='flex size-4 items-center justify-center rounded-full bg-gradient-to-r from-sub-color to-main-color'>
        <GiCheckMark className='size-2 fill-white' />
      </div>
    ) : (
      <IoIosAlert className={cn('fill-warn-red')} size={20} />
    )
  }

  return (
    <div className='flex flex-1'>
      <div className='flex w-full flex-col'>
        <div className='relative flex w-full flex-col'>
          <InputPassword
            placeholder={placeholder}
            className={cn('size-full', className)}
            onChange={handleChange}
          />
          <div className='absolute right-10 top-0 flex h-full items-center'>
            {isTouched && <CheckMark isValid={Boolean(!errors[name]?.types)} className='size-4' />}
          </div>
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
      </div>
    </div>
  )
}
