import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

type timeTrackingLogBody = {
  endedAt: string
}

export default function updateTimeTrackingLog(
  workspaceId: string,
  timeTrackingLogId: string,
  query: timeTrackingLogBody,
) {
  return Http.axios()
    .patch<AxiosResponse>(
      `/api/workspaces/${workspaceId}/time-tracking-logs/${timeTrackingLogId}`,
      query,
    )
    .then((res) => {
      return res.data.data
    })
}
