import type { TaskStatus } from '@/features/backlog/types/TaskStatus'

export const getStatusName = (taskStatusList: TaskStatus[] | undefined, statusId: number) => {
  if (!taskStatusList) return ''
  return taskStatusList.find((status) => status.value === statusId)?.label || ''
}
