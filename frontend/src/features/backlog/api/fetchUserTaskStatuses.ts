import type { TaskStatus } from '@/features/backlog/types/TaskStatus'
import { Http } from '@/lib/api-client'

export default function fetchUserTaskStatuses() {
  return Http.axios()
    .get<TaskStatus[]>(`/api/masters/user-task-statuses`)
    .then((res) => res.data)
}
