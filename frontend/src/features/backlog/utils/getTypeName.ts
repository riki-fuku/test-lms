import type { TaskType } from '@/features/backlog/types/TaskType'

export const getTypeName = (taskTypeList: TaskType[] | undefined, typeId: number) => {
  if (!taskTypeList) return ''
  return taskTypeList.find((type) => type.value === typeId)?.label || ''
}
