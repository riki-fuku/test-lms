import cn from '@/hooks/cn'
import { forwardRef, useState } from 'react'
import { BsPaperclip } from 'react-icons/bs'
import { GiCheckMark } from 'react-icons/gi'
import { IoIosAlert } from 'react-icons/io'

type InputFileProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  multiple?: boolean
}

const ref = forwardRef<HTMLInputElement, InputFileProps>(({ onChange, multiple }, ref) => {
  const [isValid, setIsValid] = useState<boolean | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e)
    setIsValid(e.target.files !== null && e.target.files.length > 0)
  }

  return (
    <div className='relative'>
      <input
        className={cn(
          'file:bg-white file:text-right file:text-sm file:text-main-color lg:file:text-md',
          'text-sm text-text-secondary focus:outline-none lg:text-md',
          'file:mr-5 file:w-28 file:rounded lg:file:w-32',
          'drop-shadow file:border-1 file:border-solid file:border-main-color',
        )}
        type='file'
        accept='.jpg, .jpeg, .png, .gif'
        onChange={handleChange}
        placeholder='img'
        multiple={multiple}
        ref={ref}
      />
      <BsPaperclip className='absolute left-2 top-1.5 text-md text-main-color' />
      <div className='absolute left-80 top-1/2 flex -translate-y-1/2 gap-1'>
        {isValid !== null &&
          (isValid ? (
            <div className='flex size-4 items-center justify-center rounded-full bg-gradient-to-r from-sub-color to-main-color'>
              <GiCheckMark className='size-2 fill-white' />
            </div>
          ) : (
            <IoIosAlert className='fill-warn-red' size={20} />
          ))}
      </div>
    </div>
  )
})

ref.displayName = 'InputFile'

export default ref
