import { Http } from '@/lib/api-client'

type DeleteUserTaskQuery = {
  force: boolean
}

export default function deleteUserTask(
  workspaceId: string,
  userId: string,
  projectId: string,
  taskId: string,
  query: DeleteUserTaskQuery,
) {
  return Http.axios()
    .delete(
      `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-tasks/${taskId}`,
      {
        params: query,
      },
    )
    .then((res) => res.data.data)
}
