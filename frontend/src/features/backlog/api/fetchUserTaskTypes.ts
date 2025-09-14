import type { TaskType } from '@/features/backlog/types/TaskType'
import { Http } from '@/lib/api-client'

export default function fetchUserTaskTypes() {
  return Http.axios()
    .get<TaskType[]>(`/api/masters/user-task-types`)
    .then((res) => res.data)
}
