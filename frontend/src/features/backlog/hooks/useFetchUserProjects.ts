import type { FetchUserProjectsQuery } from '@/features/backlog/api/fetchUserProjects'
import fetchUserProjects from '@/features/backlog/api/fetchUserProjects'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchUserProjects(
  workspaceId: string,
  userId: string,
  query: FetchUserProjectsQuery,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchUserProjects(workspaceId, userId, query)
  return useSWR(`/api/workspaces/${workspaceId}/users/${userId}/projects`, fetcher, swrOptions)
}
