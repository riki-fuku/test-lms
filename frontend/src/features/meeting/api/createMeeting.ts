import type { CreateMeetingBody } from '@/features/meeting/types/CreateMeetingBody'
import type { Meeting } from '@/features/meeting/types/Meeting'
import { Http } from '@/lib/api-client'

export default function createMeeting(workspaceId: string, body: CreateMeetingBody) {
  return Http.axios()
    .post<{ data: Meeting }>(`/api/workspaces/${workspaceId}/meetings`, body)
    .then((res) => res.data.data)
}
