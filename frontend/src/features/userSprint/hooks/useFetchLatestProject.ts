import fetchLatestProject from '@/features/userSprint/api/fetchLatestProject'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchLatestProject(
  workspaceId: string,
  userId: string,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchLatestProject(workspaceId, userId)
  return useSWR(
    [`/api/workspaces/${workspaceId}/users/${userId}/projects/latest`, workspaceId, userId],
    fetcher,
    swrOptions,
  )
}
