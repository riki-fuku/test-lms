import { fetchApplicationsByUserId } from '@/features/applications/api'
import useSWR from 'swr'

export function useFetchApplicationsByUserId(workspaceId: string, userId: string) {
  return useSWR(
    `/api/workspaces/${workspaceId}/users/${userId}/applications`,
    () => fetchApplicationsByUserId({ pathParams: { workspaceId, userId } }),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  )
}
