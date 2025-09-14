import useDateTools from '@/hooks/useDateTools'
import { useEffect, useState } from 'react'
import { GiCheckMark } from 'react-icons/gi'
import { IoIosAlert } from 'react-icons/io'

type InputProps = {
  type: 'date' | 'time' | 'datetime-local'
  value?: Date | string | null
  placeholder?: string
  readOnly?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onValidate?: (value: string | null) => boolean
  hasError?: boolean
}

export default function InputDate(props: InputProps) {
  const [value, setValue] = useState<string | null>(null)
  const [focus, setFocus] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isTouched, setIsTouched] = useState(false)

  const dateTools = useDateTools()

  useEffect(() => {
    if (!props.value || props.value === 'Invalid Date') {
      setIsValid(false)
      return setValue(null)
    }

    if (typeof props.value === 'string' && props.value !== 'Invalid Date') {
      setValue(props.value)
      props.onValidate && setIsValid(props.onValidate(props.value))
      return
    }

    const date = convertDateIntoString(props.value, props.type)
    setValue(date)

    if (props.onValidate) {
      setIsValid(props.onValidate(date))
      return
    }
  }, [props.value])

  useEffect(() => {
    props.hasError !== undefined && setIsValid(!props.hasError)
  }, [props.hasError])

  function convertDateIntoString(value: Date | string, type: string) {
    let date = null

    switch (type) {
      case 'date':
        date = dateTools.formatDate(value, 'YYYY-MM-DD')
        break
      case 'time':
        date = dateTools.formatDate(value, 'HH:mm')
        break
      case 'datetime-local':
        date = dateTools.formatDate(value, 'YYYY-MM-DDTHH:mm')
        break
    }
    return date
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value === 'Invalid Date' ? setValue(null) : setValue(e.target.value)
    !isTouched && setIsTouched(true)

    if (props.onChange) {
      props.onChange(e)
    }
  }

  function handleFocus() {
    setFocus(true)
  }

  function handleBlur() {
    setFocus(false)
  }

  const focusStyle = focus ? 'drop-shadow' : ''

  return (
    <>
      <div
        className={`relative flex items-center overflow-hidden rounded border border-form-gray bg-white hover:drop-shadow ${focusStyle} ${props.className}`}
      >
        <input
          className='h-8 w-full min-w-48 p-2.5 placeholder:text-form-gray focus:outline-none'
          type={props.type}
          value={value ?? ''}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className='absolute right-8 top-1/2 flex -translate-y-1/2 gap-1'>
          {(props.onValidate || props.hasError !== undefined) &&
            isValid !== null &&
            isTouched &&
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
