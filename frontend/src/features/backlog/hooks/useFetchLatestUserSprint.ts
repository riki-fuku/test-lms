import fetchLatestUserSprint from '@/features/backlog/api/fetchLatestUserSprint'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchLatestUserSprint(
  workspaceId: string,
  userId: string,
  projectId: string,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchLatestUserSprint(workspaceId, userId, projectId)
  return useSWR(
    `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-sprints/latest`,
    fetcher,
    swrOptions,
  )
}
