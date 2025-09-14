export type QuizSession = {
  id: string
  userId: string
  chapterId: string
  totalQuestions: number
  correctAnswers: number
  totalTimeMs: number
  score: number
  accuracy: string
  completedAt: string | null
}
