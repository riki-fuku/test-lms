import type { MeetingMemo } from '@/features/meeting/types/MeetingMemo'
import { Http } from '@/lib/api-client'

export default function createMeetingMemo(
  workspaceId: string,
  meetingId: string,
  body: {
    content: string
  },
) {
  return Http.axios()
    .post<{ data: MeetingMemo }>(`/api/workspaces/${workspaceId}/meetings/${meetingId}/memos`, body)
    .then((res) => res.data.data)
}
