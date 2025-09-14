import type { FirstMeetingAvailableSlots } from '@/features/meeting/types/FirstMeetingAvailableSlots'
import { Http } from '@/lib/api-client'

export type FirstMeetingAvailableSlotsQuery = {
  userId: string
  startDate: string
  endDate: string
}

export default function fetchFirstMeetingAvailableSlots(
  workspaceId: string,
  query: FirstMeetingAvailableSlotsQuery,
) {
  return Http.axios()
    .get<FirstMeetingAvailableSlots>(
      `/api/workspaces/${workspaceId}/meetings/first-meeting-available-slots`,
      {
        params: query,
      },
    )
    .then((res) => res.data)
}
