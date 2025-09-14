import type { UserTask } from '@/features/backlog/types/UserTask'

export const INACTIVE = 1
export const ACTIVE = 2
export const CLOSED = 3

export type UserSprint = {
  id: string
  sprintNumber: number
  startDate: string
  endDate: string
  status: number
  userTasks?: UserTask[]
}
