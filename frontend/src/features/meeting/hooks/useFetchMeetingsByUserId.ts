import fetchMeetingsByUserId from '@/features/meeting/api/fetchMeetingsByUserId'
import useSWR from 'swr'

export default function useFetchMeetingsByUserId(workspaceId: string, userId: string) {
  const fetcher = () => fetchMeetingsByUserId(workspaceId, userId)
  return useSWR(`/api/workspaces/${workspaceId}/users/${userId}/meetings`, fetcher)
}
