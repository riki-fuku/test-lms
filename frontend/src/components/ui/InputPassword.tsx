import Input from '@/components/ui/Input'
import { useEffect, useState } from 'react'
import { GiCheckMark } from 'react-icons/gi'
import { IoIosAlert, IoIosEye } from 'react-icons/io'

type InputPasswordProps = {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onValidate?: (e: React.ChangeEvent<HTMLInputElement>) => boolean
  placeholder?: string
  className?: string
}

export default function InputPassword(props: InputPasswordProps) {
  const [value, setValue] = useState('')
  const [type, setType] = useState<'text' | 'password'>('password')
  const [showPassword, setShowPassword] = useState(false)
  const [isPasswordOk, setIsPasswordOk] = useState<boolean | null>(null)

  useEffect(() => {
    setType(showPassword ? 'text' : 'password')
  }, [showPassword])

  useEffect(() => {
    setValue(props.value || '')
  }, [props.value])

  function handleClickEyeIcon() {
    setShowPassword(!showPassword)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)

    if (props.onValidate) {
      setIsPasswordOk(props.onValidate(e))
    }

    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <>
      <div className={`relative ${props.className}`}>
        <Input
          value={value}
          type={type}
          onChange={handleChange}
          placeholder={props.placeholder || ''}
          className='h-full [&_input]:!pr-10'
        />
        <div className='absolute right-3 top-0 flex h-full items-center justify-center gap-1 '>
          {props.onValidate &&
            isPasswordOk !== null &&
            (isPasswordOk ? (
              <div className='flex size-4 items-center justify-center rounded-full bg-gradient-to-r from-sub-color to-main-color'>
                <GiCheckMark className='size-2 fill-white' />
              </div>
            ) : (
              <IoIosAlert className='fill-warn-red' size={20} />
            ))}
          <IoIosEye
            className='cursor-pointer fill-text-primary'
            size={20}
            onClick={handleClickEyeIcon}
          />
        </div>
      </div>
    </>
  )
}
