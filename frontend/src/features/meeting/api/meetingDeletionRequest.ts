import type { MeetingDeletionRequest } from '@/features/meeting/types/MeetingDeletionRequest'
import { Http } from '@/lib/api-client'

export default function meetingDeletionRequest(
  workspaceId: string,
  meetingId: string,
  body: MeetingDeletionRequest,
) {
  return Http.axios()
    .post(`/api/workspaces/${workspaceId}/meetings/${meetingId}/deletion-requests`, body)
    .then((res) => res.data.data)
}
