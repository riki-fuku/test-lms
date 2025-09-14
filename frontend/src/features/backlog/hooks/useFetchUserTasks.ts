import fetchUserTasks from '@/features/backlog/api/fetchUserTasks'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchUserTasks(
  workspaceId: string,
  userId: string,
  projectId: string,
  query: {
    related?: boolean | null
    trashed?: boolean
  },
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchUserTasks(workspaceId, userId, projectId, query)
  return useSWR(
    [`/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-tasks`, query],
    fetcher,
    swrOptions,
  )
}
