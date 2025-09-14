import fetchUserSprints from '@/features/backlog/api/fetchUserSprints'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchUserSprints(
  workspaceId: string,
  userId: string,
  projectId: string,
  query: { status?: number | null },
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchUserSprints(workspaceId, userId, projectId, query)
  return useSWR(
    [`/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-sprints`, query],
    fetcher,
    swrOptions,
  )
}
