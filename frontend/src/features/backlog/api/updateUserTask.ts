import { Http } from '@/lib/api-client'

type UpdateUserTaskBody = {
  userSprintId: string | null
  status: number
  type: number
  summary: string
  description?: string | null
  estimate: number | null
}

export default function updateUserTask(
  workspaceId: string,
  userId: string,
  projectId: string,
  taskId: string,
  body: UpdateUserTaskBody,
) {
  return Http.axios()
    .patch(
      `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-tasks/${taskId}`,
      body,
    )
    .then((res) => res.data.data)
}
