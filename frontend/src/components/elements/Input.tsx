import { useEffect, useState } from 'react'
import { GiCheckMark } from 'react-icons/gi'
import { IoIosAlert } from 'react-icons/io'

type InputProps = {
  value?: string | null
  placeholder?: string
  className?: string
  readonly?: boolean
  type?: 'text' | 'password' | 'number' | 'email'
  onBlur?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onValidate?: (value: string | undefined) => boolean
}

export default function Input(props: InputProps) {
  const [value, setValue] = useState<string | null>(null)
  const [focus, setFocus] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  useEffect(() => {
    setValue(props.value || '')

    if (props.onValidate) {
      setIsValid(props.onValidate(props.value || ''))
    }
  }, [props.value])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    props.onChange && props.onChange(e)
  }

  function handleFocus() {
    setFocus(true)
  }

  function handleBlur() {
    setFocus(false)
    props.onBlur && props.onBlur()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    props.onKeyDown && props.onKeyDown(e)
  }

  const focusStyle = focus ? 'drop-shadow' : ''

  return (
    <>
      <div
        className={`relative flex items-center overflow-hidden rounded border border-form-gray bg-white hover:drop-shadow ${focusStyle} ${props.className}`}
      >
        <input
          className='h-8 w-full min-w-48 !px-2.5 outline-none placeholder:text-form-gray'
          type={props.type || 'text'}
          placeholder={props.placeholder || ''}
          value={value ?? ''}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          readOnly={props.readonly}
        />
        <div className='absolute right-3 top-1/2 flex -translate-y-1/2 gap-1 '>
          {props.onValidate &&
            isValid !== null &&
            (isValid ? (
              <div className='flex size-4 items-center justify-center rounded-full bg-gradient-to-r from-sub-color to-main-color'>
                <GiCheckMark className='size-2 fill-white' />
              </div>
            ) : (
              <IoIosAlert className='fill-warn-red' size={20} />
            ))}
        </div>
      </div>
    </>
  )
}
