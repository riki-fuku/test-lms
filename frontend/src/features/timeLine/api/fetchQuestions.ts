import type { Question } from '@/features/timeLine/types/Question'
import { STUDENT_V2_USER } from '@/features/user/dummyData/user'
import dayjs from 'dayjs'

const questions: Question[] = [
  {
    student: STUDENT_V2_USER,
    date: dayjs()
      .add(1 * 1, 'd')
      .format(),
    content: '質問のタイトルが入ります質問のタイトルが入ります',
  },
  {
    student: STUDENT_V2_USER,
    date: dayjs()
      .add(1 * 2, 'd')
      .format(),
    content: '質問のタイトルが入ります質問のタイトルが入ります',
  },
  {
    student: STUDENT_V2_USER,
    date: dayjs()
      .add(1 * 3, 'd')
      .format(),
    content: '質問のタイトルが入ります質問のタイトルが入ります',
  },
  {
    student: STUDENT_V2_USER,
    date: dayjs()
      .add(1 * 4, 'd')
      .format(),
    content: '質問のタイトルが入ります質問のタイトルが入ります',
  },
  {
    student: STUDENT_V2_USER,
    date: dayjs()
      .add(1 * 5, 'd')
      .format(),
    content: '質問のタイトルが入ります質問のタイトルが入ります',
  },
]

export default function fetchQuestions(): Question[] {
  return questions
}
