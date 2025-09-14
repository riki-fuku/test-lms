import { TODO } from '@/features/backlog/types/TaskStatus'
import { STORY } from '@/features/backlog/types/TaskType'
import type { UserTask } from '@/features/backlog/types/UserTask'

export const defaultTask: UserTask = {
  id: 'default',
  userSprintId: null,
  status: TODO,
  type: STORY,
  summary: '',
  description: '',
  estimate: 0,
  comments: [],
  activities: [],
}
