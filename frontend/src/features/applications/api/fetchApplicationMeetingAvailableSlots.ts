import type { ApplicationMeetingAvailableSlots } from '@/features/applications/types/ApplicationMeetingAvailableSlot'
import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

export type FetchApplicationMeetingAvailableSlotsQuery = {
  startDate: string
  endDate: string
}

export default function fetchApplicationMeetingAvailableSlots(
  workspaceId: string,
  query: FetchApplicationMeetingAvailableSlotsQuery,
) {
  return Http.axios()
    .get<AxiosResponse<ApplicationMeetingAvailableSlots>>(
      `api/workspaces/${workspaceId}/applications/meeting-available-slots`,
      {
        params: query,
      },
    )
    .then((res) => res.data.data)
}
