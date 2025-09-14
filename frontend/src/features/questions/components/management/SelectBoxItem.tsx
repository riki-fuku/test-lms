import type { Question } from '@/features/questions/types/Question'
import type { QuestionStatus } from '@/features/questions/types/QuestionStatus'
import {
  IN_PROGRESS,
  ON_HOLD,
  RESOLVED,
  UNHANDLED,
} from '@/features/questions/types/QuestionStatus'
import cn from '@/hooks/cn'
import { BsPersonCheckFill } from 'react-icons/bs'
import { GiCheckMark } from 'react-icons/gi'
import { HiStop } from 'react-icons/hi'
import { IoIosAlert } from 'react-icons/io'

type SelectBoxItemProps = {
  userId: string
  status: QuestionStatus
  questionResponder: Question['questionResponder']
}

export default function SelectBoxItem({ userId, status, questionResponder }: SelectBoxItemProps) {
  if (status.value === UNHANDLED) {
    return (
      <>
        <IoIosAlert className='fill-warn-red' size={20} />
        <p className='ml-1'>{status.label}</p>
      </>
    )
  }

  if (status.value === IN_PROGRESS) {
    return (
      <>
        <BsPersonCheckFill
          className={cn(
            questionResponder !== null && questionResponder?.id === userId && 'text-text-disable',
          )}
          size={20}
        />
        <p
          className={cn(
            questionResponder !== null && questionResponder?.id === userId && 'text-text-disable',
            'ml-1',
          )}
        >
          {status.label}
        </p>
      </>
    )
  }

  if (status.value === RESOLVED) {
    return (
      <>
        <div className='flex size-5 items-center justify-center rounded-full bg-gradient-to-r from-sub-color to-main-color'>
          <GiCheckMark className='size-2.5 fill-white' />
        </div>
        <p className='ml-1'>{status.label}</p>
      </>
    )
  }

  if (status.value === ON_HOLD) {
    return (
      <>
        <HiStop className='' size={20} />
        <p className='ml-1'>{status.label}</p>
      </>
    )
  }
}
