import type { Course } from '@/features/course/types/Course'
import type { Term } from '@/features/term/types/Term'

export type CourseTerm = {
  id: string
  course_id: string
  term_id: string
  week_num: number
  days_num: number
  course?: Course
  term?: Term
}
