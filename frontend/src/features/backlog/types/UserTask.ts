import type { Activity } from '@/features/backlog/types/Activity'
import type { TaskComment } from '@/features/backlog/types/TaskComment'

export type UserTask = {
  id: string
  userSprintId: string | null
  status: number
  type: number
  summary: string
  description: string | null
  estimate: number
  order?: number | null
  comments: TaskComment[]
  activities?: Activity[]
}
