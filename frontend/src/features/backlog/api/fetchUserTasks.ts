import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

export default function fetchUserTasks(
  workspaceId: string,
  userId: string,
  projectId: string,
  query: {
    related?: boolean | null
    trashed?: boolean
  },
) {
  return Http.axios()
    .get<AxiosResponse>(
      `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-tasks`,
      {
        params: query,
      },
    )
    .then((res) => res.data.data)
}
