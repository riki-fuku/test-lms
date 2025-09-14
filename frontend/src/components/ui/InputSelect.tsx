import cn from '@/hooks/cn'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

export type Option<T = unknown> = {
  label: string
  value: T
}

type InputSelectProps<T = unknown> = {
  options: Option<T>[]
  item?: Option<T> | null
  className?: string
  placeholder?: string
  onChange?: (value: Option<T> | null) => void
  optionItemRender?: (item: Option<T>) => ReactNode
  disabled?: boolean
}

export default function InputSelect<T = unknown>({
  options,
  item,
  placeholder,
  onChange,
  optionItemRender,
  disabled,
}: InputSelectProps<T>) {
  const [selectedItem, setSelectedItem] = useState<Option<T> | null>(null)
  const [isOpenOptions, setIsOpenOptions] = useState(false)

  useEffect(() => {
    setSelectedItem(item || null)
  }, [item])

  const handleChange = (item: Option<T> | null) => {
    onChange && onChange(item)
    setSelectedItem(item)
    setIsOpenOptions(false)
  }

  const handleOpenSelect = () => {
    setIsOpenOptions(!isOpenOptions)
  }

  const OptionList = () => {
    const handleSelectOption = (option: Option<T>) => {
      handleChange(option)
    }

    return options.map((option, index) => {
      let optionItem: ReactNode = option.label

      if (optionItemRender) {
        optionItem = optionItemRender(option)
      }

      return (
        <div
          key={index}
          onClick={() => handleSelectOption(option)}
          className='cursor-pointer border-t border-form-gray p-3 [&:first-child]:border-0'
        >
          {optionItem}
        </div>
      )
    })
  }

  return (
    <div className='relative flex h-12 items-center rounded border bg-white px-2'>
      <div
        className='relative flex w-full cursor-pointer items-center justify-between rounded'
        onClick={handleOpenSelect}
        style={{ zIndex: 1 }}
      >
        <p className={cn(selectedItem === null && 'text-text-secondary')}>
          {selectedItem !== null ? selectedItem.label : placeholder || '選択'}
        </p>
        <IoIosArrowDown className='size-4 text-text-secondary' />
      </div>

      {isOpenOptions && !disabled && (
        <div
          className='absolute left-0 top-0 flex w-full flex-col items-center rounded border-b bg-white'
          style={{ zIndex: 10 }}
        >
          <div
            className='flex h-12 w-full cursor-pointer items-center justify-between rounded border px-2'
            onClick={() => handleChange(null)}
          >
            <p className={cn('text-text-secondary')}>{placeholder || '選択'}</p>
            <IoIosArrowUp className='size-4 text-text-secondary' />
          </div>

          <div className='flex max-h-96 w-full flex-col overflow-hidden overflow-y-auto rounded border bg-white'>
            <OptionList />
          </div>
        </div>
      )}
    </div>
  )
}
