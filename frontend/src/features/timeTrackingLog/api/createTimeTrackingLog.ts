import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

type timeTrackingLogBody = {
  userId: string
  startedAt: string
  sectionId?: string
}

export default function createTimeTrackingLog(workspaceId: string, body: timeTrackingLogBody) {
  return Http.axios()
    .post<AxiosResponse>(`/api/workspaces/${workspaceId}/time-tracking-logs`, body)
    .then((res) => res.data.data)
}
