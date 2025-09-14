import { Http } from '@/lib/api-client'

export default function updateMeeting(
  workspaceId: string,
  meetingId: string,
  body: {
    userId: string
    employeeId: string
    startDatetime: string
    endDatetime: string
  },
) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/meetings/${meetingId}`, body)
    .then((res) => res.data.data)
}
