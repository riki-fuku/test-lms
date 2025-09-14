'use client'

import cn from '@/hooks/cn'
import { useEffect, useState } from 'react'
import { GoSearch } from 'react-icons/go'
import { IoClose } from 'react-icons/io5'

type InputSearchProps = {
  value?: string
  placeholder?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
  onSearch?: (value: string) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onCompositionStart?: () => void
  onCompositionEnd?: () => void
  isComposing?: boolean
}

export default function InputSearch(props: InputSearchProps) {
  const [value, setValue] = useState('')
  const [isComposing, setIsComposing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    props.onChange?.(e)
  }

  useEffect(() => {
    setValue(props.value || '')
  }, [props.value])

  const handleClear = () => {
    setValue('')
    props.onClear?.()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      // ひらがな入力の場合のEnterキーはskipする
      if (composition) return
      props.onSearch && props.onSearch(value)
    }
    props.onKeyDown?.(e)
  }

  // 入力値がひらがなの場合true
  const [composition, setComposition] = useState(false)

  return (
    <>
      <div
        className={`relative flex items-center rounded-full border border-border-primary bg-white ${props.className}`}
      >
        {!value && <GoSearch className='absolute inset-2 text-form-gray' />}
        <input
          className={cn('h-8 w-full !px-2.5 placeholder:text-form-gray', !value && '!pl-8')}
          type='text'
          placeholder={props.placeholder || ''}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setComposition(true)}
          onCompositionEnd={() => setComposition(false)}
        />
        {props.onClear && (
          <IoClose
            className='absolute right-2 cursor-pointer text-lg text-text-secondary'
            onClick={handleClear}
          />
        )}
      </div>
    </>
  )
}
