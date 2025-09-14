import type { ExamType } from '@/features/examType/types/ExamType'

export type Exam = {
  id: string
  examTypeId: string
  name: string
  examType: ExamType
}
