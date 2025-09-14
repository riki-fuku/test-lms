import type { Section } from '@/features/curriculum/types/Section'

export type QuizQuestion = {
  id: string
  sectionId: string
  questionText: string
  answerText: string
  section?: Section
}
