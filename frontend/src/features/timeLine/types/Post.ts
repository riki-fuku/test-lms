import type { Comment } from '@/features/timeLine/types/Comment'
import type { CS_USER, QA_USER } from './../../user/dummyData/user'

export type Post = {
  operation: typeof CS_USER | typeof QA_USER
  date: string
  content: string
  completed: boolean
  comments: Comment[]
}
