import type { QuizSessionQuestion } from './QuizSessionQuestion'
export type QuizSessionQuestionChoice = {
  id: string
  sessionQuestionId: string
  choiceText: string
  isCorrect: boolean
  createdAt: string
  updatedAt: string
  question: QuizSessionQuestion
}
