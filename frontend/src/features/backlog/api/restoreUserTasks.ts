import { Http } from '@/lib/api-client'

type RestoreUserTaskBody = {
  taskIds: string[]
}

export default function restoreUserTasks(
  workspaceId: string,
  userId: string,
  projectId: string,
  body: RestoreUserTaskBody,
) {
  return Http.axios()
    .patch(
      `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-tasks/restore`,
      body,
    )
    .then((res) => res.data.data)
}
