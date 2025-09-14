import { Http } from '@/lib/api-client'

export default async function destroyMeeting(workspaceId: string, meetingId: string) {
  return await Http.axios()
    .delete(`/api/workspaces/${workspaceId}/meetings/${meetingId}`)
    .then((res) => res.data.data)
}
