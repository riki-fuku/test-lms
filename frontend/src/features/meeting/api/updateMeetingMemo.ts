import { Http } from '@/lib/api-client'

export default function updateMeetingMemo(
  workspaceId: string,
  meetingId: string,
  meetingMemoId: string,
  body: {
    content: string
  },
) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/meetings/${meetingId}/memos/${meetingMemoId}`, body)
    .then((res) => res.data.data)
}
