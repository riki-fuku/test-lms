import type { QuizQuestion } from '@/features/quiz/types/QuizQuestion'
import type { QuizSessionQuestionChoice } from '@/features/quiz/types/QuizSessionQuestionChoice'

export type QuizSessionQuestion = {
  id: string
  sessionId: string
  questionId: string
  sequence: number
  userAnswer: string
  isCorrect: boolean
  createdAt: string
  updatedAt: string
  question?: QuizQuestion
  choices?: QuizSessionQuestionChoice[]
}
