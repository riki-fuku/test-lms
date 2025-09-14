import type { Meeting } from '@/features/meeting/types/Meeting'
import { Http } from '@/lib/api-client'

export default function fetchMeeting(workspaceId: string, id: string) {
  return Http.axios()
    .get<{ data: Meeting }>(`/api/workspaces/${workspaceId}/meetings/${id}`)
    .then((res) => res.data.data)
}
