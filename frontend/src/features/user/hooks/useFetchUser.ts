import fetchUser from '@/features/user/api/fetchUser'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchUser(
  workspaceId: string,
  userId: string,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchUser(workspaceId, userId)
  return useSWR([`/api/workspaces/${workspaceId}/users/${userId}`], fetcher, swrOptions)
}
