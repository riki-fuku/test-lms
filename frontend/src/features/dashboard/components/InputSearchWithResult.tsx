import InputSearch from '@/components/ui/InputSearch'
import cn from '@/hooks/cn'
import { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'

type InputSearchWithResultProps = {
  searchCount: number
  searchIndex: number
  onChange: (searchWord: string) => void
  onClose: () => void
  onSelect: (index: number) => void
}

export default function InputSearchWithResult({
  onChange,
  onClose,
  onSelect,
  ...props
}: InputSearchWithResultProps) {
  const [searchWord, setSearchWord] = useState('')
  const [searchCount, setSearchCount] = useState(0)
  const [searchIndex, setSearchIndex] = useState(0)

  useEffect(() => {
    setSearchCount(props.searchCount)
  }, [props.searchCount])

  useEffect(() => {
    setSearchIndex(props.searchIndex)
  }, [props.searchIndex])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
    onChange(e.target.value)
  }

  const handleClear = () => {
    setSearchWord('')
    onChange('')
  }

  const handleClose = () => {
    setSearchWord('')
    onChange('')
    onClose()
  }

  const handleSelectUp = () => {
    searchIndex > 1 && (setSearchIndex(searchIndex - 1), onSelect(searchIndex - 1))
    searchIndex === 1 && onSelect(1)
  }

  const handleSelectDown = () => {
    searchIndex < searchCount && (setSearchIndex(searchIndex + 1), onSelect(searchIndex + 1))
    searchIndex === searchCount && onSelect(searchCount)
  }

  return (
    <>
      <div className='absolute top-0 flex h-16 w-full items-center justify-between rounded bg-white p-2.5 drop-shadow-lg'>
        <InputSearch
          className={cn('h-full !rounded', !searchCount && 'w-full')}
          value={searchWord}
          onChange={handleChange}
          onClear={handleClear}
        />

        <div className='flex items-center'>
          <div
            className={cn(
              'flex w-24 cursor-pointer items-center justify-end text-text-secondary',
              !searchCount && 'hidden',
            )}
          >
            <div className='flex w-10 justify-end'>
              {searchIndex}/{searchCount}
            </div>
            <div className='flex h-full w-7 justify-end' onClick={handleSelectUp}>
              <IoIosArrowUp className='size-4' />
            </div>
            <div className='flex h-full w-7 justify-end'>
              <IoIosArrowDown className='size-4' onClick={handleSelectDown} />
            </div>
          </div>

          <div className='flex size-12 items-center justify-center' onClick={handleClose}>
            <IoClose className='size-6' />
          </div>
        </div>
      </div>
    </>
  )
}
