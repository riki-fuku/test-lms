import type { MeetingAvailableSlotsQuery } from '@/features/meeting/api/fetchMeetingAvailableSlots'
import fetchMeetingAvailableSlots from '@/features/meeting/api/fetchMeetingAvailableSlots'
import useSWR from 'swr'

export default function useFetchMeetingAvailableSlots(
  workspaceId: string,
  query: MeetingAvailableSlotsQuery,
) {
  const fetcher = () => fetchMeetingAvailableSlots(workspaceId, query)

  const { data, isLoading, error } = useSWR(
    [`/api/workspaces/${workspaceId}/meetings/available-slots`, query],
    fetcher,
  )
  return { data, isLoading, error }
}
