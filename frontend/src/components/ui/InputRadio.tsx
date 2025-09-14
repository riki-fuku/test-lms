import cn from '@/hooks/cn'
import { useEffect, useState } from 'react'
import { HiCheck } from 'react-icons/hi'

type InputRadioProps = {
  label: string | JSX.Element
  checked?: boolean
  className?: string
  onClick: (checked: boolean) => void
}

export default function InputRadio(props: InputRadioProps) {
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(() => {
    // Task.tsxでcheckedが指定されていないためundefinedで受け取らなければならない。要リファクタ
    if (props.checked !== undefined) {
      setChecked(props.checked)
    }
  }, [props.checked])

  function handleClick() {
    props.onClick(!checked)
    setChecked(!checked)
  }

  return (
    <div
      className={cn('flex cursor-pointer items-center gap-2', props.className)}
      onClick={handleClick}
    >
      <div
        className={cn(
          'flex size-5 items-center justify-center rounded-full text-white',
          checked ? ' bg-gradient-to-r from-sub-color to-main-color' : 'bg-form-gray',
        )}
      >
        <HiCheck className='text-sm text-white' />
      </div>
      <p className='text-md'>{props.label}</p>
    </div>
  )
}
