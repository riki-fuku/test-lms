import { Http } from '@/lib/api-client'

type UpdateUserTaskOrderBody = {
  order: number
  userSprintId: string | null
}

export default function updateUserTaskOrder(
  workspaceId: string,
  userId: string,
  projectId: string,
  taskId: string,
  body: UpdateUserTaskOrderBody,
) {
  return Http.axios()
    .patch(
      `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-tasks/${taskId}/reorder`,
      body,
    )
    .then((res) => res.data.data)
}
