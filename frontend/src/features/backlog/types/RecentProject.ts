import type { UserTask } from '@/features/backlog/types/UserTask'

export type RecentProject = {
  id: number
  name: string
  latestSprintProgress: number
  tasks: UserTask[]
}
