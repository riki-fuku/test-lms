import Check from '@/components/ui/Check'
import type { Choice as TypeChoice } from '@/features/quiz/types/Choice'
import cn from '@/hooks/cn'
import { FaRegCircle } from 'react-icons/fa6'
import { RxCross1 } from 'react-icons/rx'

type IconProps = {
  type: 'DEFAULT' | 'CORRECT' | 'INCORRECT'
  value: boolean
}

function Icon(props: IconProps) {
  // 何も選択されていないUI
  if (props.value === false) return <div className='size-8 rounded-full bg-bg-secondary'></div>

  switch (props.type) {
    case 'DEFAULT':
      return <Check value={props.value} size='sm' disable />
    case 'CORRECT':
      return (
        <div className='rounded-full bg-choice-qa-correct p-2'>
          <FaRegCircle className='text-white' size={16} />
        </div>
      )
    case 'INCORRECT':
      return (
        <div className='rounded-full bg-choice-qa-incorrect p-2'>
          <RxCross1 className='text-white' size={16} />
        </div>
      )
  }
}

export type ChoiceProps = TypeChoice

export default function Choice(props: ChoiceProps) {
  const className = cn(
    'flex list-none items-center justify-between gap-4 rounded border px-5 py-4 cursor-pointer',
    { 'border-choice-qa-correct': props.type === 'CORRECT' },
    { 'border-choice-qa-incorrect': props.type === 'INCORRECT' },
    { 'border-choice-qa-correct': props.type === 'DEFAULT' && props.value },
  )

  return (
    <>
      <div className={className}>
        <p className='flex w-11/12'>
          <span className='mr-2 font-bold'>{props.prefix}.</span>
          <span>{props.text}</span>
        </p>
        <Icon type={props.type} value={props.value} />
      </div>
    </>
  )
}
