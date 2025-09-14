import type { Question } from '@/features/questions/types/Question'
import type { QuestionComment } from '@/features/questions/types/QuestionComment'

export type QuestionAnswer = {
  id: string
  content: string
  isBestAnswer: boolean
  createdAt: string
  actor: {
    id: string
    name: string
    avatar: string
    nickname: string
  }
  question?: Question
  comments?: QuestionComment[]
}
