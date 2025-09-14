import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

export default function fetchUserTask(
  workspaceId: string,
  userId: string,
  projectId: string,
  taskId: string,
) {
  return Http.axios()
    .get<AxiosResponse>(
      `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-tasks/${taskId}`,
    )
    .then((res) => res.data.data)
}
