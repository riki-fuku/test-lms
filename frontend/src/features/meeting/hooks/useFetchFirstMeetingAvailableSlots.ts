import fetchFirstMeetingAvailableSlots from '@/features/meeting/api/fetchFirstMeetingAvailableSlots'
import useSWR from 'swr'

export type FirstMeetingAvailableSlotsQuery = {
  userId: string
  startDate: string
  endDate: string
}

export default function useFetchFirstMeetingAvailableSlots(
  workspaceId: string,
  query: FirstMeetingAvailableSlotsQuery,
) {
  const fetcher = (workspaceId: string, query: FirstMeetingAvailableSlotsQuery) =>
    fetchFirstMeetingAvailableSlots(workspaceId, query)

  return useSWR(`/api/workspaces/${workspaceId}/meetings/first-meeting-available-slots`, () =>
    fetcher(workspaceId, query),
  )
}
