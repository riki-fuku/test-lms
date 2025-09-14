import type { QuestionAnswer } from '@/features/questions/types/QuestionAnswer'
import type { QuestionComment } from '@/features/questions/types/QuestionComment'
import type { QuestionTag } from '@/features/questions/types/QuestionTag'

export type Question = {
  id: string
  category: number
  title: string
  content: string
  status: number
  hasBestAnswer: boolean
  createdAt: string
  updatedAt: string
  isPublic: boolean
  policyAgreedAt?: string | null
  user: {
    id: string
    name: string
    nickname: string
    avatar: string
  }
  questionResponder?: {
    id: string
    name: string
    nickname: string
  } | null
  lastResponder?: {
    id: string
    name: string
    nickname: string
  } | null
  tags: QuestionTag[]
  answers: QuestionAnswer[]
  comments: QuestionComment[]
}
