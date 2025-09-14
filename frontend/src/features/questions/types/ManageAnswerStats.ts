import type { QuestionTag } from '@/features/questions/types/QuestionTag'

export type ManageAnswerStats = {
  answerTotal: number
  answerCount: {
    today: number
    week: number
    month: number
  }
  bestAnswerTotal: number
  bestAnswerCount: {
    month: number
  }
  goodTotal: number
  goodCount: {
    month: number
  }
  availableTags: QuestionTag[]
}
