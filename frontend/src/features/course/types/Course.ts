import type { CourseTerm } from '@/features/courseTerm/types/CourseTerm'

export type Course = {
  id: string
  name: string
  course_terms?: CourseTerm[]
}
