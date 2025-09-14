import fetchMeeting from '@/features/meeting/api/fetchMeeting'
import useSWR from 'swr'

export default function useFetchMeeting(workspaceId: string, meetingId: string) {
  const fetcher = () => fetchMeeting(workspaceId, meetingId)
  return useSWR([`/api/workspaces/${workspaceId}/meetings/${meetingId}`], fetcher)
}
