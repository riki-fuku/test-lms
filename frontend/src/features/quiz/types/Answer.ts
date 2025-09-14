export type UserAnswerBody = {
  sessionId: string
  questionId: string
  userAnswer: string
}

export type JudgeUserAnswer = {
  isCorrect: boolean
  correctAnswer: string
}
