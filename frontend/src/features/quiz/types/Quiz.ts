import type { QuizItem } from '@/features/quiz/types/QuizItem'

export type Quiz = {
  quizQuestions: QuizItem[]
  sessionId: string
}
