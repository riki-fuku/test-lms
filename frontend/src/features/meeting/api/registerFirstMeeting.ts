import { Http } from '@/lib/api-client'

export type RegisterFirstMeetingBody = {
  userId: string
  employeeId: string
  startDatetime: string
  endDatetime: string
}

export default function registerFirstMeeting(workspaceId: string, body: RegisterFirstMeetingBody) {
  return Http.axios()
    .post(`/api/workspaces/${workspaceId}/meetings/first`, body)
    .then((res) => res.data.data)
}
