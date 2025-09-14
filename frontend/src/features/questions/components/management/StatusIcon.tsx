import type { Question } from '@/features/questions/types/Question'
import { ON_HOLD, RESOLVED, UNHANDLED } from '@/features/questions/types/QuestionStatus'
import { FaUserCircle } from 'react-icons/fa'
import { GiCheckMark } from 'react-icons/gi'
import { HiStop } from 'react-icons/hi'
import { IoIosAlert } from 'react-icons/io'

type StatusSelectMenuProps = {
  status: number
  questionResponder: Question['questionResponder']
}

export default function StatusIcon({ status, questionResponder }: StatusSelectMenuProps) {
  if (status === RESOLVED) {
    return (
      <div className='flex size-5 items-center justify-center rounded-full bg-gradient-to-r from-sub-color to-main-color'>
        <GiCheckMark className='size-2.5 fill-white' />
      </div>
    )
  }

  if (status === UNHANDLED && questionResponder === null) {
    return <IoIosAlert className='fill-warn-red' size={20} />
  }

  if (status === ON_HOLD) {
    return <HiStop size={20} />
  }

  return <FaUserCircle className='text-text-secondary' size={20} />
}
