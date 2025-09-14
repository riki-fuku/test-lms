import type { STUDENT_USER, STUDENT_V2_USER } from '@/features/user/dummyData/user'

export type Question = {
  student: typeof STUDENT_USER | typeof STUDENT_V2_USER
  date: string
  content: string
}
