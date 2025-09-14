import type { FetchApplicationMeetingAvailableSlotsQuery } from '@/features/applications/api/fetchApplicationMeetingAvailableSlots'
import fetchApplicationMeetingAvailableSlots from '@/features/applications/api/fetchApplicationMeetingAvailableSlots'
import { objectToQueryString } from '@/hooks/objectToQueryString'
import useSWR from 'swr'

export default function useFetchApplicationMeetingAvailableSlots(
  workspaceId: string,
  query: FetchApplicationMeetingAvailableSlotsQuery,
) {
  const fetcher = () => fetchApplicationMeetingAvailableSlots(workspaceId, query)
  return useSWR(
    `/api/workspaces/${workspaceId}/applications/meeting-available-slots?${objectToQueryString(
      query,
    )}`,
    fetcher,
  )
}
