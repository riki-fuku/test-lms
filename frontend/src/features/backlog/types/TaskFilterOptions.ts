import type { TaskType } from '@/features/backlog/types/TaskType'

export type TaskFilterOptions = {
  taskName: string | null
  taskType: TaskType | null
  sp: number | null
}
