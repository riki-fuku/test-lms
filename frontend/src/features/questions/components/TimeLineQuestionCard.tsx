import Avatar from '@/components/ui/Avatar'
import type { Question } from '@/features/timeLine/types/Question'
import dayjs from 'dayjs'
import { IoPersonSharp } from 'react-icons/io5'

type TimeLineQuestionCardProps = {
  questions: Question[]
}

export default function TimeLineQuestionCard(props: TimeLineQuestionCardProps) {
  return (
    <>
      {props.questions
        .sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))
        .map((question, index) => (
          <div
            className='flex flex-col gap-5 overflow-hidden border-b py-8 last:border-none'
            key={index}
          >
            <div className='flex items-center gap-5'>
              <div className='flex items-center gap-1 text-sm'>
                <Avatar size='xs'>
                  <IoPersonSharp color='#ffffff' />
                </Avatar>
                <span>
                  {question.student.last_name}
                  {}
                  {question.student.first_name}
                </span>
              </div>

              <span className='text-xs text-text-secondary'>
                {dayjs(question.date).format('YYYY/MM/DD HH:MM')}
              </span>
            </div>

            <p>{question.content}</p>
          </div>
        ))}
    </>
  )
}
