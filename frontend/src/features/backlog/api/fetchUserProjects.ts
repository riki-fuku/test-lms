import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

export type FetchUserProjectsQuery = {
  guardType: 'user' | 'employee'
}

export default function fetchUserProjects(
  workspaceId: string,
  userId: string,
  query: FetchUserProjectsQuery,
) {
  return Http.axios()
    .get<AxiosResponse>(`/api/workspaces/${workspaceId}/users/${userId}/projects`, {
      params: query,
    })
    .then((res) => res.data.data)
}
