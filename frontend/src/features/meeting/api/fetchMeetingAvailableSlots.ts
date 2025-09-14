import type { MeetingAvailableSlotsResponse } from '@/features/meeting/types/MeetingAvailableSlots'
import { Http } from '@/lib/api-client'

export type MeetingAvailableSlotsQuery = {
  userId: string
  startDate: string
  endDate: string
}

export default function fetchMeetingAvailableSlots(
  workspaceId: string,
  query: MeetingAvailableSlotsQuery,
) {
  return Http.axios()
    .get<{ data: MeetingAvailableSlotsResponse }>(
      `/api/workspaces/${workspaceId}/meetings/available-slots`,
      {
        params: query,
      },
    )
    .then((res) => res.data.data)
}
