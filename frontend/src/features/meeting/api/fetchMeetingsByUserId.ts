import type { Meeting } from '@/features/meeting/types/Meeting'
import { Http } from '@/lib/api-client'

export type fetchMeetingsByUserIdResponse = {
  meetings: Meeting[]
  remainingMeetingCount: number
}

export default function fetchMeetingsByUserId(workspaceId: string, userId: string) {
  return Http.axios()
    .get<{ data: Meeting[]; remainingMeetingCount: number }>(
      `/api/workspaces/${workspaceId}/users/${userId}/meetings`,
    )
    .then((res) => res.data)
}
