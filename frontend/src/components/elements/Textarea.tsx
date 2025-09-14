import { useEffect, useState } from 'react'

type InputProps = {
  value?: string
  placeholder?: string
  className?: string
  rows?: number
  readonly?: boolean
  onBlur?: () => void
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  onValidate?: (value: string | undefined) => boolean
}

export default function Textarea(props: InputProps) {
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  useEffect(() => {
    setValue(props.value || '')

    if (props.onValidate) {
      setIsValid(props.onValidate(props.value || ''))
    }
  }, [props.value])

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    props.onKeyDown && props.onKeyDown(e)
  }

  const focusStyle = focus ? 'drop-shadow' : ''

  return (
    <>
      <div
        className={`overflow-hidden rounded border border-form-gray bg-white hover:drop-shadow ${focusStyle} ${props.className}`}
      >
        <textarea
          className='size-full min-w-48 resize-none p-2.5 placeholder:text-form-gray focus:outline-none'
          placeholder={props.placeholder || ''}
          value={value}
          readOnly={props.readonly}
          rows={props.rows ?? 2}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  )
}
