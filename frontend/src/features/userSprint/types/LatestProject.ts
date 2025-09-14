import type { UserTask } from '@/features/backlog/types/UserTask'

export type LatestProject = {
  id: number
  name: string
  latestSprintProgress: number
  tasks: UserTask[]
}
